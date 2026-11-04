import React, { ButtonHTMLAttributes, FC, memo } from 'react'
import cl from './MyButton.module.scss'
import classNames from 'classnames';

export enum BUTTON_SIZE_TYPE {
  S = "small",
  M = "medium",
  L = "large",
}

export enum BUTTON_WIDTH_TYPE {
  FULL = "width__full",
  AUTO = "width__auto",
}

export enum BUTTON_THEME_TYPE {
  DEFAULT = 'default',
}

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size: BUTTON_SIZE_TYPE;
  theme: BUTTON_THEME_TYPE;
  width: BUTTON_WIDTH_TYPE;
}

const MyButton: FC<MyButtonProps> = (props) => {
  const {onClick, children, size, theme, width, ...rest} = props

  return (
    <button
      className={classNames(cl.myButton, cl[size], cl[theme], cl[width])}
      {...rest}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

export default memo(MyButton)