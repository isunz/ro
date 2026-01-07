module.exports = function(ro) {
    console.log('\n[Test] ro.hasOwn Function');

    const obj = { a: 1 };
    const protoLess = Object.create(null);
    protoLess.b = 2;
    
    // hasOwnProperty 메서드를 덮어쓴 객체 (악의적이거나 실수로 인한 경우)
    const shadowed = { hasOwnProperty: function() { return false; }, c: 3 };

    const tests = [
        { obj: obj, key: 'a', expected: true },
        { obj: obj, key: 'b', expected: false }, // 없는 키
        { obj: protoLess, key: 'b', expected: true }, // 프로토타입 없는 객체
        { obj: protoLess, key: 'a', expected: false },
        { obj: shadowed, key: 'c', expected: true }, // 덮어씌워진 객체에서도 정상 동작해야 함
        { obj: shadowed, key: 'hasOwnProperty', expected: true } // 키 자체가 hasOwnProperty인 경우
    ];

    tests.forEach((t, i) => {
        const res = ro.hasOwn(t.obj, t.key);
        if (res !== t.expected) {
            console.error(`❌ FAIL: Test index ${i} -> Expected ${t.expected}, got ${res}`);
            throw new Error('ro.hasOwn test failed');
        }
    });

    console.log('✅ ro.hasOwn passed');
};