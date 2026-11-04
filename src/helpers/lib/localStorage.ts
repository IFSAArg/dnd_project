export enum LOCAL_STORAGE_KEYS {
  CHARS = 'localCharsData',
  MARKERS = 'localMarkersData'
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saveArrayToLocalStorage(key: LOCAL_STORAGE_KEYS, array: any) {
  const jsonString = JSON.stringify(array)
  localStorage.setItem(key, jsonString)
}

export function getArrayFromLocalStorage(key: LOCAL_STORAGE_KEYS) {
  const jsonString = localStorage.getItem(key)
  return jsonString ? JSON.parse(jsonString) : null
}

