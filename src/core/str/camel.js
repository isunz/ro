export default function camel(text) {
    try {
        if (typeof text !== 'string') {
            console.error('[ro.str.camel] Input must be a string.');
            return text;
        }

        // 1. Replace camelCase boundaries (lowerUpper) with space
        // 2. Replace non-alphanumeric characters with space
        // 3. Split by space
        const words = text
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[^a-zA-Z0-9]+/g, ' ')
            .trim()
            .split(/\s+/);

        if (words.length === 0 || (words.length === 1 && words[0] === '')) {
            return text;
        }

        return words.map((word, index) => {
            // Lowercase the whole word first
            const lower = word.toLowerCase();
            // If it's the first word, keep it lower. Otherwise, capitalize first letter.
            if (index === 0) {
                return lower;
            }
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        }).join('');

    } catch (e) {
        console.error('[ro.str.camel] Error converting text:', e);
        return text;
    }
}
