export function copy(object) {
  let copyObject = {};
  let key;
  for (key in object) {
    copyObject[key] = object[key];
  }
  return copyObject;
}
