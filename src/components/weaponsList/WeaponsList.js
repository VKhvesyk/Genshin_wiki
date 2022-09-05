import { useState, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useGenshinService from '../../services/GenshinService';
import Spinner from '../spinner/Spinner';

import './weaponsList.scss';

const WeaponsList = () => {

    const [weaponsList, setWeaponsList] = useState([]);
    const [weaponsListEnded, setWeaponsListEnded] = useState(false);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState('sword');
    const buttonsData = [
        {data: 'all', label: 'All'},
        {data: 'sword', label: 'Sword'},
        {data: 'bow', label: 'Bow'},
        {data: 'claymore', label: 'Claymore'},
        {data: 'polearm', label: 'Polearm'},
        {data: 'catalyst', label: 'Catalyst'}
    ];

    const {getAllWeapons, loading} = useGenshinService();

    useEffect(() => {
        getAllWeapons()
            .then(onWeaponsListLoaded)
    }, [filter])
    
    const onRequest = () => {
        let ended = false;

        if (filterList(weaponsList, filter).length < count) {
            ended = true;
        }

        setWeaponsListEnded(ended);

        setCount(count => count + 8);
    }

    const onWeaponsListLoaded = (newWeaponsList) => {
        setWeaponsList([...newWeaponsList]);

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
                return arr.filter(item => item.isReleased === true);
            case 'sword':
                return arr.filter(item => item.weaponType === 'Sword' && item.isReleased === true);
            case 'catalyst':
                return arr.filter(item => item.weaponType === 'Catalyst' && item.isReleased === true);
            case 'claymore':
                return arr.filter(item => item.weaponType === 'Claymore' && item.isReleased === true);
            case 'bow':
                return arr.filter(item => item.weaponType === 'Bow' && item.isReleased === true);
            case 'polearm':
                return arr.filter(item => item.weaponType === 'Polearm' && item.isReleased === true);
            default:
                return arr.filter(item => item.isReleased === true);
        }
    }

    function renderWeaponsList(arr, filter, count) {
        let items = null;

            items = filterList(arr, filter).map((item, i) => {
                if (i < count) {
                    return (
                        <CSSTransition 
                            key={item.id} 
                            timeout={500}
                            classNames="animation">
                                <div className="weapons-list__card" key={item.id}>
                                    <div className="weapons-list__weapon">
                                        <img 
                                                src={item.icon} 
                                                alt={item.name}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src="https://media.istockphoto.com/vectors/cat-sits-in-a-box-with-a-404-sign-page-or-file-not-found-connection-vector-id1278808623?k=20&m=1278808623&s=612x612&w=0&h=tmzYgVK5yF-dtVvW81zz-Ebpeqd6EvD38KYGRjczuiw="
                                                }} 
                                                />
                                        <p>{item.name}</p>
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

    const items = renderWeaponsList(weaponsList, filter, count);

    const buttons = buttonsData.map(({data, label}) => {
        const active = filter === data;
        const clazz = active ? 'weapons-list__filter-btn weapons-list__filter-btn--active' : 'weapons-list__filter-btn';
        return (
            <>
            <button data={data} className={clazz}>{label}</button>
            </>
        )
    })

    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="char__content char__content--weapons">
            <p className="weapons-list__title">Catalog of weapons</p>
            <div className="weapons-list__filter" onClick={selectFilter}>
                {buttons}
            </div>
            <div className="weapons-list">
                <div className="weapons-list__wrapper">
                    {spinner}
                    {items}
                </div>
                <button 
                    className="button button__main button__long"
                    onClick={onRequest}
                    style={{'display': weaponsListEnded ? 'none' : 'block'}}>
                    load more
                </button>
            </div>
        </div>
    )
}

export default WeaponsList;