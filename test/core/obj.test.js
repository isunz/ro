function testObj(ro) {
    console.log('\n[Test] ro.obj Functions');

    // 1. ro.obj.get Test
    console.log('--- ro.obj.get ---');
    
    const data = {
        a: {
            b: {
                c: 'value',
                d: 123,
                e: null
            },
            arr: [
                { id: 1 },
                { id: 2 }
            ]
        },
        x: undefined
    };

    const getTests = [
        { path: 'a.b.c', expected: 'value' },
        { path: 'a.b.d', expected: 123 },
        { path: 'a.b.e', expected: null },
        { path: 'a.arr.0.id', expected: 1 }, // Array index access
        { path: 'a.b.z', expected: undefined }, // Non-existent key
        { path: 'z.y.x', expected: undefined }, // Non-existent root
        { path: 'x', expected: undefined }, // Explicit undefined
        { path: '', expected: undefined }, // Empty path
        { path: null, expected: undefined }, // Invalid path
    ];

    getTests.forEach(t => {
        const res = ro.obj.get(data, t.path);
        if (res === t.expected) {
            // console.log(`✅ '${t.path}' -> ${res}`);
        } else {
            console.error(`❌ FAIL: '${t.path}' -> Expected ${t.expected}, got ${res}`);
            throw new Error('ro.obj.get test failed');
        }
    });
    console.log('✅ ro.obj.get passed');
}

if (typeof module !== 'undefined') module.exports = testObj;
