import { FC } from 'react'
import classNames from 'classnames'
import cl from './MyLoader.module.scss'

export enum MY_LOADER_TYPE {
  IMAGE = 'myImageLoader',
  CHARACTERS = 'myCharactersLoader'
}

interface MyLoaderProps {
  type: MY_LOADER_TYPE
}

const MyLoader: FC<MyLoaderProps> = ({type}) => {
  return (
    <div className="div_center">
      <div className={classNames(cl[type])}></div>
    </div>
  )
}

export default MyLoader