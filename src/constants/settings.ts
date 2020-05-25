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

export const availableSettings = {
  [settings.LANGUAGE]: languages,
  [settings.SEND_ENTER]: ['true', 'false'],
  [settings.THEME]: themes,
  [settings.TIME_FORMAT]: timeFormats,
  [settings.USER_NAME]: ['Me']
}

export const defaultSettings = Object.entries(availableSettings).reduce(
  (acc, [key, value]) => {
    acc[key] = value[0]
    return acc
  },
  {} as any
)

export const getTimeFormatter = (hour12:boolean) => {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12 })
}
