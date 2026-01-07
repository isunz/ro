// 주의: src가 아니라 빌드된 결과물을 가져옵니다.
const roModule = require('../dist/ro.js');

// Handle CommonJS export structure change due to 'exports: named'
// If roModule has a 'default' property, use it as the main 'ro' object.
// Otherwise, assume roModule itself is the object (legacy behavior).
const ro = roModule.default || roModule;

// 테스트 모듈 로드
const testExtend = require('./core/extend.test');
const testPlugin = require('./core/plugin.test');
const testStr = require('./core/str.test');
const testIs = require('./core/is.test');
const testObj = require('./core/obj.test');
const testList = require('./core/list.test');
const testSpace = require('./core/space.test');
const testPath = require('./core/path.test');
const testHasOwn = require('./core/hasOwn.test');

console.log('--- Build Verification Start ---');

try {
    // 각 테스트 모듈 실행
    testExtend(ro);
    testPlugin(ro);
    testStr(ro);
    testIs(ro);
    testObj(ro);
    testList(ro);
    testSpace(ro);
    testPath(ro);
    testHasOwn(ro);

    console.log('\n✅ ALL TESTS PASSED');
} catch (e) {
    console.error('\n❌ CRITICAL: Test failed.', e);
    process.exit(1);
}
