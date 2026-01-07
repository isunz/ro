import extend from '../extend/extend';
import isCamel from '../is/camel';

const plugins = {};

export default {
    add: function(arg1, arg2) {
        let name, pluginDef;

        // Case 1: (name, pluginDef)
        if (typeof arg1 === 'string') {
            name = arg1;
            pluginDef = arg2;
        } 
        // Case 2: (pluginDef) where pluginDef has a 'name' property
        else if (typeof arg1 === 'object' && arg1 !== null) {
            pluginDef = arg1;
            name = pluginDef.name;
        }

        // Validation
        if (!name) {
            console.error('[ro.plugin.add] Plugin name is required.');
            return;
        }

        if (!isCamel(name)) {
            console.error(`[ro.plugin.add] Invalid plugin name '${name}'. It must be in camelCase (e.g., 'myPlugin').`);
            return;
        }

        if (!pluginDef) {
            console.error(`[ro.plugin.add] Plugin definition for '${name}' is missing.`);
            return;
        }

        // Store plugin definition
        plugins[name] = pluginDef;

        // Register to 'ro' context (this will be bound to 'ro' in index.js)
        // If body is a function, wrap it to inject context
        if (typeof pluginDef.body === 'function') {
            this[name] = function(...args) {
                // Call the body function with args and the context (this = ro)
                // Spread args so that the body function receives them as individual arguments,
                // followed by the context as the last argument.
                return pluginDef.body.apply(this, [...args, this]);
            };
        } else {
            // If body is an object or other type, attach it directly
            this[name] = pluginDef.body;
        }
    },
    
    // Accessor to get raw plugin info
    get: function(name) {
        return plugins[name];
    }
};
