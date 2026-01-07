export default function kebab(text) {
    try {
        if (typeof text !== 'string') {
            console.error('[ro.str.kebab] Input must be a string.');
            return text;
        }

        return text
            .replace(/([a-z])([A-Z])/g, '$1-$2') // Handle camelCase boundaries
            .replace(/[^a-zA-Z0-9]+/g, '-')      // Replace non-alphanumeric with hyphen
            .replace(/^-+|-+$/g, '')             // Remove leading/trailing hyphens
            .toLowerCase();

    } catch (e) {
        console.error('[ro.str.kebab] Error converting text:', e);
        return text;
    }
}
