import { useContext } from 'react'
import Context from '../../context/HeroContext'
import ProgressBar from 'react-bootstrap/ProgressBar'
import './PowerStats.css'

const PowerStats = ({powerstats}) => {

    const { capt } = useContext(Context)

    //Transformo el objeto de powerstats en un array para poder mapearlo.
    const newPowerstats = Object.entries(powerstats).map(function (element) {
        return {
            name: element[0],
            stat: element[1],
        };
    })

    return (

        <>{
            newPowerstats.map((stat, index)=> (
            <div key={index}>
                <label>{`${capt(stat.name)}: ${stat.stat}`}</label>
                <ProgressBar variant='danger' now={stat.stat}  />
            </div>))
            }        
        </>
    )
}

export default PowerStats
