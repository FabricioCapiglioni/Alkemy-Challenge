import ProgressBar from 'react-bootstrap/ProgressBar'
import './PowerStats.css'

const PowerStats = () => {

    const powerstats = {
        intelligence: "100",
        strength: "85",
        speed: "58",
        combat: "64",
        durability: "85",
        power: "100",
    }

    const newPowerstats = Object.entries(powerstats).map(function (element) {
        return {
            name: element[0],
            stat: element[1]
        };
    })

    function capt(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
        }

    return (
    <>
        
        {newPowerstats.map((stat)=> (
            <ProgressBar variant='success' now={stat.stat} label={`${capt(stat.name)}: ${stat.stat}`} />
        ))}
    </>
    )
}

export default PowerStats
