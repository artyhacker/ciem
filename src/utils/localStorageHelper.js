const ls = window.localStorage;
class LocalStorageHelper {
  static key(index) {
    return ls.key(index);
  }

  static getLength() {
    return ls.length;
  }

  static getItem(key) {
    return JSON.parse(ls.getItem(key));
  }

  static setItem(key, value) {
    return ls.setItem(key, JSON.stringify(value));
  }

  static removeItem(key) {
    ls.removeItem(key);
  }

  static clear() {
    ls.clear();
  }
}


export default LocalStorageHelper;
