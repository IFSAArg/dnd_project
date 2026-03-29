import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCharacter } from '../store/selectors/charactersSelectors'
import {StateSchema} from "../store/config/stateSchema";

const CharacterPage = () => {
  const {id} = useParams()
  const character = useSelector((state: StateSchema) => getCharacter(state, id))
  
  if(!character) {
    return <div>character is not found...</div>
  }

  const {name, info, stats, skills, personality, inventory, history} = character

  return (
    <div className="character__page">
      <div className={`character__img character__imgId__${character.id}`}/>
      <div className="character__body">
        <h1 className='character__name'>{name}</h1>
        <div className="character__about">
          {info.map(param => <div key={param.name} className='character__about__item'>{param.name}: {param.count}</div>)}
        </div>
        <div className="character__main">
          <div className="character__stats">
            {stats.map(stat => (
              <div key={stat.name} className="character__stats__item">
                <div className="character__stats__item__name">{stat.name}</div>
                <div className="character__stats__item__count">{stat.count}</div>
              </div>
            ))}
          </div>
          <div className="character__items">
            <div className="character__personality">
              <div className="character__skills">
                <h1>Способности</h1>
                {skills.map((skill, index) => (
                  <div key={skill.title} className="character__skills__item">{index+1}. {skill.title}</div>
                ))}
              </div>
              <div className="character__description">
                {personality.map(item => (
                  <div key={item.title} className="character__description__item">
                    <h1>{item.title}</h1>
                    <div>{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="character__inventory">
              {inventory.map(item => (
                <div key={item} className="character__inventory__item">{item}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="character__history">{history}</div>
      </div>
    </div>
  )
}

export default CharacterPage