export const getTimeFormatter = (hour12:string) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: hour12 === '12h' }).format
