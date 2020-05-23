import React from 'react'

import { defaultSettings } from '../constants'

export const SettingsContext = React.createContext({ ...defaultSettings, updateSetting: (setting:string, value:string) => {} })
