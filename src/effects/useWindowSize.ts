import React from 'react'
export interface WindowSize {
  height: number
  width: number
}
/**
 * Returns window's innerWidth and innerHeight
 */
export const useWindowSize = (): WindowSize => {
  const getSize = (): WindowSize => ({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [windowSize, setWindowSize] = React.useState(getSize)
  React.useEffect(() => {
    const onResize = () => {
      setWindowSize(getSize())
    }
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return windowSize
}
