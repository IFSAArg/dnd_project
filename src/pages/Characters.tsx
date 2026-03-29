import CharacterCard from '../components/CharacterCard'
import {useAppDispatch} from "../helpers/hooks/useAppDispatch/useAppDispatch";
import { getArrayFromLocalStorage, LOCAL_STORAGE_KEYS } from '../helpers/lib/localStorage'
import { useGetCharacters } from '../store/services/characterApi'
import { setCharactersData } from '../store/slices/charactersSlice'
import MyLoader, { MY_LOADER_TYPE } from '../components/UI/MyLoader/MyLoader'
import { useEffect } from 'react'

const Characters = () => {
  const dispatch = useAppDispatch()
  const isLocalCharsData = getArrayFromLocalStorage(LOCAL_STORAGE_KEYS.CHARS)
  const {data: characters, isLoading: isCharactersLoading} = useGetCharacters(null)

  useEffect(() => {
    if (!isLocalCharsData && characters) {
      dispatch(setCharactersData(characters))
    } else {
      dispatch(setCharactersData(isLocalCharsData))
    }
  }, [dispatch, characters])

  return ( 
    <div className='main__characters'>
      {isCharactersLoading 
        ? <MyLoader type={MY_LOADER_TYPE.CHARACTERS}/>
        : characters?.map(character => (
            <CharacterCard key={character.id} character={character}/>
          ))
      } 
    </div>
  )
}

export default Characters