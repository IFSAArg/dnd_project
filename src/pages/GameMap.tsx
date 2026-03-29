import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useAppDispatch } from '../helpers/hooks/useAppDispatch/useAppDispatch'
import { getArrayFromLocalStorage, LOCAL_STORAGE_KEYS } from '../helpers/lib/localStorage'
import { useGetCharacters } from '../store/services/characterApi'
import { useDeleteMarker, useGetMarkers } from '../store/services/mapMarkersApi'
import { useGetLocations } from '../store/services/locationsApi'
import { setCharactersData } from '../store/slices/charactersSlice'
import { deleteMapMarker, setMapMarkersData } from '../store/slices/mapMarkersSlice'
import { closeAllModals, closeModal, openModal } from '../store/slices/modalSlice'
import MyButton, { BUTTON_WIDTH_TYPE, BUTTON_THEME_TYPE, BUTTON_SIZE_TYPE, IButtonDisabledFlag  } from '../components/UI/MyButton/MyButton'
import MyModal, { MODAL_CONTENT_TYPE, MODAL_SIZE_TYPE } from '../components/UI/MyModal/MyModal'
import MyMapMarker from '../components/UI/MyMapMarker/MyMapMarker'
import MapCharacter from '../components/MapCharacter'
import MyLoader, { MY_LOADER_TYPE } from '../components/UI/MyLoader/MyLoader'
import CharacterMarkerForm from '../components/CharacterMarkerForm'

const GameMap = () => {
  const dispatch = useAppDispatch()
  const [deleteMarker] = useDeleteMarker()
  const isLocalCharsData = getArrayFromLocalStorage(LOCAL_STORAGE_KEYS.CHARS)
  const isLocalMarkersData = getArrayFromLocalStorage(LOCAL_STORAGE_KEYS.MARKERS)
  const {data: characters, isLoading: isCharactersLoading} = useGetCharacters(null)
  const {data: markers, isLoading: isMarkersLoading} = useGetMarkers(null)
  const {data: locations = [], isLoading: isLocationLoading} = useGetLocations(null)
  const [locationNumber, setLocationNumber] = useState<number>(0)

  useEffect(() => {
    if (!isLocalCharsData && characters) {
      dispatch(setCharactersData(characters))
    } else {
      dispatch(setCharactersData(isLocalCharsData))
    }
  }, [dispatch, characters])

  useEffect(() => {
    if (!isLocalMarkersData && markers) {
      dispatch(setMapMarkersData(markers))
    } else {
      dispatch(setMapMarkersData(isLocalMarkersData))
    }
  }, [dispatch, markers])

  const locationImage = {
      backgroundImage: `url(${locations[locationNumber]?.url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
  }

  const isBackButtonDisabled = locationNumber === 0
  const isForwardButtonDisabled = locationNumber === locations.length - 1

  const handleForwardSwitchLocation = () => {
    setLocationNumber(locationNumber + 1)
  }

  const handleBackSwitchLocation = () => {
    setLocationNumber(locationNumber - 1)
  }

  const addNewPlayerMarker = () => {
    dispatch(openModal({id: MODAL_CONTENT_TYPE.MARKER_FORM}))
  }

  const handleCloseAllModals = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    dispatch(closeAllModals())
  }

  const deletePlayerMarker = (id: string) => {
    dispatch(deleteMapMarker(id))
    deleteMarker(id)

    dispatch(closeModal(MODAL_CONTENT_TYPE.MARKER_MENU))
  }


  return (
    <div className='map__page'>
      <div className="map__page__characters">
        {isCharactersLoading 
          ? <MyLoader type={MY_LOADER_TYPE.CHARACTERS}/>
          : characters?.map(character => (
            <MapCharacter key={character.id} character={character}/>
          ))
        }
      </div>
      <div className="map__page__buttons">
        <div className='map__page__buttons__switch'>
          <MyButton disabled={isBackButtonDisabled} size={BUTTON_SIZE_TYPE.M} theme={BUTTON_THEME_TYPE.DEFAULT} onClick={() => handleBackSwitchLocation()} width={BUTTON_WIDTH_TYPE.FULL}>Назад</MyButton>
          <MyButton disabled={isForwardButtonDisabled} size={BUTTON_SIZE_TYPE.M} theme={BUTTON_THEME_TYPE.DEFAULT} onClick={() => handleForwardSwitchLocation()} width={BUTTON_WIDTH_TYPE.FULL}>Вперёд</MyButton>
        </div>
        <MyButton size={BUTTON_SIZE_TYPE.M} theme={BUTTON_THEME_TYPE.DEFAULT} onClick={addNewPlayerMarker} width={BUTTON_WIDTH_TYPE.FULL}>Добавить Маркер</MyButton>
      </div>
      <div className={classNames("map__page__main")} style={locationImage} onClick={handleCloseAllModals}>
        { isLocationLoading 
          ? <MyLoader type={MY_LOADER_TYPE.IMAGE}/>
          : markers?.map((marker, index) => (
              <MyMapMarker 
                key={marker.id}
                id={marker.id} 
                index={index+1}
                name={marker.name} 
                color={marker.color} 
                size={marker.size}
              />
        ))}
      </div>
      {markers?.map(marker => (
        <MyModal
          key={`markerMenu_${marker.id}`}
          size={MODAL_SIZE_TYPE.FLEX_SCREEN}
          id={`markerMenu_${marker.id}`}
        >
          <MyButton
            size={BUTTON_SIZE_TYPE.M}
            theme={BUTTON_THEME_TYPE.DEFAULT}
            width={BUTTON_WIDTH_TYPE.AUTO}
            onClick={() => deletePlayerMarker(marker.id)}
          >
            Удалить
          </MyButton>
        </MyModal>
      ))}
      <MyModal size={MODAL_SIZE_TYPE.FULL_SCREEN} id={MODAL_CONTENT_TYPE.MARKER_FORM}>
        <CharacterMarkerForm/>
      </MyModal>
    </div>
  )
}

export default GameMap