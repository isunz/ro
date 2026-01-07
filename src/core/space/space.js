import get from '../obj/get';
import isValidPath from '../path/isValid';
import hasOwn from '../hasOwn';

// The internal storage for the 'space'
const storage = {};

export default {
    // 1. Create namespace (ensure object structure exists)
    // Usage: ro.space.ns('app.ui.theme') -> creates storage.app.ui.theme = {}
    ns: function(path) {
        // Use ro.path.isValid with '.' separator
        if (!isValidPath(path, '.')) {
            console.error(`[ro.space.ns] Invalid path format: '${path}'`);
            return;
        }

        const keys = path.split('.');
        let current = storage;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            
            // If key doesn't exist, create an empty object
            if (!hasOwn(current, key)) {
                current[key] = {};
            }
            
            // If key exists but is not an object (e.g., it's a value), we have a conflict
            // But for 'ns', we usually expect it to be an object container.
            // If it's a primitive, we can't attach properties to it.
            if (typeof current[key] !== 'object' || current[key] === null) {
                console.warn(`[ro.space.ns] Path collision at '${key}'. It is not an object.`);
                return; // Stop here
            }

            current = current[key];
        }
        
        return current; // Return the leaf object
    },

    // 2. Set value safely
    // Usage: ro.space.set('app.config.version', '1.0.0', { override: false })
    set: function(path, value, options = {}) {
        const { override = true } = options;

        if (!isValidPath(path, '.')) {
            console.error(`[ro.space.set] Invalid path format: '${path}'`);
            return false;
        }

        const keys = path.split('.');
        const lastKey = keys.pop(); // The final property name
        let current = storage;

        // Traverse up to the parent of the last key
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            
            // Auto-create namespace if it doesn't exist
            if (!hasOwn(current, key)) {
                current[key] = {};
            }
            
            if (typeof current[key] !== 'object' || current[key] === null) {
                console.error(`[ro.space.set] Cannot set property on non-object at '${key}' in path '${path}'.`);
                return false;
            }

            current = current[key];
        }

        // Check for existing value
        if (!override && hasOwn(current, lastKey)) {
            console.warn(`[ro.space.set] Value at '${path}' already exists. Use { override: true } to overwrite.`);
            return false;
        }

        current[lastKey] = value;
        return true;
    },

    // 3. Get value (alias to ro.obj.get but targeting storage)
    get: function(path) {
        return get(storage, path);
    },

    // 4. Clear storage (mostly for testing)
    clear: function() {
        for (const key in storage) {
            delete storage[key];
        }
    },
    
    // 5. Dump (debug)
    dump: function() {
        return storage;
    }
};
