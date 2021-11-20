import { useParams } from 'react-router';
import { useContext } from 'react'
import { useState, useEffect } from 'react';
import Context from '../../context/HeroContext'
import AuthUser from '../../AuthUser/AuthUser'

import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import Notification from '../Notification/Notification'
import HeroesList from '../HeroesList/HeroesList';
import PowerStats from '../PowerStats/PowerStats';

import './HeroesContainer.css'
import Col from 'react-bootstrap/Col'

const HeroesContainer = () => {

    const { path } = useParams()
    const { heroes, team, good, bad, alignment, capt, teamPowerstats } = useContext(Context)
    const [currentTeam, setCurrentTeam] = useState([])

    useEffect(() => {
        if (!path) {
            setCurrentTeam(heroes)
        } else {
            if (path === 'my-team') {
                setCurrentTeam(team)
            } else if (path === 'good')
                setCurrentTeam(good)
            else setCurrentTeam(bad)
        }
        return (() => {
            setCurrentTeam([])
        })
    }, [currentTeam, team, good, bad, alignment, heroes, path, capt, teamPowerstats])

    return (
        <AuthUser>
            <header>
                <Navbar />
            </header>
            <main>
                <Notification />
                {!path ? <Search /> : null}

                {!path ? <h1>Searched Heroes</h1> : null}
                {path === 'my-team' ? <h1>Team</h1> : null}
                {path === 'good' ? <h1>Team: Goods</h1> : null}
                {path === 'bad' ? <h1>Team: Bads</h1> : null}
                {path === 'my-team' ? (
                    (team.length > 0) ? (
                        <Col md={{ span: 6, offset: 3 }}>
                            <h2 className="text-center">Team Stats</h2>
                            <div className="row text-center">
                                <h3 className="col-sm-6"><b>Average team weight:</b> {Math.round(teamPowerstats.averageWeight / team.length)} kg</h3>
                                <h3 className="col-sm-6"><b>Average team height:</b> {Math.round(teamPowerstats.averageHeight / team.length)} cm</h3>
                            </div>
                            <PowerStats powerstats={teamPowerstats} max={600} />
                        </Col>
                    ) : null
                ) : null}

                {currentTeam.length === 0 ? <h1>There's no heroes here</h1> : <HeroesList heroes={currentTeam} />}

            </main>
        </AuthUser>
    )
}

export default HeroesContainer



