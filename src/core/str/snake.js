export default function snake(text, upper = true) {
    try {
        if (typeof text !== 'string') {
            console.error('[ro.str.snake] Input must be a string.');
            return text;
        }

        let result = text
            .replace(/([a-z])([A-Z])/g, '$1_$2') // Handle camelCase boundaries
            .replace(/[^a-zA-Z0-9]+/g, '_')      // Replace non-alphanumeric with underscore
            .replace(/^_+|_+$/g, '');            // Remove leading/trailing underscores

        if (upper) {
            return result.toUpperCase();
        } else {
            return result.toLowerCase();
        }

    } catch (e) {
        console.error('[ro.str.snake] Error converting text:', e);
        return text;
    }
}
