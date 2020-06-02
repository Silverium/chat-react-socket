export const getTimeFormatter = (hour12:string) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: hour12 === '12h' }).format

/**
 * Escapes special characters to be valid in a RegExp string
 * @param text with special chars that will be prepended with backslash
 */
export const escape = (text:string) => text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

/**
 * Replaces ascii emojis with actual emojis. From :) to 😊
 * @param text with characters combinations to be replaced
 */
export const replaceStringWithEmoji = (text:string) => {
  const emojiMap: { [key:string]: string } = {
    ':)': '😊',
    ':(': '🙁',
    ':D': '😁',
    xD: '😆',
    ';(': '😥',
    ':O': '😮',
    ';)': '😉',
    '8)': '😎',
    '>:@': '😡',
    ':P': '😛'
  }
  const pattern = new RegExp(
    Object.keys(emojiMap).map(escape).join('|'),
    'g'
  )
  return text.replace(pattern, (match:string) => emojiMap[match])
}
export interface GetSettingsProps {
  key: string;
  constants: {
    availableSettings: {[key: string] : string[]};
    settings: {[key: string]: string}
    updateSettings: { [key: string]: (key:string)=> void}
    t: (key:string)=> string
    upperFirst: (key:string)=> string
  }
}
/**
 * Returns an object to be used as settings props.
 * It represents a standard for the inputs, so with the same
 * SettingsProps object it can render a select, a radio button
 * or a checkbox or any other kind of input
 * @param key It is used to store into localStorage
 * @param constants This object comprises all the dependencies
 */
export const getSettingsProps = (key: GetSettingsProps['key'], { availableSettings, settings, updateSettings, t, upperFirst }: GetSettingsProps['constants']) => ({
  storageKey: key,
  label: upperFirst(t(key)),
  value: settings[key],
  useChange: (value:string) => updateSettings[key](value),
  options: availableSettings[key].map((value: string) => ({
    value,
    text: upperFirst(t(value))
  }))
})
