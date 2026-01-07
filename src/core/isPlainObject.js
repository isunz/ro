import hasOwn from './hasOwn';

export default function isPlainObject(obj) {
    let proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== '[object Object]') {
        return false;
    }

    proto = Object.getPrototypeOf(obj);

    // Objects with no prototype (e.g., Object.create( null )) are plain
    if (!proto) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn(proto, 'constructor') && proto.constructor;
    return typeof Ctor === 'function' && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
}
