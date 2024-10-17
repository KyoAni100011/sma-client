const LOCAL_STORAGE_PREFIX = "";

const localStorageUtils = {
  setItem: (key: string, value: any) => {
    if (typeof value === "object") {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(value));
    } else {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, value);
    }
  },

  getItem: (key: string) => {
    const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    }
    return null;
  },

  removeItem: (key: string) => {
    localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
  },

  clear: () => {
    localStorage.clear();
  },
};

export default localStorageUtils;
