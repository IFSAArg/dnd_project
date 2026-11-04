
export interface IMarkerScheme {
  mapMarkers: IMarkerState[],
}

export enum MARKER_COLOR_TYPE {
  EMPTY = "",
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  YELLOW = "yellow",
  ORANGE = "orange",
  PURPLE = "purple",
}

export enum MARKER_CHARACTER_TYPE {
  KOVROLIN = "kovrolin",
  GATS = "gats",
  UKULILYA = "ukulilya",
  MICROWAVE = "microwave",
  KARIAN = "karian",
  VOLMUS = "volmus",
  TERAEL = "terael",
  TWIN = "twin",
  GUARDIAN = "guardian",
  OFFICER = "officer",
  CROSSBOWMAN = "crossbowman",
  GORGUS = "gorgus",
  GRUZ = "gruz",
}

export enum MARKER_SIZE_TYPE {
  EMPTY = "",
  S = "small",
  M = "medium", 
  L = "large",
  XL = "extra_large",
}

export interface IMarkerState {
  id: string,
  name: string,
  color: MARKER_COLOR_TYPE | MARKER_CHARACTER_TYPE,
  size: MARKER_SIZE_TYPE,
  x: number,
  y: number,
  locationId: string
}

export const markerColorOptions = [
  {value: MARKER_CHARACTER_TYPE.GUARDIAN, title: "Стражник"},
  {value: MARKER_CHARACTER_TYPE.OFFICER, title: "Офицер"},
  {value: MARKER_CHARACTER_TYPE.CROSSBOWMAN, title: "Стрелок"},
  {value: MARKER_COLOR_TYPE.RED, title: "Красный"},
  {value: MARKER_COLOR_TYPE.GREEN, title: "Зелёный"},
  {value: MARKER_COLOR_TYPE.BLUE, title: "Синий"},
  {value: MARKER_COLOR_TYPE.YELLOW, title: "Жёлтый"},
  {value: MARKER_COLOR_TYPE.ORANGE, title: "Оранжевый"},
  {value: MARKER_COLOR_TYPE.PURPLE, title: "Фиолетовый"},
  {value: MARKER_CHARACTER_TYPE.KOVROLIN, title: "Ковролин"},
  {value: MARKER_CHARACTER_TYPE.GATS, title: "Гатс"},
  {value: MARKER_CHARACTER_TYPE.UKULILYA, title: "Укулиля"},
  {value: MARKER_CHARACTER_TYPE.MICROWAVE, title: "Микроволновка"},
  {value: MARKER_CHARACTER_TYPE.KARIAN, title: "Кариан"},
  {value: MARKER_CHARACTER_TYPE.VOLMUS, title: "Волмус"},
  {value: MARKER_CHARACTER_TYPE.TERAEL, title: "Тераэль"},
  {value: MARKER_CHARACTER_TYPE.TWIN, title: "Близнец"},
  {value: MARKER_CHARACTER_TYPE.GORGUS, title: "Горгус"},
  {value: MARKER_CHARACTER_TYPE.GRUZ, title: "Грузчик"},
]

export const markerSizeOptions = [
  {value: MARKER_SIZE_TYPE.S, title: "S"},
  {value: MARKER_SIZE_TYPE.M, title: "M"},
  {value: MARKER_SIZE_TYPE.L, title: "L"},
  {value: MARKER_SIZE_TYPE.XL, title: "XL"},
]