import commands from '@onetype/framework/commands';

commands.Fn('http.server', 3000, {
    onStart: () =>
    {
        console.log('Transform server running on :3000');
    }
});
