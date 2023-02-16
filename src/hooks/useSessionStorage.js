import { useState, useEffect } from "react";

const prefix = "codejs-";

function useSessionStorage(key, intialValue) {
  const prefixedKey = prefix + key;
  const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof intialValue === "function") {
      return intialValue();
    } else {
      return intialValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useSessionStorage;
