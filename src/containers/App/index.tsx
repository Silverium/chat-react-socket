/* global localStorage */
import React from 'react'
import each from 'lodash-es/each'
import './App.scss'
import { useLocal } from '../../effects/useLocal'
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
  const updateSettings: { [key: string]: React.Dispatch<React.SetStateAction<string>> } = {}
  const settings: { [key: string]: string } = {}
  each(defaultSettings, (_value: string, key: string) => {
    const [settingValue, updateValue] = useLocal.bind(this)(key)
    settings[key] = settingValue
    updateSettings[key] = (toUpdate:string) => {
      settings[key] = toUpdate
      updateValue(toUpdate)
    }
  })
  // const [settings, setSettings] = useLocal.bind(this)(allSettings)
  const selectedTheme = (themeDefinitions as { [key: string]: themeProps })[settings.theme]
  const resetSettings = () => {
    each(defaultSettings, (value: string, key: string) => {
      updateSettings[key](value)
    })
  }
  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings, resetSettings }}>

      <div className='container'>
        theme is {settings.theme} {selectedTheme.background} {settings.timeFormat}
        <Settings />
      </div>
    </SettingsContext.Provider>
  )
}

export default App
