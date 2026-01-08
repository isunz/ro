function testPlugin(ro) {
    console.log('\n[Test] Plugin System (ro.use)');
    
    // 1. Plugin with 'install' method
    console.log('--- 1. install() method ---');
    const installablePlugin = {
        install: function(roInstance, options) {
            // console.log('Installing plugin with options:', options);
            roInstance.installedPlugin = true;
            roInstance.pluginOptions = options;
        }
    };

    const roAfterInstall = ro.use(installablePlugin, { option: 'A' });

    if (ro.installedPlugin === true && ro.pluginOptions.option === 'A') {
        // console.log('✅ ro.use with install() works');
    } else {
        console.error('❌ FAIL: ro.use with install() failed');
        console.log('ro.installedPlugin:', ro.installedPlugin);
        
        // Check if the returned instance has the property
        if (roAfterInstall.installedPlugin === true) {
            console.log('⚠️ BUT roAfterInstall has the property! (Object mismatch)');
        }
        
        throw new Error('ro.use install() test failed');
    }

    // 2. Plugin as a function
    console.log('\n--- 2. Function Plugin ---');
    const functionPlugin = function(roInstance, options) {
        roInstance.functionPluginLoaded = true;
    };

    const roAfterFunc = ro.use(functionPlugin);

    if (ro.functionPluginLoaded === true) {
        // console.log('✅ ro.use with function works');
    } else {
        console.error('❌ FAIL: ro.use with function failed');
        console.log('ro.functionPluginLoaded:', ro.functionPluginLoaded);
        
        if (roAfterFunc.functionPluginLoaded === true) {
            console.log('⚠️ BUT roAfterFunc has the property! (Object mismatch)');
        }

        throw new Error('ro.use function test failed');
    }

    // 3. Plugin with 'name' and 'body' (Auto-register)
    console.log('\n--- 3. Auto-register (name + body) ---');
    const autoRegPlugin = {
        name: 'autoPlugin',
        body: function(args) { return 'auto works ' + args; }
    };

    ro.use(autoRegPlugin);

    if (typeof ro.autoPlugin === 'function' && ro.autoPlugin('test') === 'auto works test') {
        // console.log('✅ ro.use auto-register works');
    } else {
        console.error('❌ FAIL: ro.use auto-register failed');
        throw new Error('ro.use auto-register test failed');
    }

    console.log('✅ ro.use passed');
}

if (typeof module !== 'undefined') module.exports = testPlugin;
