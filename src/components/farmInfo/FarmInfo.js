import { useState, useEffect } from 'react';

import useGenshinService from '../../services/GenshinService';

import { Carousel } from 'react-bootstrap';

import './farmInfo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const Farminfo = () => {

    const [talentList, setTalentList] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const {getMaterialsCurrentDay, getCurrentEvents} = useGenshinService();

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = () => {
        getMaterialsCurrentDay(currentDay())
            .then(onCharListLoaded);

        getCurrentEvents()
            .then(onEventsListLoaded);
    }


    const onCharListLoaded = (newCharList) => {

        setTalentList(talentList => [...talentList, ...newCharList]);

    }

    const onEventsListLoaded = (newEventsList) => {

        setEventsList(eventsList => [...eventsList, newEventsList]);

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


    function renderTalentMaterials(arr) {

        const items = arr ? arr.map((item, i) => {
            
            return (
                <>
                <div className="farm-info__talent-book">
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
            
                <div className="farm-info__wrapper">
                    {items}
                </div>
        )
    }


    function renderEvents(arr) {

        const items = arr ? arr.map((item, i) => {
            const {imageUrl, name, durationStart, durationEnd} = item[1];
            
            return (
                <Carousel.Item>
                    <div className="farm-info__event" style={{'background-image': `url(${imageUrl})`, 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat'}}>
                        <p className="farm-info__title">
                            {name}
                        </p>
                        <p className="farm-info__subtitle">
                            Duration: {durationStart} - {durationEnd}
                        </p>
                    </div>
                </Carousel.Item>
            )
        }) : null


        return (
            <div className="farm-info__events">
                <Carousel interval="50000" indicators='false'>
                    {items}
                </Carousel>
            </div>
        )
    }


    const talentMaterials = renderTalentMaterials(talentList);
    const events = renderEvents(eventsList[0]);

    return (
        <div className="farm-info">
            <div className="farm-info__materials">
                <p className="farm-info__title">Next talent books available for the farming today</p>
                {talentMaterials}
            </div>
            {events}
        </div>
    )
}

export default Farminfo;