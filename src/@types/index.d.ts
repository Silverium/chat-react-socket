declare global {
  interface Window {
    // insert here any variables into window object
  }
  export const IS_LOCAL: boolean // from webpack.config.js
}

export {}
