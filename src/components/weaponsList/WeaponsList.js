import { useState, useEffect } from 'react';

import useGenshinService from '../../services/GenshinService';

import './weaponsList.scss';

const WeaponsList = () => {

    const [weaponsList, setWeaponsList] = useState([]);
    const [weaponsListEnded, setWeaponsListEnded] = useState(false);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState(null);

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

        console.log(filterList(weaponsList, 'bow'))
        
    }

    const onWeaponsListLoaded = (newWeaponsList) => {
        setWeaponsList([...weaponsList, ...newWeaponsList]);

        onRequest();
    }


    function filterList(arr, filter) {

        switch (filter) {
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
                return arr;
        }
    }

    function renderWeaponsList(arr, filter) {
        let items = null;

            items = filterList(arr, filter).map((item, i) => {
                return (
                    <div className="weapons-list__card">
                        <div className="weapons-list__weapon">
                            <img src={item.icon} alt={item.name} />
                            <a href={item.id}>{item.name}</a>
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

    const items = renderWeaponsList(weaponsList, 'sword');
    // console.log(filterList(weaponsList, 'bow'))







    return (
        <div className="weapons-list">
            <div className="weapons-list__filter">
                <button className="weapons-list__filter-btn weapons-list__filter-btn--active">Sword</button>
                <button className="weapons-list__filter-btn">Bow</button>
                <button className="weapons-list__filter-btn">Claymore</button>
                <button className="weapons-list__filter-btn">Polearm</button>
                <button className="weapons-list__filter-btn">Catalyst</button>
            </div>
            {items}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default WeaponsList;