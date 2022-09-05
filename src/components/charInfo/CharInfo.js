import { useState, useEffect } from 'react';

import useGenshinService from '../../services/GenshinService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {getCharacter, loading, error} = useGenshinService();

    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        updateChar();
    }, [props.selectedChar])


    const updateChar = () => {

        const {selectedChar} = props;

        if (!selectedChar) {
            return;
        }

        getCharacter(selectedChar)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char ? null : <Skeleton/>
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {icon, name, element, weapon, birthday, description, nation} = char[0];

    function classForVisonText(filter) {

        switch (filter) {
            case 'Pyro':
                return 'single-char__info-vision--pyro'
            case 'Hydro':
                return 'single-char__info-vision--hydro'
            case 'Electro':
                return 'single-char__info-vision--electro'
            case 'Cryo':
                return 'single-char__info-vision--cryo'
            case 'Anemo':
                return 'single-char__info-vision--anemo'
            case 'Geo':
                return 'single-char__info-vision--geo'
            default:
                return 'single-char__info-vision--black';
        }
    }

    const clazz = classForVisonText(element);

    return (
        <>
            <div className="char__wrapper">
                <img className='char__info-icon' src={icon} alt={name}/>
                <div className='char__info-wrapper'>
                    <div className="char__info-name">{name}</div>
                    <div className={`char__info-vision ${clazz}`}>
                        <p>Element: <span>{element}</span></p>
                    </div>
                    <div className="char__info-nation">
                        <p>Nation: {nation}</p>
                    </div>
                    <div className="char__info-weapon">
                        <p>Weapon: {weapon}</p>
                    </div>
                    <div className="char__info-birthday">
                        <p>Birthday: {birthday}</p>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <a href={`/characters/${name}`} className="button">More info</a>      
        </>
    )
}

export default CharInfo;