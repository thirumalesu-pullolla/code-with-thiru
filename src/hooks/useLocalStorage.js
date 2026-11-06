
import { useCallback, useEffect, useState } from "react";

function useLocalStorage(key, initialValue, isValid = () => true) {
  const [storedState, setStoredState] = useState(() => {
    if (typeof window === "undefined") {
      return { value: initialValue, shouldPersist: false };
    }

    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue === null) {
        return { value: initialValue, shouldPersist: true };
      }

      const parsedValue = JSON.parse(storedValue);
      if (!isValid(parsedValue)) {
        console.error(`Invalid localStorage data for "${key}"`);
        return { value: initialValue, shouldPersist: false };
      }

      return { value: parsedValue, shouldPersist: true };
    } catch (error) {
      console.error("Failed to read localStorage:", error);
      return { value: initialValue, shouldPersist: false };
    }
  });

  useEffect(() => {
    if (!storedState.shouldPersist || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(storedState.value)
      );
    } catch (error) {
      console.error("Failed to save localStorage:", error);
    }
  }, [key, storedState]);

  const setValue = useCallback((nextValue) => {
    setStoredState((current) => ({
      value:
        typeof nextValue === "function"
          ? nextValue(current.value)
          : nextValue,
      shouldPersist: true
    }));
  }, []);

  return [storedState.value, setValue];
}

export default useLocalStorage;
