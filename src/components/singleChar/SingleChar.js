import './singleChar.scss';


const SingleChar = () => {
    return (
        <div className="char__info">
            <div className="char__wrapper">
                <img className='char__info-icon' src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1622044760/genshin-app/characters/tartaglia/icon.png" alt="abyss"/>
                <div className='char__info-wrapper'>
                    <div className="char__info-name">Tartaglia</div>
                    <div className="char__info-vision">
                        <p>Vision: Hydro</p>
                    </div>
                    <div className="char__info-nation">
                        <p>Nation: Snezhnaya</p>
                    </div>
                    <div className="char__info-weapon">
                        <p>Weapon: Bow</p>
                    </div>
                    <div className="char__info-birthday">
                        <p>Birthday: July 20</p>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                No. 11 of The Harbingers, also known as "Childe". His name is highly feared on the battlefield.
            </div>
            <div className="single-char__wrapper">
                <p className="single-char__title">Ascension material for Tartaglia:</p>
                <div className="single-char__ascension-material">
                    <div className="single-char__enemy-material">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620978147/genshin-app/enemy-drops/recruit_s-insignia.png" alt="enemy material" />
                    </div>
                    <div className="single-char__gemstone">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620829094/genshin-app/ascension-materials/hydro/varunada-lazurite-sliver.png" alt="gemstone" />
                    </div>
                    <div className="single-char__wold-boss-material">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620829094/genshin-app/world-boss-materials/cleansing-heart.png" alt="wold boss material" />
                    </div>
                </div>

                <p className="single-char__title">Talent books for Tartaglia:</p>
                <div className="single-char__talant-books">
                    <div className="single-char__talent-book">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620824052/genshin-app/talent-books/freedom/teachings-of-freedom.png" alt="Teachings of Freedom" />
                    </div>
                    <div className="single-char__talent-book">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620824052/genshin-app/talent-books/freedom/guide-to-freedom.png" alt="Guide to Freedom" />
                    </div>
                    <div className="single-char__talent-book">
                        <img src="https://res.cloudinary.com/dnoibyqq2/image/upload/v1620824052/genshin-app/talent-books/freedom/philosophies-of-freedom.png" alt="Philosophies of Freedom" />
                    </div>
                </div>
                <p className="single-char__descr">You can farm talent books in next days: "Sunday", "Monday", "Thursday"</p>
            </div>


        </div>
    )
}

export default SingleChar;