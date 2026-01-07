module.exports = function(ro) {
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

    // 2. ro.is.plainObject Test
    console.log('--- ro.is.plainObject ---');
    const plainObjectTests = [
        { input: {}, expected: true },
        { input: { a: 1 }, expected: true },
        { input: Object.create(null), expected: true }, // Prototype-less object
        { input: new Object(), expected: true },
        { input: [], expected: false },
        { input: new Date(), expected: false },
        { input: null, expected: false },
        { input: undefined, expected: false },
        { input: 'string', expected: false },
        { input: 123, expected: false }
    ];

    plainObjectTests.forEach((t, i) => {
        const res = ro.is.plainObject(t.input);
        if (res !== t.expected) {
            console.error(`❌ FAIL: Input index ${i} -> Expected ${t.expected}, got ${res}`);
            throw new Error('ro.is.plainObject test failed');
        }
    });
    console.log('✅ ro.is.plainObject passed');
};
