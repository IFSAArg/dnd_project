declare module '@3d-dice/dice-box' {
  interface DiceBoxConfig {
    element?: HTMLElement
    id?: string
    assetPath?: string
  }

  interface DiceRollResult {
    total: number
    rolls: Array<{
      value: number
      sides: number
    }>
  }

  export default class DiceBox {
    constructor(config: DiceBoxConfig)

    init(): Promise<void>

    roll(notation: string): Promise<DiceRollResult>

    mount?(element: HTMLElement): void
  }
}