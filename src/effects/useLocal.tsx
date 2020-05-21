/* global localStorage */
import React from 'react'
export const useLocal = (localStorageKey: string) => {
  console.log(localStorageKey)
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [value])

  return [value, setValue]
}
