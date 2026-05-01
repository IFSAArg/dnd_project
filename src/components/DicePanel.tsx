import { useState, ChangeEvent } from 'react'
import MySelect from './UI/MySelect/MySelect'
import MyInput from './UI/MyInput/MyInput'
import MyButton, { BUTTON_SIZE_TYPE, BUTTON_THEME_TYPE, BUTTON_WIDTH_TYPE } from './UI/MyButton/MyButton'
import {Rnd} from "react-rnd";
import toastr from "../helpers/constants/toasterConfig"
import {useDiceBox} from "../helpers/hooks/useDiceBox.ts";

const diceOptions = [
  { value: 'd4', title: 'd4' },
  { value: 'd6', title: 'd6' },
  { value: 'd8', title: 'd8' },
  { value: 'd10', title: 'd10' },
  { value: 'd12', title: 'd12' },
  { value: 'd20', title: 'd20' },
]

const DicePanel = () => {
  const [count, setCount] = useState('1')
  const [diceType, setDiceType] = useState('')
  const { roll } = useDiceBox()


  const handleRoll = () => {
    const numericCount = Number(count)

    if (!numericCount || numericCount <= 0 || numericCount > 20) return
    if (!diceType) {
      toastr.warning('Выберите тип кубика')
      return
    }

    const choice = {
      diceCount: numericCount,
      diceType,
    }

    roll(choice).then()
  }

  const handleAttackRoll = () => {
    roll({diceCount: 1, diceType: 'd20'}).then()
  }

  const defaultPosition = {
    x: window.innerWidth - 275, // отступ справа
    y: window.innerHeight - 320, // по центру
    width: 130,
    height: 200,
  }

  return (
    <Rnd
      bounds="body"
      enableResizing={false}
      default={defaultPosition}
    >
      <div className='dicePanel'>
        <MySelect
          value={diceType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setDiceType(e.target.value)}
          options={diceOptions}
          defaultOption="Тип"
        />

        <MyInput
          type="number"
          value={count}
          min={1}
          max={20}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCount(e.target.value)}
          placeholder="Количество"
        />

        <MyButton
          size={BUTTON_SIZE_TYPE.M}
          theme={BUTTON_THEME_TYPE.DEFAULT}
          width={BUTTON_WIDTH_TYPE.FULL}
          onClick={handleRoll}
        >
          Бросить
        </MyButton>
        <MyButton
          size={BUTTON_SIZE_TYPE.M}
          theme={BUTTON_THEME_TYPE.DEFAULT}
          width={BUTTON_WIDTH_TYPE.FULL}
          onClick={handleAttackRoll}
        >
          Атака
        </MyButton>
      </div>
    </Rnd>
  )
}

export default DicePanel