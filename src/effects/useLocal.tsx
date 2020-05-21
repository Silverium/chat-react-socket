/* global localStorage */
import React from 'react'
/**
 * Effect that wraps React.useState hook and syncs the state with local storage
 *
 * It has to be bound to "this", like in the following example
 * ```
 *  const [lang, setLang] = useLocal.bind(this)(LANGUAGE)
 * ```
 * @param localStorageKey key to save and retrieve from localStorage
 */
export const useLocal = (localStorageKey: string) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [value])

  return [value, setValue]
}
