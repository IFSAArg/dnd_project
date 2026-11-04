import React, { FC, memo } from 'react'
import cl from "./MySelect.module.scss"

interface IOption {
  value: string,
  title: string,
}

interface MySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  options: IOption[],
  defaultOption: string,
}

const MySelect: FC<MySelectProps> = ({onChange, options, defaultOption, value, ...props}) => {
  return (
    <select
      className={cl.mySelect}
      value={value}
      onChange={onChange}
      {...props}
    >
      <option value='' disabled>{defaultOption}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.title}</option>
      ))}
    </select>
  )
};

export default memo(MySelect)