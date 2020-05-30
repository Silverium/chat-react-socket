export interface SettingsProps {
  [key: string]: string;
}

export const settingsProps: SettingsProps = {
  LANGUAGE: 'language',
  SEND_ENTER: 'sendEnter',
  THEME: 'theme',
  TIME_FORMAT: 'timeFormat',
  USER_NAME: 'userName',
  SMILEYS: 'smileys'
}
export const stringBooleans = {
  true: 'on',
  false: 'off'
}
export const booleanOptions = [stringBooleans.true, stringBooleans.false]

export const themes = ['light', 'dark']
export const languages = ['en', 'es']
export const timeFormats = ['12h', '24h']
export const sendEnterOptions = booleanOptions
export const smileysOptions = booleanOptions

export const availableSettings = {
  [settingsProps.LANGUAGE]: languages,
  [settingsProps.SEND_ENTER]: sendEnterOptions,
  [settingsProps.THEME]: themes,
  [settingsProps.TIME_FORMAT]: timeFormats,
  [settingsProps.SMILEYS]: smileysOptions,
  [settingsProps.USER_NAME]: ''
}

export const defaultSettings: SettingsProps = Object.entries(availableSettings).reduce(
  (acc, [key, value]) => {
    acc[key] = value[0]
    return acc
  },
  {} as SettingsProps
)
