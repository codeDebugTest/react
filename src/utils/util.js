const isArray = (arg) => {
    // support ie 8
    if (!Array.isArray) {
        Array.isArray = (arg) => {
          return typeof arg === 'object' && Object.prototype.toString.call(arg).slice(8, -1) === 'Array';
        }
    }
    return Array.isArray(arg);
};

const isObject = (value) => {
    return value !== null && typeof value === 'object' && Object.prototype.toString.call(value).slice(8, -1) === 'Object';
};

const varNotEmpty = (value) => {
    try {
        if (typeof value === 'undefined')
            return false;
        if (value === null)
            return false;
        if (typeof value === 'string' && value === '')
            return false;
        if (typeof value === 'object' && Object.keys(value).length === 0)
            return false;
        return true;
    }
    catch (e) {
        return false;
    }
};

const varEmpty = (value) => {
    return !varNotEmpty(value);
};

const keyNotEmpty = (obj, key) => {
    if (varEmpty(obj))
        return false;
    return varNotEmpty(obj[key]);
};

export {isArray, isObject, varEmpty, keyNotEmpty, varNotEmpty}