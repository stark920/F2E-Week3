/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export default function pick(object: object, keys: string[]): object {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // @ts-ignore:next-line
      obj[key] = object[key];
    }
    return obj;
  }, {});
};