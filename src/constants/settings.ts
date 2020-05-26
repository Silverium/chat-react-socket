export interface SettingsProps {
  [key: string]: string;
}

export const settingsProps: SettingsProps = {
  LANGUAGE: 'language',
  SEND_ENTER: 'sendEnter',
  THEME: 'theme',
  TIME_FORMAT: 'timeFormat',
  USER_NAME: 'userName'
}

export const themes = ['light', 'dark']
export const languages = ['en', 'es']
export const timeFormats = ['12h', '24h']
export const sendEnterOptions = ['true', 'false']

export const availableSettings = {
  [settingsProps.LANGUAGE]: languages,
  [settingsProps.SEND_ENTER]: sendEnterOptions,
  [settingsProps.THEME]: themes,
  [settingsProps.TIME_FORMAT]: timeFormats,
  [settingsProps.USER_NAME]: ''
}

export const defaultSettings: SettingsProps = Object.entries(availableSettings).reduce(
  (acc, [key, value]) => {
    acc[key] = value[0]
    return acc
  },
  {} as SettingsProps
)
