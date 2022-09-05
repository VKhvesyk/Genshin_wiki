import { useState, useEffect, useRef } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useGenshinService from '../../services/GenshinService';
import Spinner from '../spinner/Spinner';

import './charList.scss';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [count, setCount] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, loading, error} = useGenshinService();


    useEffect(() => {
        getAllCharacters()
            .then(onCharListLoaded)
    }, [])


    const onRequest = () => {

        let ended = false;

        if (charList.length < count) {
            ended = true;
        }

        setCharEnded(charEnded => ended)

        setCount(count => count + 6);
    }


    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);

        onRequest();
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function renderItems(arr, count) {

        let items =  arr.map((item, i) => {
            if (i < count) {
                return (
                    <CSSTransition 
                        key={item.id} 
                        timeout={500}
                        classNames="animation">
                            <li className="char__item"
                            key={item.id}
                            ref={el => itemRefs.current[i] = el}
                            onClick={() => {
                                props.onCharSelected(item.name);
                                focusOnItem(i);
                            }}>
                            <img src={item.compressedImage} alt={item.name}/>
                            <div className="char__card-descr">
                                <p>{item.name}</p>
                                <p>{item.element}</p>
                            </div>
                        </li>     
                    </CSSTransition>
                )
            };

        });

        return (
            <TransitionGroup component={null}>
                    {items}
            </TransitionGroup>
        )
    }

    const items = renderItems(charList, count);
    const spinner = loading ? <Spinner/> : null;


    return (
        <div className="char__list">
            <ul className="char__grid">
                {spinner}
                {items}
            </ul>
            <button 
                className="button"
                onClick={onRequest}
                style={{'display': charEnded ? 'none' : 'block'}}
                >
                load more
            </button>
        </div>
    )
}

export default CharList;