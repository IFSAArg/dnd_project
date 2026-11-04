import {useEffect, useRef} from 'react'
import DiceBox from '@3d-dice/dice-box'
import toastr from "../constants/toasterConfig.ts"

export const useDiceBox = () => {
  const diceBoxRef = useRef<DiceBox | null>(null)
  const clearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingResultRef = useRef<number | null>(null)

  useEffect(() => {
    const diceBox = new DiceBox({
      id: 'dice-box',
      assetPath: '/assets/',
    })

    diceBoxRef.current = diceBox
    diceBox.init()

    return () => {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current)
      }
    }
  }, [])

  interface rollProps {
    diceCount: number,
    diceType: string,
  }

  const roll = async ({diceCount, diceType}: rollProps) => {
    if (!diceBoxRef.current) return

    const notation = `${diceCount}${diceType}`
    const delay = Math.min(5000, diceCount * 1000)
    const shouldSaveResult = diceCount > 3 && diceType !== 'd20'

    try {
      const result = await diceBoxRef.current.roll(notation)

      if (shouldSaveResult) {
        const total = Array.isArray(result)
          ? result.reduce((sum, r) => sum + r.value, 0)
          : result.total ?? 0

        pendingResultRef.current = total
      }

      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current)
      }

      clearTimeoutRef.current = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        diceBoxRef.current?.clear?.()

        if (shouldSaveResult && pendingResultRef.current !== null) {
          toastr.success(`Результат: ${pendingResultRef.current}`)
          pendingResultRef.current = null
        }
      }, delay)

    } catch (e) {
      console.error('Dice roll error:', e)
    }
  }

  return { roll }
}