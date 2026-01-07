import get from '../obj/get';

export default function toMap(list, keyPath) {
    try {
        if (!Array.isArray(list)) {
            console.error('[ro.list.toMap] First argument must be an array.');
            return {};
        }

        if (typeof keyPath !== 'string' || !keyPath) {
            console.error('[ro.list.toMap] Second argument must be a key path string.');
            return {};
        }

        const result = {};
        const isSimpleKey = keyPath.indexOf('.') === -1;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            let key;

            // Optimization: Direct access for simple keys
            if (isSimpleKey) {
                if (item != null) {
                    key = item[keyPath];
                }
            } else {
                // Use ro.obj.get logic for nested paths
                key = get(item, keyPath);
            }

            if (key !== undefined && key !== null) {
                // Convert key to string to ensure it can be an object key
                result[String(key)] = item;
            }
        }

        return result;

    } catch (e) {
        console.error('[ro.list.toMap] Error converting list to map:', e);
        return {};
    }
}
