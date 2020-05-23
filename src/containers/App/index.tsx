/* global localStorage */
import React from 'react'
import './App.scss'
import Settings from '../Settings'
import { ThemeContext, themes } from '../../context/theme'
export interface themeProps {
  foreground: string;
  background: string;
}
const App: React.FunctionComponent<{}> = () => {
  // we don't use "effects/useLocal" here, we don't want to save it twice
  const themeStored = localStorage.getItem('theme') || 'light'
  const [theme, setTheme] = React.useState(themeStored)
  const selectedTheme = (themes as {[key: string]:themeProps})[theme]
  return (
    <ThemeContext.Provider value={{ theme, updateTheme: (newTheme: string) => { setTheme(newTheme) } }}>
      <div className='container'>
        theme is {theme} {selectedTheme.background}
        <Settings />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
