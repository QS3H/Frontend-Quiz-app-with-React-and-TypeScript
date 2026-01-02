/**
 * Custom Hook: useLocalStorage
 *
 * A custom React hook that provides persistent state management using localStorage.
 * Works similarly to useState but automatically saves/loads values from browser storage.
 *
 * Features:
 * - Automatic persistence across browser sessions
 * - TypeScript support with generics
 * - Error handling for localStorage issues
 * - Functional updates (same API as useState)
 * - SSR-safe (works with server-side rendering)
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('app-theme', 'light');
 * const [count, setCount] = useLocalStorage<number>('counter', 0);
 * ```
 */

import { useState } from "react";

/**
 * Custom hook for persistent state management with localStorage
 *
 * @template T - The type of value to store
 * @param key - Unique key for localStorage (should be namespaced to avoid conflicts)
 * @param initialValue - Default value if no stored value exists
 * @returns Tuple of [currentValue, setterFunction] similar to useState
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Setter function that updates both state and localStorage
   * Supports both direct values and functional updates (like useState)
   *
   * @param value - New value or function that receives current value and returns new value
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
