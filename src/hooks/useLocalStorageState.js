import { useState, useEffect } from "react";

export const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState();

  useEffect(() => {
    console.log("🐤 useEffect getItem");
    try {
      const item = localStorage.getItem(key);
      if (item) setState(JSON.parse(item));
      return;
    } catch (error) {
      console.log("useLocalStorageState Error:", error);
    }
    setState(defaultValue);
  }, [key, defaultValue]);

  useEffect(() => {
    console.log("useEffect state", state);
    if (state) localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
