import { useState, useEffect } from "react";

const prefix = "codejs-";

function useLocalStorage(key, intialValue) {
  const prefixedKey = prefix + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof intialValue === "function") {
      return intialValue();
    } else {
      return intialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
