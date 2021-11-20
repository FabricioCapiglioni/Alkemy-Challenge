import { useContext } from 'react'
import Context from '../../context/HeroContext'
import ProgressBar from 'react-bootstrap/ProgressBar'
import './PowerStats.css'

const PowerStats = ({powerstats, max}) => {

    const { capt } = useContext(Context)
    
    //Transformo el objeto de powerstats en un array de objetos para poder mapearlo.
    const newPowerstats = Object.entries(powerstats).map(function (element) {
        return {
            name: element[0],
            stat: element[1],
        };
    })    

    if (max === 600) {
        newPowerstats.sort((a,b) => { return b.stat - a.stat })
    }    

    return (

        <>{
            newPowerstats.map((stat, index)=> ( (stat.name !== 'averageHeight' && stat.name !== 'averageWeight') &&
            <div key={index}>
                <label>{`${capt(stat.name)}: ${stat.stat}/${max}`}</label>
                <ProgressBar variant='danger' max={max} now={stat.stat} />
            </div>))
            }        
        </>
    )
}

export default PowerStats
