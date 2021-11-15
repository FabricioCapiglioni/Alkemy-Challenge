import { useParams } from 'react-router';
import {useContext} from 'react'
import { useState, useEffect} from 'react';
import Context from '../../context/HeroContext'
import AuthUser from '../../AuthUser/AuthUser'

import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import HeroesList from '../HeroesList/HeroesList';

const HeroesContainer = () => {
  
    const {path} = useParams()
    const {heroes, team} = useContext(Context)
    const [currentTeam, setCurrentTeam] = useState([])

    useEffect(() => {
        if(!path) {
            setCurrentTeam(heroes)
        } else {
            if (path === 'my-team'){
                setCurrentTeam(team)
            } else if (path === 'good') {
                setCurrentTeam(team.good)
            } else if(path === 'bad') {
                setCurrentTeam(team.bad)
            }
            
        }
    }, [currentTeam, team, heroes, path])

    

    return (
        <AuthUser>
            <header>
                <Navbar />
            </header>
            <main>
                {!path ? <Search /> : null}
                <HeroesList heroes={currentTeam} />
            </main>
        </AuthUser>        
    )
}

export default HeroesContainer



