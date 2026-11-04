import React, { FC, memo } from 'react'
import cl from './MyInput.module.scss'

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyInput: FC<MyInputProps> = ({onChange, ...props}) => {
  return (
    <input 
      className={cl.myInput} 
      onChange={onChange} 
      {...props} 
    />
  )
}

export default memo(MyInput)