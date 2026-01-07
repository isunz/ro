import isPlainObject from '../isPlainObject';
import hasOwn from '../hasOwn';

export default function extend(...args) {
    let options, name, src, copy, copyIsArray, clone;
    let target = args[0] || {};
    let i = 1;
    let length = args.length;
    let deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = args[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        // In strict mode or modules, 'this' might be undefined. 
        // Ensure 'this' is handled or remove this block if not extending the library itself.
        target = this || {}; 
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = args[i]) != null) {
            // Extend the base object
            for (name in options) {
                // Only copy own properties for safety
                if (!hasOwn(options, name)) {
                    continue;
                }

                copy = options[name];

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if (name === "__proto__" || target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) ||
                    (copyIsArray = Array.isArray(copy)))) {
                    src = target[name];

                    // Ensure proper type for the source value
                    if (copyIsArray && !Array.isArray(src)) {
                        clone = [];
                    } else if (!copyIsArray && !isPlainObject(src)) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    copyIsArray = false;

                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};
