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

    const getAllWeapons = async () => {
        const res = await getResource('https://genshin-app-api.herokuapp.com/api/weapons?infoDataSize=minimal');
        return res.payload.weapons.map(_transformWeapons)
    }

    const getAllEnemies = async () => {
        const res = await getResource('https://genshin-app-api.herokuapp.com/api/enemies');
        return res.payload.enemies.map(_transformEnemies)
    }

    const getCharacter = async (name) => {
        const res = await getResource(`https://genshin-app-api.herokuapp.com/api/characters/info/${name}?infoDataSize=minimal`);
        return Object.entries(res.payload).map(_transformCharacter)
    }

    const getMaterialsCurrentDay = async (day) => {
        const res = await getResource(`https://genshin-app-api.herokuapp.com/api/generalinfo/materials/${day}`);
        return res.payload.talentBooks.map(_transformMaterialCurrentDay)
    }

    const getCurrentEvents = async () => {
        const res = await getResource(`https://genshin-app-api.herokuapp.com/api/events`);
        // return res
        return Object.entries(res.payload.events)
        // return res.payload.talentBooks.map(_transformCurrentEvents)
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

    const _transformWeapons = (weapon) => {
        return {
            id: weapon._id,
            name: weapon.name,
            baseAtk: weapon.baseAtk,
            rarity: weapon.rarity,
            weaponType: weapon.weaponType,
            icon: weapon.iconUrl,
            isReleased: weapon.isReleased
        }
    } 

    const _transformEnemies = (enemy) => {
        return {
            id: enemy._id,
            name: enemy.name,
            family: enemy.family,
            description: enemy.description ? `${enemy.description.slice(0, 210)}...` : "Sorry, but now we haven't information about this character.",
            icon: enemy.iconUrl
        }
    } 

    const _transformCharacter = (char) => {
        return {
            name: char[1].name,
            description: char[1].description ? `${char[1].description.slice(0, 210)}...` : "Sorry, but now we haven't information about this character.",
            fullDescription: char[1].description,
            element: char[1].element,
            weapon: char[1].weaponType,
            birthday: char[1].birthday,
            nation: char[1].nation,
            icon: char[1].iconURL
        }
    }  

    const _transformMaterialCurrentDay = item => {
        return {
            id: item._id,
            talentBookIcon: item.iconUrl,
            talentBookName: item.name,
            farmingDays: item.farmingDays
        }
    }
    
    return {getAllCharacters, getMaterialsCurrentDay, getCharacter, getCurrentEvents, getAllWeapons, getAllEnemies}
}

export default useGenshinService;