/* global localStorage */
import React from 'react'
import './App.scss'
import Settings from '../Settings'
import { SettingsContext } from '../../context/settings'
import { defaultSettings, themeDefinitions } from '../../constants/'
export interface themeProps {
  foreground: string;
  background: string;
}
const App: React.FunctionComponent<{}> = () => {
  // we don't use "effects/useLocal" here, we don't want to save it twice
  const allSettings = Object.entries(defaultSettings).reduce((acc: any, [key, value]) => {
    acc[key] = localStorage.getItem(key) || value
    return acc
  }, {})
  const [settings, setSettings] = React.useState(allSettings)
  const selectedTheme = (themeDefinitions as { [key: string]: themeProps })[settings.theme]
  return (
    <SettingsContext.Provider value={{ ...settings, updateSetting: (key: string, value: string) => { setSettings({ ...settings, [key]: value }) } }}>

      <div className='container'>
        theme is {settings.theme} {selectedTheme.background}
        <Settings />
      </div>
    </SettingsContext.Provider>
  )
}

export default App
