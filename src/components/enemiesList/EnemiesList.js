import { useState, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useGenshinService from '../../services/GenshinService';

import './enemiesList.scss';

const EnemiesList = () => {

    const [enemiesList, setEnemiesList] = useState([]);
    const [enemiesListEnded, setEnemiesListEnded] = useState(false);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState('Slime');
    const buttonsData = [
        {family: 'All', label: 'All'},
        {family: 'Slime', label: 'Slime'},
        {family: 'Hilichurl', label: 'Hilichurl'},
        {family: 'Whopperflower', label: 'Whopperflower'},
        {family: 'Fatui', label: 'Fatui'},
        {family: 'Treasure Hoarder', label: 'Treasure Hoarder'},
        {family: 'Abyss Order', label: 'Abyss Order'},
        {family: 'Automatons', label: 'Automatons'},
        {family: 'Elemental Lifeforms', label: 'Elemental Lifeforms'},
        {family: 'Mystical Beasts', label: 'Mystical Beasts'},
        {family: 'Unique Enemies', label: 'Unique Enemies'},
    ];

    const {getAllEnemies} = useGenshinService();

    useEffect(() => {
        getAllEnemies()
            .then(onEnemiesListLoaded)
    }, [filter])
    
    const onRequest = () => {
        let ended = false;

        if (filterList(enemiesList, filter).length < count) {
            ended = true;
        }

        setEnemiesListEnded(ended);

        setCount(count => count + 8);
    }

    const onEnemiesListLoaded = (newEnemiesList) => {
        setEnemiesList([...newEnemiesList]);

        onRequest();
    }

    const selectFilter = (event) => {
        event.preventDefault();
        const data = event.target.attributes.data.nodeValue;
        
        setFilter(data);
        setCount(0);
    }


    function filterList(arr, filter) {

        switch (filter) {
            case 'all':
                return arr;
            case 'Slime':
                return arr.filter(item => item.family === 'Slime');
            case 'Hilichurl':
                return arr.filter(item => item.family === 'Hilichurl');
            case 'Whopperflower':
                return arr.filter(item => item.family === 'Whopperflower');
            case 'Fatui':
                return arr.filter(item => item.family === 'Fatui');
            case 'Treasure Hoarder':
                return arr.filter(item => item.family === 'Treasure Hoarder');
            case 'Abyss Order':
                return arr.filter(item => item.family === 'Abyss Order');
            case 'Automatons':
                return arr.filter(item => item.family === 'Automatons');
            case 'Elemental Lifeforms':
                return arr.filter(item => item.family === 'Elemental Lifeforms');
            case 'Mystical Beasts':
                return arr.filter(item => item.family === 'Mystical Beasts');
            case 'Unique Enemies':
                return arr.filter(item => item.family === 'Unique Enemies');
            default:
                return arr;
        }
    }

    const cantFound = () => {
        return 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/venti/sticker_8.png?66f41e176dd6770090efb3f1db8d2f26&d=200x200'
    }

    function renderEnemiesList(arr, filter) {
        let items = null;

            items = filterList(arr, filter).map((item, i) => {
                if (i < count) {
                    return (
                        <CSSTransition 
                            key={item.id} 
                            timeout={500}
                            classNames="animation">
                            <div className="enemies-list__card" key={item.id}>
                                <div className="enemies-list__enemy">
                                    {/* <div className="weapons-list__inner"> */}
                                        <img 
                                            src={item.icon} 
                                            alt={item.name}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src="https://media.istockphoto.com/vectors/cat-sits-in-a-box-with-a-404-sign-page-or-file-not-found-connection-vector-id1278808623?k=20&m=1278808623&s=612x612&w=0&h=tmzYgVK5yF-dtVvW81zz-Ebpeqd6EvD38KYGRjczuiw="
                                            }} 
                                            />
                                        <p>{item.name}</p>
                                    {/* </div> */}
                                </div>
                            </div>
                        </CSSTransition>
                    )
                }
            })

        return (
            <TransitionGroup component={null}>
                    {items}
            </TransitionGroup>
        )
    }

    const items = renderEnemiesList(enemiesList, filter);

    const buttons = buttonsData.map(({family, label}) => {
        const active = filter === family;
        const clazz = active ? 'enemies-list__filter-btn enemies-list__filter-btn--active' : 'enemies-list__filter-btn';
        return (
            <>
            <button data={family} className={clazz}>{label}</button>
            </>
        )
    })

    return (
        <div className="char__content char__content--enemies">
            <p className="enemies-list__title">Catalog of enemies</p>
            <div className="enemies-list__filter" onClick={selectFilter}>
                {buttons}
            </div>
            <div className="enemies-list">
                <div className="enemies-list__wrapper">
                    {items}
                </div>
                <button 
                    className="button button__main button__long"
                    onClick={onRequest}
                    style={{'display': enemiesListEnded ? 'none' : 'block'}}>
                    load more
                </button>
            </div>
        </div>
    )
}

export default EnemiesList;