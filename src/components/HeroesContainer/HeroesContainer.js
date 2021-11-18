import { useParams } from 'react-router';
import { useContext } from 'react'
import { useState, useEffect } from 'react';
import Context from '../../context/HeroContext'
import AuthUser from '../../AuthUser/AuthUser'

import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import Notification from '../Notification/Notification'
import HeroesList from '../HeroesList/HeroesList';

import './HeroesContainer.css'

const HeroesContainer = () => {

    const { path } = useParams()
    const { heroes, team, good, bad, alignment, capt } = useContext(Context)
    const [currentTeam, setCurrentTeam] = useState([])


    useEffect(() => {
        if (!path) {
            setCurrentTeam(heroes)
        } else {
            if (path === 'my-team') {
                setCurrentTeam(team)
            }else if (path === 'good')
            setCurrentTeam(good)
            else setCurrentTeam(bad)
        }
        return (() => {
            setCurrentTeam([])
        })
    }, [currentTeam, team, good, bad, alignment, heroes, path, capt])

    
    return (
        <AuthUser>
            <header>
                <Navbar />
            </header>
            <main>
                <Notification />
                {!path ? <Search /> : null}

                {(!path) ? <h1>Searched Heroes</h1> : null}
                {(path === 'my-team') ? <h1>My Team</h1> : null}
                {(path === 'good') ? <h1>My Good Heroes</h1> : null}                
                {(path === 'bad') ? <h1>My Bad Heroes</h1>: null}

                {(currentTeam.length === 0) ? <h1>There's no heroes here</h1> :   <HeroesList heroes={currentTeam} />}                
                
            </main>
        </AuthUser>
    )
}

export default HeroesContainer



