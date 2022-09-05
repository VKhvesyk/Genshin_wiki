import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

<header className="app__header">
<h1 className="app__title">
    <Link to="/">
        <span>Marvel</span> information portal
    </Link>
</h1>
<nav className="app__menu">
    <ul>
        <li><NavLink 
            end 
            style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} 
            to="/">Characters</NavLink></li>
        /
        <li><NavLink 
            end 
            style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} 
            to="/comics">Comics</NavLink></li>
    </ul>
</nav>
</header>

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Genshin</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                            to="/characters"
                            style={({isActive}) => ({color: isActive ? '#3e9f85' : 'inherit'})} 
                            >Characters</NavLink></li>
                    /
                    <li><NavLink 
                            to="/weapons"
                            style={({isActive}) => ({color: isActive ? '#3e9f85' : 'inherit'})} 
                            >Weapons</NavLink></li>
                    /
                    <li><NavLink 
                            to="/enemies"
                            style={({isActive}) => ({color: isActive ? '#3e9f85' : 'inherit'})} 
                            >Enemies</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;