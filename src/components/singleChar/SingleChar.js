import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './singleChar.scss';

import useGenshinService from '../../services/GenshinService';
import Spinner from '../spinner/Spinner';


const SingleChar = () => {
    const {charId} = useParams();
    const [char, setChar] = useState();

    const {loading, getCharacter, clearError} = useGenshinService();

    useEffect(() => {
        updateChar()
    }, [charId])


    const updateChar = () => {

        clearError();
        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || !char) ? <View char={char}/> : null;

    return (
        <>
            {spinner}
            {content}
        </>
    )
}


const View = ({char}) => {

    const {
        name,
        fullDescription, 
        element, 
        weapon, 
        birthday, 
        nation, 
        icon, 
        talentBook} = char[0];


    const renderMaterials = (material, className) => {
        let items = null;

        items = material.map((item, i) => {
    
            return (
                <div className={className} key={item._id}>
                    <img src={item.iconUrl} alt={item.name}/>
                </div>
            )
        })
    
        return (
            <>
                {items}
            </>
        )
    }

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
        
    const renderedCommonAscensionMaterials = renderMaterials(char[0].commonAscensionMaterials, 'single-char__enemy-material');
    const renderedAscensionMaterials = renderMaterials(char[0].ascensionMaterials, 'single-char__gemstone-and-boss');
    const renderedTalentBooks = renderMaterials(char[0].talentBook, 'single-char__talent-book');
    const renderedTalentMaterials = renderMaterials(char[0].talentMaterial, 'single-char__talent-material');

    const clazz = classForVisonText(element);

    return (
        <div className="char__info char__info--single-char">
            <div className="single-char__char">
                <img className='single-char__info-icon' src={icon} alt={name}/>
                <div className='single-char__info-wrapper'>
                    <div className="single-char__info-name">{name}</div>
                    <div className={`single-char__info-vision ${clazz}`}>
                        <p>Vision: <span>{element}</span></p>
                    </div>
                    <div className="single-char__info-nation">
                        <p>Nation: <span>{nation}</span></p>
                    </div>
                    <div className="single-char__info-weapon">
                        <p>Weapon: <span>{weapon}</span></p>
                    </div>
                    <div className="single-char__info-birthday">
                        <p>Birthday: <span>{birthday}</span></p>
                    </div>
                </div>
            </div>
            <div className="single-char__descr">
                {fullDescription}
            </div>
            <div className="single-char__wrapper">
                <p className="single-char__title">Common ascension material for {name}:</p>
                <div className="single-char__common-ascension-materials">
                    {renderedCommonAscensionMaterials}
                </div>

                <p className="single-char__title">Ascension material for {name}:</p>
                <div className="single-char__ascension-materials">
                    {renderedAscensionMaterials}
                </div>

                <p className="single-char__title">Talent books for {name}:</p>
                <div className="single-char__talant-books">
                    {renderedTalentBooks}
                </div>
                <p className="single-char__descr">
                    In the following days, you will be able to farm talent books: <span>{`${talentBook[0].farmingDays[0]}, 
                    ${talentBook[0].farmingDays[1]}, ${talentBook[0].farmingDays[2]}.`}</span>
                </p>

                <p className="single-char__title">Talent material for {name}:</p>
                <div className="single-char__talent-materials">
                    {renderedTalentMaterials}
                </div>
            </div>

            <Link to="/characters" className="button">Back to all</Link>
        </div>
    )
}

export default SingleChar;