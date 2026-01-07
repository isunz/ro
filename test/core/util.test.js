module.exports = function(ro) {
    console.log('\n[Test] Utility Functions');

    // 1. toCamelCase Test
    console.log('--- toCamelCase ---');
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
        const res = ro.toCamelCase(t.input);
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> '${res}'`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected '${t.expected}', got '${res}'`);
            throw new Error('toCamelCase test failed');
        }
    });
    console.log('✅ toCamelCase passed');


    // 2. toKebabCase Test
    console.log('\n--- toKebabCase ---');
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
        const res = ro.toKebabCase(t.input);
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> '${res}'`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected '${t.expected}', got '${res}'`);
            throw new Error('toKebabCase test failed');
        }
    });
    console.log('✅ toKebabCase passed');


    // 3. toSnakeCase Test
    console.log('\n--- toSnakeCase ---');
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
        const res = (t.upper !== undefined) ? ro.toSnakeCase(t.input, t.upper) : ro.toSnakeCase(t.input);
        
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> '${res}'`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected '${t.expected}', got '${res}'`);
            throw new Error('toSnakeCase test failed');
        }
    });
    console.log('✅ toSnakeCase passed');

    // 4. isCamel Test
    console.log('\n--- isCamel ---');
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
        const res = ro.isCamel(t.input);
        if (res === t.expected) {
            // console.log(`✅ '${t.input}' -> ${res}`);
        } else {
            console.error(`❌ FAIL: '${t.input}' -> Expected ${t.expected}, got ${res}`);
            throw new Error('isCamel test failed');
        }
    });
    console.log('✅ isCamel passed');
};
