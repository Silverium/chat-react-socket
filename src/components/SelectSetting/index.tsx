import React from 'react'

// import { useLocal } from '@/effects/useLocal'

export interface SelectSettingOption {
  value: string;
  text: string;
}
export interface SelectSettingProps extends React.InputHTMLAttributes<{}>{
  storagekey: string;
  label: string;
  usechange?: (value: string)=> void;
  options: SelectSettingOption[];
  value?: string;
}

const SelectSetting: React.FunctionComponent<SelectSettingProps> = (props) => {
  const { label, storagekey, options, usechange, value } = props
  const [, updateValue] = React.useState(value)
  const updateSetting = (inputValue: React.FormEvent<HTMLSelectElement>) => {
    updateValue(inputValue.currentTarget.value)
    if (usechange)usechange(inputValue.currentTarget.value)
  }

  return (
    <div className='SelectSetting flex flex-column' {...props}>
      <label htmlFor={storagekey}>{label}</label>
      <select name={storagekey} value={value} onChange={updateSetting}>
        {options.map(({ value, text }, i) => (
          <option key={i} value={value}>{text}</option>))}
      </select>
    </div>
  )
}

export default SelectSetting
