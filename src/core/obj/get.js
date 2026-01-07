export default function get(obj, path) {
    try {
        // Safety checks
        if (obj == null) {
            return undefined;
        }
        if (typeof path !== 'string' || !path) {
            return undefined;
        }

        // Fast path: if no dot, access directly
        if (path.indexOf('.') === -1) {
            return obj[path];
        }

        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            
            // Skip empty keys (handles 'a..b' or 'a.b.')
            if (!key) {
                continue;
            }
            
            // If current is not an object/array, return undefined
            if (current == null || typeof current !== 'object') {
                return undefined;
            }

            current = current[key];

            // If we hit undefined at any point, stop and return undefined
            if (current === undefined) {
                return undefined;
            }
        }

        return current;

    } catch (e) {
        console.error('[ro.obj.get] Error getting path:', e);
        return undefined;
    }
}
