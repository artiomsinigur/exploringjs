export function isObject(x) {
  // return x !== null && (typeof x === 'object' || typeof x === 'function');
  switch (typeof x) {
    case 'object':
    case 'function':
      return x !== null;
    default:
      return false;
  }
}
