export default function camel(text) {
    if (typeof text !== 'string') {
        return false;
    }
    // CamelCase check: starts with lowercase, contains only letters and numbers
    // Example: myPlugin, myPlugin2, plugin
    // Invalid: MyPlugin, my-plugin, my_plugin, 2plugin, empty string
    return /^[a-z][a-zA-Z0-9]*$/.test(text);
}
