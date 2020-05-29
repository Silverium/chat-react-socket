export const getTimeFormatter = (hour12:string) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: hour12 === '12h' }).format

export const escape = (s:string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

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
