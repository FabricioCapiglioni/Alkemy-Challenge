import React, { useState } from 'react'
import axios from "axios";

const Context = React.createContext()

export const HeroContext = ({ children }) => {

    const [heroes, setHeroes] = useState([])
    const [team, setTeam] = useState([])
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    const token = localStorage.getItem('token');


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

    const search = async (name) => {
        axios
            .get(`http://localhost:5000/${name}`)
            .then((response) => {
                console.log(response.data.results)
                const newHeroes = [...response.data.results, ...heroes]
                setHeroes(newHeroes)
            }).catch((error) => {
                alert(error)
            })
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
                token,
                getToken,
                search,
                heroes,
                setHeroes,
                team,
                setTeam,
                notification: { message, type },
                setNotification,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context