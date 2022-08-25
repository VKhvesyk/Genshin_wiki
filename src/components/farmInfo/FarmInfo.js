import { useState, useEffect } from 'react';

import useGenshinService from '../../services/GenshinService';

import './farmInfo.scss';

const Farminfo = () => {

    const [talentList, setTalentList] = useState([]);
    const {getMaterialsCurrentDay} = useGenshinService();

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = () => {
        getMaterialsCurrentDay(currentDay())
            .then(onCharListLoaded);
    }


    const onCharListLoaded = (newCharList) => {

        setTalentList(talentList => [...talentList, ...newCharList]);

    }

    function currentDay() {
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ];
          const date = new Date();
          const day = date.getDay();

          return days[day]
    }


    function renderItems(arr) {

        const items = arr ? arr.map((item, i) => {
            
            return (
                <>
                <div className="farm-info__talent-books">
                        <img 
                            src={item.talentBookIcon} 
                            alt={item.talentBookName} 
                            className="farm-info__talent-image"/>
                        <p className="farm-info__title">{`${item.farmingDays[0]}, ${item.farmingDays[1]}, ${item.farmingDays[2]}`}</p>
                    </div>
                </>
            )
        }) : null


        return (
            <div className="farm-info__info">
            
                <div className="farm-info__wrapper">
                    {items}
                </div>
            </div>
        )
    }

    const items = renderItems(talentList);

    return (
        <div className="farm-info">
            <div className="farm-info__materials">
                <p className="farm-info__title">Next talent books available for the farming today</p>
                {items}
            </div>
            <div className="farm-info__static" style={{'background-image': 'url(https://uploadstatic-sea.mihoyo.com/contentweb/20210512/2021051222525282025.png)', 'backgroundSize': 'contain'}}>
                <p className="farm-info__title">
                    Windtrace, the classic game that hands down Mondstadt's...
                </p>
                <p className="farm-info__subtitle">
                    Duration: 2021/05/24 - 2021/05/24
                </p>
            </div>
        </div>
    )
}

export default Farminfo;