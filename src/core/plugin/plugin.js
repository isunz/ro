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
    /**
     * [New] 스마트 플러그인 설치 함수
     * @param {Object|Function} plugin - 플러그인 정의 객체 또는 함수
     * @param {*} [options] - 옵션
     */
    use: function(plugin, options) {
        if (!plugin) {
            return this;
        }

        // 1. If plugin has an 'install' method, call it
        if (typeof plugin.install === 'function') {
            plugin.install(this, options);
        }
        // 2. If plugin is a function (and no install method used above), call it
        else if (typeof plugin === 'function') {
            plugin(this, options);
        }

        // 3. Auto-register functionality (like 'add')
        // If the plugin object has 'name' and 'body', register it directly to 'ro'
        if (typeof plugin === 'object' && plugin !== null && plugin.name && plugin.body) {
            // Validate name
            if (!isCamel(plugin.name)) {
                console.error(`[ro.use] Invalid plugin name '${plugin.name}'. It must be in camelCase.`);
                return this;
            }

            if (typeof plugin.body === 'function') {
                this[plugin.name] = function(...args) {
                    return plugin.body.apply(this, [...args, this]);
                };
            } else {
                this[plugin.name] = plugin.body;
            }
            
            // Store metadata if needed
            plugins[plugin.name] = plugin;
        }

        return this; // Support chaining
    },
    // Accessor to get raw plugin info
    get: function(name) {
        return plugins[name];
    }
};
