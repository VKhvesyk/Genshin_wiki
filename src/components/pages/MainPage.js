import { useState } from "react";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (name) => {
        setSelectedChar(name);
    }

    return (
        <>
            <CharList onCharSelected={onCharSelected}/>
            <CharInfo selectedChar={selectedChar}/>
        </>
    )
}

export default MainPage;