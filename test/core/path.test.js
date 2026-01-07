module.exports = function(ro) {
    console.log('\n[Test] ro.path Functions');

    // 1. ro.path.isValid Test
    console.log('--- ro.path.isValid ---');
    
    const tests = [
        // Dot separator (default for space)
        { path: 'a.b.c', opts: '.', expected: true },
        { path: 'app.ui.theme', opts: { sep: '.' }, expected: true },
        { path: '.a.b', opts: '.', expected: false }, // Starts with dot
        { path: 'a.b.', opts: '.', expected: false }, // Ends with dot
        { path: 'a..b', opts: '.', expected: false }, // Consecutive dots
        { path: 'a.b@.c', opts: '.', expected: false }, // Invalid char @
        { path: 'my-app.v1_0.$data', opts: '.', expected: true }, // Valid chars: - _ $

        // Slash separator (default)
        { path: 'a/b/c', opts: undefined, expected: true }, // Default '/'
        { path: 'a\\b\\c', opts: '/', expected: true }, // Backslash treated as slash
        { path: 'a/b\\c', opts: '/', expected: true }, // Mixed slash and backslash
        { path: 'a\\b/c', opts: { separator: '/' }, expected: true }, // Mixed slash and backslash with object opt
        { path: '/a/b', opts: '/', expected: false }, // Starts with slash
        { path: 'a/b/', opts: '/', expected: false }, // Ends with slash
        { path: 'a//b', opts: '/', expected: false }, // Consecutive slashes
        { path: 'a/b/c.txt', opts: '/', expected: true }, // Dot allowed in segment
    ];

    tests.forEach(t => {
        const res = ro.path.isValid(t.path, t.opts);
        if (res === t.expected) {
            // console.log(`✅ '${t.path}' -> ${res}`);
        } else {
            console.error(`❌ FAIL: '${t.path}' (opts: ${JSON.stringify(t.opts)}) -> Expected ${t.expected}, got ${res}`);
            throw new Error('ro.path.isValid test failed');
        }
    });
    console.log('✅ ro.path.isValid passed');
};
