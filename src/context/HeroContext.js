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

    const token = localStorage.getItem('token');

    //Función recibe que obtiene el token de usuario
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
    const search = async (name) => {
        axios
            .get(`http://localhost:5000/${name}`)
            .then((response) => {
                let newHeroes = discardHeroes([...response.data.results, ...heroes])
                console.log(newHeroes)
                setHeroes(newHeroes)
            }).catch((error) => {
                setNotification('error', error, 2000)
            })
    }

    //Función para descartar aquellos personajes cuyos powerstats son null y 
    //no posean alignment o sean neutrales 
    const discardHeroes = (array) => {

        let newArray = array.filter((item) =>
            !Object.values(item.powerstats).includes('null') &&
            !item.biography.alignment.includes('-') &&
            !item.biography.alignment.includes('neutral')
        )

        /* newArray = newArray.filter((item) => {
            heroes.forEach

        }) */


        return newArray
    }
    
    const setNotification = (type, message, sec) => {
        window.scrollTo(0, 0);
        setType(type)
        setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, sec)
    }

    //Función para chequear si el heroe se encuentra en el team
    //Devuelve True o False
    const isIn = (heroId, array) => {
        return array.some((hero) => hero.id === heroId)
    };
    //Función para verificar que la alineación del heroe que se intenta agregar, 
    //no supere los 3 heroes por alineación.
    //Devuelve True o False
    const isAlignmentFull = (heroAlignment) => {
        if (filterHeroesByalignment(heroAlignment, team).length < 3) {
            return false
        } else return true
    }
    //Función que filtra los heroes del team por alineación
    const filterHeroesByalignment = (alignment, array) => {

        const newArr = array.filter((hero) => hero.biography.alignment === alignment)
        return(newArr)

    }
    

    const addHero = (object) => {

        const newTeam = [...team, object]
        setTeam(newTeam)
        if (object.biography.alignment === 'good') {
            setGood([...good, object])
        } else setBad([...bad, object])
    }
    
    //Función para eliminar heroe del team
    const deleteHeroFromTeam = (object) => {
        const updateTeam = team.filter((hero) => (hero.id !== object.id))
        setTeam(updateTeam)

        if(object.biography.alignment === 'good') {
           const newArr = good.filter((hero) => (hero.id !== object.id))
            setGood(newArr)
        } else {
          const  newArr = bad.filter((hero) => (hero.id !== object.id))
            setBad(newArr)
        }
    }



    //Función para hacer mayúscula la primera letra de una palabra
    function capt(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    //Función para sacar el promedio de powerstats del team (sin utilizar)
    /* const averagePowerstats = () => {
    
        let powerstats= []
        team.forEach(element => {
            powerstats = [...powerstats, element.powerstats]  
            return powerstats       
        });        
    
        let intelligence =  0
        let strength = 0
        let speed = 0
        let durability = 0
        let power = 0
        let combat = 0
    
        const newPowerstats = powerstats.map((stat) => {
            
            intelligence =  intelligence + parseInt(stat.intelligence)
            strength = strength + parseInt(stat.strength)
            speed = speed + parseInt(stat.speed)
            durability = durability + parseInt(stat.durability)
            power = power + parseInt(stat.power)
            combat = combat + parseInt(stat.combat)
    
            return [
                intelligence,
                strength,
                speed,
                durability,
                power,
                combat,
            ]
        })
    
        const statAverages = newPowerstats[newPowerstats.length - 1].map(function (element) {
            return element/newPowerstats.length
        })
    
        return statAverages
    } */

    return (
        <Context.Provider
            value={{
                token,
                getToken,
                search,
                heroes,
                setHeroes,
                team,
                setTeam,
                addHero,
                filterHeroesByalignment,
                isAlignmentFull,
                isIn,
                deleteHeroFromTeam,
                good,
                bad,
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