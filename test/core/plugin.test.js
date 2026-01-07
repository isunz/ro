module.exports = function(ro) {
    console.log('\n[Test] Plugin System');
    
    // 1. Function Type Plugin Test
    console.log('--- Function Type Plugin ---');
    ro.plugin.add('testPlugin', {
        version: '1.0.0',
        body: function(args, context) {
            // console.log('Plugin executed with args:', args);
            
            // Check context via 'this'
            // console.log("Checking 'this.extend':", typeof this.extend);
            if (typeof this.extend !== 'function') {
                throw new Error("'this.extend' is not available. 'this' context might be wrong.");
            }

            // Check context via argument
            // console.log('Context (ro) available via arg:', !!context.extend);
            
            return {
                msg: 'Hello from Plugin',
                receivedArgs: args,
                contextCheck: this.extend === context.extend // Verify they are the same
            };
        }
    });

    if (typeof ro.testPlugin === 'function') {
        console.log('✅ SUCCESS: Function Plugin registered.');
        const pluginResult = ro.testPlugin({ data: 'test' });
        
        if (pluginResult.msg === 'Hello from Plugin' && 
            pluginResult.receivedArgs.data === 'test' &&
            pluginResult.contextCheck === true) {
             console.log('✅ SUCCESS: Function Plugin execution works correctly.');
        } else {
             console.error('❌ FAIL: Function Plugin execution result is incorrect.');
             throw new Error('Function Plugin execution test failed');
        }
    } else {
        console.error('❌ FAIL: Function Plugin not registered.');
        throw new Error('Function Plugin registration test failed');
    }

    // 2. Object Type Plugin Test
    console.log('\n--- Object Type Plugin ---');
    ro.plugin.add('objPlugin', {
        version: '0.5.0',
        body: {
            prop: 'I am an object',
            method: function() {
                return 'method called';
            }
        }
    });

    if (typeof ro.objPlugin === 'object') {
        console.log('✅ SUCCESS: Object Plugin registered.');
        
        if (ro.objPlugin.prop === 'I am an object' && ro.objPlugin.method() === 'method called') {
            console.log('✅ SUCCESS: Object Plugin properties accessed correctly.');
        } else {
            console.error('❌ FAIL: Object Plugin properties are incorrect.');
            throw new Error('Object Plugin test failed');
        }
    } else {
        console.error('❌ FAIL: Object Plugin not registered or not an object.');
        console.log('Type:', typeof ro.objPlugin);
        throw new Error('Object Plugin registration test failed');
    }

    // 3. Alternative Registration & Validation Test
    console.log('\n--- Registration & Validation ---');
    
    // 3.1 Object Argument Registration
    ro.plugin.add({
        name: 'altPlugin',
        version: '1.0.0',
        body: function() { return 'alt works'; }
    });

    if (typeof ro.altPlugin === 'function' && ro.altPlugin() === 'alt works') {
        console.log('✅ SUCCESS: Plugin registered via object argument.');
    } else {
        console.error('❌ FAIL: Plugin registration via object argument failed.');
        throw new Error('Alternative registration test failed');
    }

    // 3.2 Invalid Name Validation (CamelCase Check)
    const invalidNames = ['MyPlugin', 'my-plugin', 'my_plugin', '2plugin', ''];
    let validationPassed = true;

    // Mock console.error to suppress expected error messages during test
    const originalConsoleError = console.error;
    let errorCount = 0;
    console.error = function() { errorCount++; };

    invalidNames.forEach(name => {
        ro.plugin.add(name, { body: function(){} });
        if (ro[name]) {
            validationPassed = false;
            originalConsoleError(`❌ FAIL: Invalid name '${name}' should not be registered.`);
        }
    });

    // Restore console.error
    console.error = originalConsoleError;

    if (validationPassed && errorCount === invalidNames.length) {
        console.log(`✅ SUCCESS: Invalid names rejected correctly (${errorCount} cases).`);
    } else {
        console.error('❌ FAIL: Name validation logic is incorrect.');
        throw new Error('Name validation test failed');
    }
};
