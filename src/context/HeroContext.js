import React, { useState } from 'react'
import axios from "axios";

const Context = React.createContext()

export const HeroContext = ({ children }) => {

    const [heroes, setHeroes] = useState([])
    const [team, setTeam] = useState([])
    const [good, setGood] = useState([])
    const [bad, setBad] = useState([])
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [teamPowerstats, setTeamPowerstats] = useState({
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0,
        averageWeight: 0,
        averageHeight: 0,
    })

    const token = localStorage.getItem('token');

    //Función que obtiene el token de usuario
    const getToken = async (email, password) => {
        try {
            const res = await axios.post(`http://challenge-react.alkemy.org/`, {
                email,
                password
            })
            let data = res.data.token
            return data
        }
        catch (error) {
            let data = error.response.data
            return data
        }
    }

    //Función asíncrona para buscar heroes mediante el nombre
    //a la respuesta se le pasa la función 'discardHeroes' y 
    //la misma se guarda en la variable newHeroes para ser almacenada
    //en el estado 'heroes'.
    const search = async (name) => {
        axios
            .get(`http://localhost:5000/${name}`)
            .then((response) => {
                console.log(response.data.results);
                if (response.data.response === 'success') {
                    let newHeroes = discardHeroes([...response.data.results])
                    setHeroes(newHeroes)
                } else {
                    setNotification('error', response.data.error, 4000)()
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    //Función para descartar aquellos personajes cuyos powerstats son null, y 
    //si su alignment = ('-') || 'neutrales'. 
    const discardHeroes = (array) => {
        let newArray = array.filter((item) =>
            !Object.values(item.powerstats).includes('null') &&
            !item.biography.alignment.includes('-') &&
            !item.biography.alignment.includes('neutral')
        )
        return newArray
    }

    //Función para evitar que el usuario realice una búsqueda duplicada
    //con una palabra ya buscada.
    const alreadySerched = (word, array) => {
        return array.includes(word)
    }

    //Función para chequear si el heroe se encuentra en el array.
    //Devuelve True o False
    const isIn = (heroId, array) => {
        return array.some((hero) => hero.id === heroId)
    };

    //Función para verificar que la alineación del heroe que se intenta agregar, 
    //no supera los 3 heroes por alineación.
    //Devuelve True o False
    const isAlignmentFull = (heroAlignment) => {
        if (filterHeroesByalignment(heroAlignment, team).length < 3) {
            return false
        } else return true
    }

    //Función que filtra los heroes del array que recibe, por alineación
    const filterHeroesByalignment = (alignment, array) => {

        const newArr = array.filter((hero) => hero.biography.alignment === alignment)
        return (newArr)

    }

    //Función para agregar heroe al team. 
    //Agrega el heroe al estado good o bad, según sea su alineación.
    //Ejecuta la función setTeamStats
    const addHero = (object) => {

        const newTeam = [...team, object]
        setTeam(newTeam)
        setTeamstats(object, '+')
        if (object.biography.alignment === 'good') {
            setGood([...good, object])
        } else setBad([...bad, object])
    }

    //Función para eliminar heroe del team 
    const deleteHeroFromTeam = (object) => {
        const updateTeam = team.filter((hero) => (hero.id !== object.id))
        setTeam(updateTeam)
        setTeamstats(object, '-')
        if (team === 0) {
            setTeamPowerstats(0)
        }
        if (object.biography.alignment === 'good') {
            const newArr = good.filter((hero) => (hero.id !== object.id))
            setGood(newArr)
        } else {
            const newArr = bad.filter((hero) => (hero.id !== object.id))
            setBad(newArr)
        }
    }

    //Función para setear el estado teamPowerstats, el cual acumula cada powerstats
    //a medida que cada heroe es agregado al team, tambien acumula el peso y la alturadel team
    //Al momento de renderizar estos últimos 2, se calcula el promedio dividiendo su value por
    //team.length
    const setTeamstats = (object, operator) => {

        if (operator === '+') {
            setTeamPowerstats({
                intelligence:  parseInt(object.powerstats.intelligence) + teamPowerstats.intelligence ,
                strength:  parseInt(object.powerstats.strength) + teamPowerstats.strength,
                speed: parseInt(object.powerstats.speed) + teamPowerstats.speed,
                durability: parseInt(object.powerstats.durability) + teamPowerstats.durability,
                power: parseInt(object.powerstats.power) + teamPowerstats.power,
                combat: parseInt(object.powerstats.combat) + teamPowerstats.combat,
                averageWeight: parseInt((object.appearance.weight[1]).replace(' kg')) + teamPowerstats.averageWeight,
                averageHeight: parseInt((object.appearance.height[1]).replace(' cm')) + teamPowerstats.averageHeight,
            })
        } else {
            setTeamPowerstats({
                intelligence: teamPowerstats.intelligence - parseInt(object.powerstats.intelligence),
                strength: (teamPowerstats.strength - parseInt(object.powerstats.strength)),
                speed: (teamPowerstats.speed - parseInt(object.powerstats.speed)),
                durability: (teamPowerstats.durability - parseInt(object.powerstats.durability)),
                power: (teamPowerstats.power - parseInt(object.powerstats.power)),
                combat: (teamPowerstats.combat - parseInt(object.powerstats.combat)),
                averageWeight: teamPowerstats.averageWeight - parseInt((object.appearance.weight[1]).replace(' kg')),
                averageHeight: teamPowerstats.averageHeight - parseInt((object.appearance.height[1]).replace(' cm'))
            })
        }        
    }

    //Función para hacer mayúscula la primera letra de una palabra
    function capt(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const setNotification = (type, message, sec) => {
        window.scrollTo(0, 0);
        setType(type)
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, sec)
    }


    
   

    return (
        <Context.Provider
            value={{
                heroes,
                setHeroes,
                team,
                setTeam,
                good,
                bad,
                teamPowerstats,
                token,
                getToken,
                search,
                alreadySerched,
                isIn,
                isAlignmentFull,
                filterHeroesByalignment,
                addHero,
                deleteHeroFromTeam,
                setTeamstats,
                capt,
                notification: { message, type },
                setNotification,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context