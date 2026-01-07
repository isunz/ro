function testIs(ro) {
    console.log('\n[Test] ro.is Functions');

    // 1. ro.is.camel Test
    console.log('--- ro.is.camel ---');
    const isCamelTests = [
        { input: 'fooBar', expected: true },
        { input: 'foo', expected: true },
        { input: 'fooBar123', expected: true },
        { input: 'FooBar', expected: false }, // Starts with Upper
        { input: 'foo-bar', expected: false },
        { input: 'foo_bar', expected: false },
        { input: '123foo', expected: false }, // Starts with number
        { input: '', expected: false },
        { input: null, expected: false },
    ];

    isCamelTests.forEach(t => {
        const res = ro.is.camel(t.input);
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> ${res}`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected ${t.expected}, got ${res}`);
            throw new Error('ro.is.camel test failed');
        }
    });
    console.log('✅ ro.is.camel passed');
}

if (typeof module !== 'undefined') module.exports = testIs;
