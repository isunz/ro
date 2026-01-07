export default function isValid(path, options) {
    if (typeof path !== 'string' || !path) {
        return false;
    }

    // Determine separator
    let sep = '/'; // Default
    if (typeof options === 'string') {
        sep = options;
    } else if (typeof options === 'object' && options !== null) {
        if (options.separator) sep = options.separator;
        else if (options.sep) sep = options.sep;
    }

    // Normalize path: if separator is '/', treat '\' as '/'
    // This handles mixed usage like 'a/b\c' -> 'a/b/c'
    let normalizedPath = path;
    if (sep === '/') {
        normalizedPath = path.replace(/\\/g, '/');
    }

    // 1. Check start/end with separator
    if (normalizedPath.startsWith(sep) || normalizedPath.endsWith(sep)) {
        return false;
    }

    // 2. Check consecutive separators (e.g., '..', '//')
    // Escape separator for regex if needed (e.g., '.')
    const escapedSep = sep === '.' ? '\\.' : sep;
    const consecutiveRegex = new RegExp(`${escapedSep}{2,}`);
    
    if (consecutiveRegex.test(normalizedPath)) {
        return false;
    }

    // 3. Check invalid characters
    // Allowed: alphanumeric, _, $, -, ., and the separator itself
    // We construct a regex that allows these characters
    // Always allow dot (.) as it's common in file names (e.g., .txt) even if sep is '/'
    // If sep is '.', it's already included in escapedSep
    
    let charsPattern = `a-zA-Z0-9_$\\-${escapedSep}`;
    if (sep !== '.') {
        charsPattern += '\\.'; // Add dot if it's not the separator
    }

    const allowedCharsRegex = new RegExp(`^[${charsPattern}]+$`);
    
    return allowedCharsRegex.test(normalizedPath);
}
