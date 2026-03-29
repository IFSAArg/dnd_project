import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to={'about'}>Об игре</Link>
        <Link to={'characters'}>Персонажи</Link>
        <Link to={'map'}>Карта</Link>
        <Link to={'characters'}>Помощь</Link>
        <Link to={'characters'}>Авторы</Link>
    </div>
  )
}

export default Navbar