import React from 'react'
import './Button.scss'
export interface ButtonProps extends React.ButtonHTMLAttributes<{}>{
  color:string
}
const Button: React.FunctionComponent<ButtonProps> = (props) => (
  <button {...props} className={`btn-${props.color || 'primary'}`}>{props.children}</button>
)

export default Button
