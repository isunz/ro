module.exports = function(ro) {
    console.log('\n[Test] ro.space Functions');

    // Clear storage before test
    ro.space.clear();

    // 1. ro.space.ns Test
    console.log('--- ro.space.ns ---');
    ro.space.ns('app.ui.theme');
    const dump1 = ro.space.dump();
    if (dump1.app && dump1.app.ui && dump1.app.ui.theme) {
        // console.log('✅ Namespace created successfully');
    } else {
        console.error('❌ FAIL: Namespace creation failed');
        throw new Error('ro.space.ns failed');
    }

    // 2. ro.space.set Test
    console.log('\n--- ro.space.set ---');
    
    // Set value
    ro.space.set('app.config.version', '1.0.0');
    if (ro.space.get('app.config.version') === '1.0.0') {
        // console.log('✅ Value set successfully');
    } else {
        console.error('❌ FAIL: Value set failed');
        throw new Error('ro.space.set failed');
    }

    // Override check
    ro.space.set('app.config.version', '2.0.0', { override: false }); // Should fail (warn)
    if (ro.space.get('app.config.version') === '1.0.0') {
        // console.log('✅ Override protection works');
    } else {
        console.error('❌ FAIL: Override protection failed. Value changed to:', ro.space.get('app.config.version'));
        throw new Error('ro.space.set override protection failed');
    }

    // Force override
    ro.space.set('app.config.version', '2.0.0', { override: true });
    if (ro.space.get('app.config.version') === '2.0.0') {
        // console.log('✅ Force override works');
    } else {
        console.error('❌ FAIL: Force override failed');
        throw new Error('ro.space.set force override failed');
    }

    // 3. ro.space.get Test
    console.log('\n--- ro.space.get ---');
    const val = ro.space.get('app.ui.theme');
    if (typeof val === 'object') {
        // console.log('✅ Get works for object');
    } else {
        console.error('❌ FAIL: Get failed');
        throw new Error('ro.space.get failed');
    }

    const missing = ro.space.get('nothing.here');
    if (missing === undefined) {
        // console.log('✅ Get returns undefined for missing path');
    } else {
        console.error('❌ FAIL: Get missing path failed');
        throw new Error('ro.space.get missing path failed');
    }

    console.log('✅ ro.space passed');
};
