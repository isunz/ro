module.exports = function(ro) {
    console.log('\n[Test] ro.str Functions');

    // 1. ro.str.camel Test
    console.log('--- ro.str.camel ---');
    const camelTests = [
        { input: 'foo-bar', expected: 'fooBar' },
        { input: 'FooBar', expected: 'fooBar' },
        { input: 'foo_bar', expected: 'fooBar' },
        { input: 'FOO_BAR', expected: 'fooBar' },
        { input: 'foo bar', expected: 'fooBar' },
        { input: 'foo.bar', expected: 'fooBar' },
        { input: 123, expected: 123 }, // Error handling check
    ];

    camelTests.forEach(t => {
        const res = ro.str.camel(t.input);
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> '${res}'`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected '${t.expected}', got '${res}'`);
            throw new Error('ro.str.camel test failed');
        }
    });
    console.log('✅ ro.str.camel passed');


    // 2. ro.str.kebab Test
    console.log('\n--- ro.str.kebab ---');
    const kebabTests = [
        { input: 'fooBar', expected: 'foo-bar' },
        { input: 'FooBar', expected: 'foo-bar' },
        { input: 'foo_bar', expected: 'foo-bar' },
        { input: 'FOO_BAR', expected: 'foo-bar' },
        { input: 'foo bar', expected: 'foo-bar' },
        { input: 'foo.bar', expected: 'foo-bar' },
        { input: null, expected: null }, // Error handling check
    ];

    kebabTests.forEach(t => {
        const res = ro.str.kebab(t.input);
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> '${res}'`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected '${t.expected}', got '${res}'`);
            throw new Error('ro.str.kebab test failed');
        }
    });
    console.log('✅ ro.str.kebab passed');


    // 3. ro.str.snake Test
    console.log('\n--- ro.str.snake ---');
    const snakeTests = [
        { input: 'fooBar', expected: 'FOO_BAR', upper: true }, // Default upper=true
        { input: 'fooBar', expected: 'foo_bar', upper: false },
        { input: 'foo-bar', expected: 'FOO_BAR' },
        { input: 'foo bar', expected: 'FOO_BAR' },
        { input: 'foo.bar', expected: 'FOO_BAR' },
        { input: undefined, expected: undefined }, // Error handling check
    ];

    snakeTests.forEach(t => {
        // Handle optional argument
        const res = (t.upper !== undefined) ? ro.str.snake(t.input, t.upper) : ro.str.snake(t.input);
        
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> '${res}'`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected '${t.expected}', got '${res}'`);
            throw new Error('ro.str.snake test failed');
        }
    });
    console.log('✅ ro.str.snake passed');
};
