import { useState, useEffect } from 'react';

import useGenshinService from '../../services/GenshinService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState([]);

    const {getCharacter} = useGenshinService();

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
    const content = char ? <View char={char}/> : null;


    return (
        <div className="char__info">
            {skeleton}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {icon, name, element, weapon, birthday, description, nation} = char;

    return (
        <>
            <div className="char__wrapper">
                <img className='char__info-icon' src={icon} alt={name}/>
                <div className='char__info-wrapper'>
                    <div className="char__info-name">{name}</div>
                    <div className="char__info-vision">
                        <p>Element: {element}</p>
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
            <a href="#" className="button">More info</a>      
        </>
    )
}

export default CharInfo;