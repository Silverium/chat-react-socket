import React from 'react'
import omit from 'lodash-es/omit'
// import { useLocal } from '@/effects/useLocal'

export interface RadioSettingOption {
  value: string;
  text: string;
}
export interface RadioSettingProps extends React.InputHTMLAttributes<{}>{
  storageKey: string;
  label: string;
  useChange?: (value: string)=> void;
  options: RadioSettingOption[];
  value?: string;
}

const RadioSetting: React.FunctionComponent<RadioSettingProps> = (props): JSX.Element => {
  const { label, storageKey, options, useChange, value } = props
  const [current, updateValue] = React.useState(value)
  const updateSetting = (inputValue: React.FormEvent<HTMLInputElement>) => {
    updateValue(inputValue.currentTarget.value)
    if (useChange)useChange(inputValue.currentTarget.value)
  }

  return (
    <div className='RadioSetting flex flex-column' {...omit(props, ['useChange', 'options', 'storageKey'])}>
      <label htmlFor={storageKey}>{label}</label>
      <section className='Options flex justify-content-between px-3'>
        {options.map(({ value, text }, i) => (
          <label key={i} className='grow-1'>
            <input type='radio' checked={value === current} value={value} onChange={updateSetting} />
            {text}
          </label>
        ))}
      </section>
    </div>
  )
}

export default RadioSetting
