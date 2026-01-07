module.exports = function(ro) {
    console.log('\n[Test] ro.list Functions');

    // 1. ro.list.toMap Test
    console.log('--- ro.list.toMap ---');
    
    const list = [
        { id: 1, name: 'A', info: { code: 'c1' } },
        { id: 2, name: 'B', info: { code: 'c2' } },
        { id: 3, name: 'C', info: { code: 'c3' } },
        { id: 4, name: 'D' } // Missing info.code
    ];

    // Case 1: Simple key
    const mapById = ro.list.toMap(list, 'id');
    if (mapById['1'].name === 'A' && mapById['3'].name === 'C') {
        // console.log('✅ Simple key map success');
    } else {
        console.error('❌ FAIL: Simple key map failed');
        throw new Error('ro.list.toMap simple key failed');
    }

    // Case 2: Nested key
    const mapByCode = ro.list.toMap(list, 'info.code');
    if (mapByCode['c1'].id === 1 && mapByCode['c2'].id === 2) {
        // console.log('✅ Nested key map success');
    } else {
        console.error('❌ FAIL: Nested key map failed');
        throw new Error('ro.list.toMap nested key failed');
    }

    // Case 3: Missing key (should be skipped)
    if (mapByCode['undefined'] === undefined && Object.keys(mapByCode).length === 3) {
        // console.log('✅ Missing key skipped success');
    } else {
        console.error('❌ FAIL: Missing key handling failed');
        throw new Error('ro.list.toMap missing key failed');
    }

    // Case 4: Invalid input
    const invalidRes = ro.list.toMap(null, 'id');
    if (typeof invalidRes === 'object' && Object.keys(invalidRes).length === 0) {
        // console.log('✅ Invalid input handled success');
    } else {
        console.error('❌ FAIL: Invalid input handling failed');
        throw new Error('ro.list.toMap invalid input failed');
    }

    console.log('✅ ro.list.toMap passed');
};
