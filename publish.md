# Publish Transform

When the user says `publish "folder-name"`, follow this process exactly.

---

## Step 1: Read files

Read all files from `items/{folder-name}/`:
- `.js` file (required) — transform definition
- `.css` file (optional) — styles
- `demo.html` (required) — demo markup
- `overview.md` (required) — marketplace description

If any required file is missing, stop and tell the user.

---

## Step 2: Ask if transform exists

Ask the user:

> Does this transform already exist in the database? (yes/no)

- If **yes** — ask the user to paste the existing transform row and current version number. Then generate an `INSERT INTO versions` statement with a bumped version.
- If **no** — generate both `INSERT INTO transforms` and `INSERT INTO versions`.

---

## Step 3: Extract data from files

From the `.js` file (`transforms.ItemAdd({...})`), extract:
- `id` → slug
- `icon` → icon (default: `'sync_alt'`)
- `name` → name
- `description` → description
- `js` → js array (default: `NULL`)
- `css` → css array (default: `NULL`)
- `config` → config object
- `code` → the code function body as a string

From `demo.html`, extract a single clean usage example — the simplest `ot=""` element with common attributes. This goes into the `usage` field.

From `overview.md`, read the raw content for the `overview` field. Overview should describe what the transform does — not list config options. Config belongs to the version, not the transform.

From the `.css` file (if present), read the raw content for the `style` field on the version.

---

## Step 4: Determine category

Pick the correct `category_id` based on what the transform does:

| ID | Slug | Name |
|----|------|------|
| 1 | animations | Animations |
| 2 | text | Text |
| 3 | interaction | Interaction |
| 4 | layout | Layout |
| 5 | media | Media |
| 6 | navigation | Navigation |
| 7 | forms | Forms |
| 8 | data | Data |
| 9 | social | Social |
| 10 | utility | Utility |

---

## Step 5: Format config as JSONB

Convert the config to JSONB. The input may use either array format (`['type', default]`) or object format (`{ type, value }`). Always output object format with `type`, `value`, and `description`.

Example input (array format):
```js
config: {
    'speed': ['number', 50],
    'loop': ['boolean', true]
}
```

Example input (object format):
```js
config: {
    'speed': { type: 'number', value: 50 },
    'loop': { type: 'boolean', value: true }
}
```

Output (always this format):
```json
{
    "speed": { "type": "number", "value": 50, "description": "..." },
    "loop": { "type": "boolean", "value": true, "description": "..." }
}
```

Write a short, useful description for each config option based on the name and how it's used in the code.

---

## Step 6: Format code as string

Extract only the inner body of the code function — everything inside `function(data, node, transformer) { ... }`, without the `function(data, node, transformer) {` wrapper and closing `}`.

**Strip the first level of indentation** (8 spaces) from every line so the code starts at column 0 with relative indentation preserved.

---

## Step 7: Generate SQL

### New transform (does not exist):

```sql
INSERT INTO transforms (category_id, slug, name, description, icon, tier, overview, tag)
VALUES (
    {category_id},
    '{slug}',
    '{name}',
    '{description}',
    '{icon}',
    'Free',
    '{overview}',
    NULL
)
RETURNING id;

-- Use the returned id as {transform_id} below:

INSERT INTO versions (transform_id, version, code, style, js, css, config, usage)
VALUES (
    {transform_id},
    '1.0.0',
    $${code}$$,
    $${style_or_null}$$,
    {js_array_or_null},
    {css_array_or_null},
    '{config_jsonb}'::jsonb,
    $${usage}$$
);
```

### Existing transform (new version):

```sql
INSERT INTO versions (transform_id, version, code, style, js, css, config, usage)
VALUES (
    {transform_id},
    '{bumped_version}',
    $${code}$$,
    $${style_or_null}$$,
    {js_array_or_null},
    {css_array_or_null},
    '{config_jsonb}'::jsonb,
    $${usage}$$
);
```

---

## Rules

- Use `$$` dollar quoting for `code`, `style`, `usage`, and `overview` fields — these contain single quotes and special characters that break regular SQL strings
- Use regular single quotes only for simple values (slug, name, description, icon, tier, version)
- Format `js` and `css` as PostgreSQL arrays: `ARRAY['url1', 'url2']` or `NULL`
- If no `.css` file exists, set `style` to `NULL` (not dollar-quoted)
- Config must be valid JSONB
- Version bumping: if current is `1.0.0`, next is `1.1.0`. If `1.1.0`, next is `1.2.0`.
- Do NOT generate UPDATE statements — always INSERT new versions
- Output the final SQL in a single code block, ready to copy-paste
