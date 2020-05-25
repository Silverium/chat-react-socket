export const settings = {
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
  [settings.LANGUAGE]: languages,
  [settings.SEND_ENTER]: sendEnterOptions,
  [settings.THEME]: themes,
  [settings.TIME_FORMAT]: timeFormats,
  [settings.USER_NAME]: ''
}

export const defaultSettings = Object.entries(availableSettings).reduce(
  (acc, [key, value]) => {
    acc[key] = value[0]
    return acc
  },
  {} as any
)
// TODO: find a good place for getTimeFormatter
export const getTimeFormatter = (hour12:string) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: hour12 === '12h' }).format
