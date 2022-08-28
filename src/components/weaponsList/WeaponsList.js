import { useState, useEffect } from 'react';

import useGenshinService from '../../services/GenshinService';

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

    const {getAllWeapons} = useGenshinService();

    useEffect(() => {
        getAllWeapons()
            .then(onWeaponsListLoaded)
    }, [])
    
    const onRequest = () => {
        let ended = false;

        if (weaponsList.length < count) {
            ended = true;
        }

        setWeaponsListEnded(true);

        setCount(count => count + 6);
    }

    const onWeaponsListLoaded = (newWeaponsList) => {
        setWeaponsList([...weaponsList, ...newWeaponsList]);

        onRequest();
    }

    const selectFilter = (event) => {
        event.preventDefault();
        const data = event.target.attributes.data.nodeValue;
        
        setFilter(data);
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

    function renderWeaponsList(arr, filter) {
        let items = null;

            items = filterList(arr, filter).map((item, i) => {
                return (
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
                )
            })


        return (
            <div className="weapons-list__wrapper">
                    {items}
            </div>
        )
    }

    const items = renderWeaponsList(weaponsList, filter);

    const buttons = buttonsData.map(({data, label}) => {
        const active = filter === data;
        const clazz = active ? 'weapons-list__filter-btn weapons-list__filter-btn--active' : 'weapons-list__filter-btn';
        return (
            <>
            <button data={data} className={clazz}>{label}</button>
            </>
        )
    })

    return (
        <div className="char__content char__content--weapons">
            <p className="weapons-list__title">Catalog of weapons</p>
            <div className="weapons-list__filter" onClick={selectFilter}>
                {buttons}
            </div>
            <div className="weapons-list">
                {items}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        </div>
    )
}

export default WeaponsList;