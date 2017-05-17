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

export {isArray, isObject}