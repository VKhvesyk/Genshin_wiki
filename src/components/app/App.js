import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import FarmInfo from "../farmInfo/FarmInfo";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SingleChar from "../singleChar/SingleChar";
import WeaponsList from "../weaponsList/WeaponsList";
import MainPage from "../pages/MainPage";
import EnemiesList from "../enemiesList/EnemiesList";

const decoration = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/374e309d-713c-4ef2-b941-912bd95a5d52/debltvv-a1a27952-7269-4e79-826e-06cc3d704b26.png/v1/fill/w_1920,h_1077,strp/__venti__render__by_stardustinqs_debltvv-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA3NyIsInBhdGgiOiJcL2ZcLzM3NGUzMDlkLTcxM2MtNGVmMi1iOTQxLTkxMmJkOTVhNWQ1MlwvZGVibHR2di1hMWEyNzk1Mi03MjY5LTRlNzktODI2ZS0wNmNjM2Q3MDRiMjYucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rLX6Zc3mRD8e_UBP1JAqTTl7woj-G38Xbd3gNte2LUo';


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    {/* <Routes>
                    <FarmInfo/>
                        <div className="char__content">
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="" element={<SingleChar/>}/>
                        </div>
                        <div className="char__content char__content--weapons">
                            <Route path="/weapons" element={<WeaponsList/>}/>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="Venti"/>
                    </Routes> */}
                    <FarmInfo/>
                        <div className="char__content">
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                {/* <Route path="" element={<SingleChar/>}/> */}
                                <Route path="/weapons" element={<WeaponsList/>}/>
                                <Route path="/enemies" element={<EnemiesList/>}/>
                            </Routes>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="Venti"/>
                </main>
            </div>
        </Router>
    )
}

export default App;