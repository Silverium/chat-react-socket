import React from 'react'
import mapValues from 'lodash-es/mapValues'

import { defaultSettings } from '../constants'

export const SettingsContext = React.createContext({
  ...defaultSettings,
  updateSettings: mapValues(defaultSettings, (setting:string) => (value:string) => {}),
  resetSettings: () => {},
  settings: defaultSettings,
  timeFormatter: new Intl.DateTimeFormat().format
})
