function testExtend(ro) {
    console.log('\n[Test] Extend Function');
    const obj1 = { a: 1, ab: { abo: function () {}, abb: {} } };
    const obj2 = { b: 2, ab: { abo: function () { console.log('abo'); }, abb: 'string abb'} };

    const result = ro.extend(true, obj1, obj2);
    console.log('Result:', result);

    if (result.a === 1 && result.b === 2) {
        console.log('✅ SUCCESS: Extend works correctly!');
    } else {
        console.error('❌ FAIL: Extend logic error.');
        throw new Error('Extend test failed');
    }
}

if (typeof module !== 'undefined') module.exports = testExtend;
