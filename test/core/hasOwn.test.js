function testHasOwn(ro) {
    console.log('\n[Test] ro.hasOwn Function');

    const obj = { a: 1, b: undefined };
    const nullProtoObj = Object.create(null);
    nullProtoObj.a = 1;

    // 1. Normal object
    if (ro.hasOwn(obj, 'a') === true && ro.hasOwn(obj, 'b') === true && ro.hasOwn(obj, 'c') === false) {
        // console.log('✅ Normal object check passed');
    } else {
        console.error('❌ FAIL: Normal object check failed');
        throw new Error('ro.hasOwn normal object failed');
    }

    // 2. Object with null prototype
    if (ro.hasOwn(nullProtoObj, 'a') === true && ro.hasOwn(nullProtoObj, 'b') === false) {
        // console.log('✅ Null prototype object check passed');
    } else {
        console.error('❌ FAIL: Null prototype object check failed');
        throw new Error('ro.hasOwn null prototype object failed');
    }

    // 3. Overridden hasOwnProperty
    const overriddenObj = {
        a: 1,
        hasOwnProperty: function() { return false; }
    };
    if (ro.hasOwn(overriddenObj, 'a') === true) {
        // console.log('✅ Overridden hasOwnProperty check passed');
    } else {
        console.error('❌ FAIL: Overridden hasOwnProperty check failed');
        throw new Error('ro.hasOwn overridden hasOwnProperty failed');
    }

    console.log('✅ ro.hasOwn passed');
}

if (typeof module !== 'undefined') module.exports = testHasOwn;
