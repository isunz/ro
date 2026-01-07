import extend from './core/extend/extend';
import plugin from './core/plugin/plugin';
import strCamel from './core/str/camel';
import strKebab from './core/str/kebab';
import strSnake from './core/str/snake';
import isCamel from './core/is/camel';
import objGet from './core/obj/get';
import listToMap from './core/list/toMap';
import space from './core/space/space';
import pathIsValid from './core/path/isValid';
import hasOwn from './core/hasOwn';
import isPlainObject from './core/isPlainObject';

/**
 * ro - Robust Utility Library
 * @namespace
 */
const ro = {
    extend: extend,
    hasOwn: hasOwn,
    plugin: plugin,
    str: {
        camel: strCamel,
        kebab: strKebab,
        snake: strSnake
    },
    is: {
        camel: isCamel,
        plainObject: isPlainObject
    },
    obj: {
        get: objGet
    },
    list: {
        toMap: listToMap
    },
    space: space,
    path: {
        isValid: pathIsValid
    }
};

// Bind plugin methods to ro instance so 'this' refers to 'ro'
ro.plugin.add = ro.plugin.add.bind(ro);

export default ro;
