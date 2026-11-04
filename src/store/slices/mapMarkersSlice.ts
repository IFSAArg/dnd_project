import { LOCAL_STORAGE_KEYS, saveArrayToLocalStorage } from '../../helpers/lib/localStorage';
import { IMarkerScheme, IMarkerState } from './../../types/mapMarker';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMarkerScheme = {
  mapMarkers: [],
}

const mapMarkerSlice = createSlice({
  name: 'mapMarkers',
  initialState,
  reducers: {
    setMapMarkersData: (state, action: PayloadAction<IMarkerState[]>) => {
      const mapMarkersData = action.payload

      saveArrayToLocalStorage(LOCAL_STORAGE_KEYS.MARKERS, mapMarkersData)
      state.mapMarkers = mapMarkersData
    },
    addMapMarker: (state, action: PayloadAction<IMarkerState>) => {
      const mapMarkersData = state.mapMarkers

      mapMarkersData.push(action.payload)
      saveArrayToLocalStorage(LOCAL_STORAGE_KEYS.MARKERS, mapMarkersData)
    },
    deleteMapMarker: (state, action: PayloadAction<string>) => {
      const newMapMarkersData = state.mapMarkers.filter(marker => marker.id !== action.payload)

      state.mapMarkers = newMapMarkersData
      saveArrayToLocalStorage(LOCAL_STORAGE_KEYS.MARKERS, newMapMarkersData)
    },
    updateMarkerPosition: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
      const marker = state.mapMarkers.find(m => m.id === action.payload.id)

      if (marker) {
        marker.x = action.payload.x
        marker.y = action.payload.y
      }

      saveArrayToLocalStorage(LOCAL_STORAGE_KEYS.MARKERS, state.mapMarkers)
    }
  }
})

export const { setMapMarkersData, addMapMarker, deleteMapMarker, updateMarkerPosition} = mapMarkerSlice.actions

export default mapMarkerSlice.reducer