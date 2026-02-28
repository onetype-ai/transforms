# Publish Transform

When the user says `publish "folder-name"`, follow this process exactly.

---

## Step 1: Read files

Read all files from `items/{folder-name}/`:

- `.js` file (required) - transform definition
- `.css` file (optional) - styles
- `usage.html` (required) - clean copy-paste example
- `overview.md` (required) - marketplace description
- `previews/` folder (required) - all `.html` files inside

If any required file is missing, stop and tell the user.

---

## Step 2: Ask about database state

Ask the user:

> Does this transform already exist in the database? If yes, what is the transform ID and current version?

- If **new** - generate `INSERT INTO transforms` + `INSERT INTO versions`
- If **exists** - generate only `INSERT INTO versions` with bumped version

---

## Step 3: Extract data

### From `.js` file

Extract from `transforms.ItemAdd({...})`:

- `id` -> slug
- `icon` -> icon (default: `'sync_alt'`)
- `name` -> name
- `description` -> description
- `js` -> js array (default: `NULL`)
- `css` -> css array (default: `NULL`)
- `config` -> config object
- `code` -> function body as string

### From `usage.html`

Read the raw content. This goes into the `usage` field.

### From `previews/`

Read each `.html` file. Build a JSONB array where each entry has:

- `name` - file name without extension, kebab-case (e.g. `fade-up`)
- `label` - file name humanized (e.g. `Fade Up`)
- `html` - raw file content

### From `overview.md`

Read the raw content for the `overview` field.

### From `.css` file

If present, read the raw content for the `style` field. If not present, use `NULL`.

---

## Step 4: Determine category and tier

### Category

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

### Tier

- **Free** - simple transforms, no external libraries
- **Pro** - advanced transforms, external libraries, complex functionality

---

## Step 5: Format config as JSONB

Convert config to JSONB. Input may be array format or object format. Always output object format with `type`, `value`, and `description`.

Input:
```js
config: {
    'speed': ['number', 50],
    'loop': ['boolean', true]
}
```

Output:
```json
{
    "speed": { "type": "number", "value": 50, "description": "Animation speed in ms" },
    "loop": { "type": "boolean", "value": true, "description": "Whether to loop the animation" }
}
```

Write a short description for each option based on the name and how it's used in the code.

---

## Step 6: Format code as string

Extract the inner body of the code function - everything inside `function(data, node, transformer) { ... }`, without the wrapper.

Strip the first level of indentation (8 spaces) so the code starts at column 0 with relative indentation preserved.

---

## Step 7: Format previews as JSONB

Build a JSON array from all preview files:

```json
[
    {
        "name": "fade-up",
        "label": "Fade Up",
        "html": "<style>...</style>\n\n<div ot=\"anime\" class=\"fade-up\">...</div>"
    },
    {
        "name": "stagger",
        "label": "Stagger",
        "html": "<style>...</style>\n\n<div ot=\"anime\" ot-stagger=\"100\" class=\"stagger\">...</div>"
    }
]
```

---

## Step 8: Generate SQL

### New transform

```sql
INSERT INTO transforms (category_id, slug, name, description, icon, tier, overview, tag)
VALUES (
    {category_id},
    '{slug}',
    '{name}',
    '{description}',
    '{icon}',
    '{tier}',
    $${overview}$$,
    {tag_or_null}
)
RETURNING id;

-- Use the returned id as {transform_id} below:

INSERT INTO versions (transform_id, version, code, style, js, css, config, usage, previews)
VALUES (
    {transform_id},
    '1.0.0',
    $${code}$$,
    $${style_or_null}$$,
    {js_array_or_null},
    {css_array_or_null},
    '{config_jsonb}'::jsonb,
    $${usage}$$,
    '{previews_jsonb}'::jsonb
);
```

### Existing transform (new version)

```sql
INSERT INTO versions (transform_id, version, code, style, js, css, config, usage, previews)
VALUES (
    {transform_id},
    '{bumped_version}',
    $${code}$$,
    $${style_or_null}$$,
    {js_array_or_null},
    {css_array_or_null},
    '{config_jsonb}'::jsonb,
    $${usage}$$,
    '{previews_jsonb}'::jsonb
);
```

---

## SQL rules

- `$$` dollar quoting for `code`, `style`, `usage`, and `overview` - these contain quotes and special characters
- Regular single quotes for simple values (slug, name, description, icon, tier, version)
- `js` and `css` as PostgreSQL arrays: `ARRAY['url1', 'url2']` or `NULL`
- If no `.css` file, set `style` to `NULL` (not dollar-quoted)
- `tag` is `NULL` by default. Available: `'New'`, `'Popular'`, `'Featured'`, `'Trending'`, `'Staff Pick'`
- Config and previews must be valid JSONB
- Version bumping: `1.0.0` -> `1.1.0` -> `1.2.0`
- Never generate UPDATE statements - always INSERT new versions
- Output final SQL in a single code block, ready to copy-paste