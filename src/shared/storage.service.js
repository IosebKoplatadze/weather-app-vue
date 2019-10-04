const set = (key, value) => {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.log('Error saving to localStorage', e);
    return false;
  }
};
const get = key => {
  try {
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    return value;
  } catch (e) {
    console.log('Error getting data from localStorage', e);
    return undefined;
  }
};

export const storageService = {
  set,
  get,
};
