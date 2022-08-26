import { useState, useEffect } from 'react';

import useGenshinService from '../../services/GenshinService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        getCharacter(selectedChar)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);

        setLoading(false);
    }

    const skeleton = char ? null : <Skeleton/>
    const spinner = loading ? <Spinner/> : null
    const content = char ? <View char={char}/> : null;


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

    console.log(`Char in view: ${char[0].name}`)

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