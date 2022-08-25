import './weaponsList.scss';

const WeaponsList = () => {
    return (
        <div className="weapons-list">
            <div className="weapons-list__filter">
                <button className="weapons-list__filter-btn weapons-list__filter-btn--active">Sword</button>
                <button className="weapons-list__filter-btn">Bow</button>
                <button className="weapons-list__filter-btn">Claymore</button>
                <button className="weapons-list__filter-btn">Polearm</button>
                <button className="weapons-list__filter-btn">Catalyst</button>
            </div>
            <div className="weapons-list__wrapper">
                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Fillet-Blade.png" alt="Fillet Blade" />
                        <p>Fillet Blade</p>
                    </a>
                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Summit-Shaper.png" alt="Summit Shaper" />
                        <p>Summit-Shaper</p>
                    </a>
                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Bloodtainted-Greatsword.png" alt="Bloodtainted Greatsword" />
                        <p>Bloodtainted Greatsword</p>
                    </a>
                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Recurve-Bow.png" alt="Recurve Bow" />
                        <p>Recurve Bow</p>
                    </a>

                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Fillet-Blade.png" alt="Fillet Blade" />
                        <p>Fillet Blade</p>
                    </a>
                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Summit-Shaper.png" alt="Summit Shaper" />
                        <p>Summit-Shaper</p>
                    </a>
                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Bloodtainted-Greatsword.png" alt="Bloodtainted Greatsword" />
                        <p>Bloodtainted Greatsword</p>
                    </a>
                    <a href="#" className="weapons-list__weapon">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620834712/genshin-app/weapons/Recurve-Bow.png" alt="Recurve Bow" />
                        <p>Recurve Bow</p>
                    </a>
            </div>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default WeaponsList;