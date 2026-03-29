import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { StateSchema } from "../store/config/stateSchema";
import { getCharacterInfoCounts } from '../store/selectors/charactersSelectors'
import { ICharacter } from '../types/characterTypes';

interface CharacterCardProps {
  character: ICharacter;
}

const CharacterCard = (props: CharacterCardProps) => {
  const {character} = props
  const router = useNavigate()
  const characterInfoCount = useSelector((state: StateSchema) => getCharacterInfoCounts(state, character.id))

  if (!characterInfoCount) {
    return <div>Invalid character data</div>
  }

  const {charHealth, charClass} = characterInfoCount

  return (
    <div
      className={`card__character character__id-${character.id}`}
      key={character.id}
      onClick={() => router(`/characters/${character.id}`)}
    >
      {/* Лента с именем */}
      <div className="card__character__ribbon">
        <span className="card__character__name">{character.name}</span>
      </div>

      {/* Контент карточки */}
      {/*<div className="card__character__content">*/}
      {/*  <div>Класс: {charClass}</div>*/}
      {/*  <div>Здоровье: {charHealth}</div>*/}
      {/*</div>*/}
    </div>
  )
}

export default memo(CharacterCard)