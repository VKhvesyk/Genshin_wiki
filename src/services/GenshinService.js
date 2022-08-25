const useGenshinService = () => {

    const getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    const getAllCharacters = async () => {
        const res = await getResource('https://genshin-app-api.herokuapp.com/api/characters?infoDataSize=all');
        return res.payload.characters.map(_transformCharacters)
    }

    const getCharacter = async (name) => {
        const res = await getResource(`https://genshin-app-api.herokuapp.com/api/characters/info/${name}?infoDataSize=minimal`);
        // return Object.entries(res.payload.character).map(_transformCharacter)
        // const abjArr = Object.entries(res);

        // abjArr.forEach(([key, value]) => {
        //     console.log(key, value);
        // });

        let orange = Object.entries(res.payload);

        // return orange
        return orange[0].map(_transformCharacter)
    }

    const getMaterialsCurrentDay = async (day) => {
        const res = await getResource(`https://genshin-app-api.herokuapp.com/api/generalinfo/materials/${day}`);
        return res.payload.talentBooks.map(_transformMaterialCurrentDay)
    }


    const _transformCharacters = (char) => {
        return {
            id: char._id,
            name: char.name,
            title: char.title,
            description: char.description ? `${char.description.slice(0, 210)}...` : "Sorry, but now we haven't information about this character.",
            element: char.element,
            weaponType: char.weaponType,
            birthday: char.birthday,
            icon: char.iconURL,
            cardImage: char.cardImageURL,
            compressedImage: char.compressedImageURL,
            rarity: char.rarity
        }
    }  

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : "Sorry, but now we haven't information about this character.",
            element: char.element,
            weapon: char.weaponType,
            birthday: char.birthday,
            nation: char.nation,
            icon: char.iconURL
        }
    }  

    const _transformMaterialCurrentDay = item => {
        return {
            // charIcon: item.characters.iconURL,
            // charName: item.characters.name,
            // characters: item.characters,
            talentBookIcon: item.iconUrl,
            talentBookName: item.name,
            farmingDays: item.farmingDays
        }
    }
    
    return {getAllCharacters, getMaterialsCurrentDay, getCharacter}
}

export default useGenshinService;