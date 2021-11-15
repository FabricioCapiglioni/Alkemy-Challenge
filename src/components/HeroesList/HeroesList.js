import Hero from "../Hero/Hero"
import './HeroesList.css'

const HeroesList = ({heroes}) => {

    return (
        <div className="container-fluid row heroesList">
            {heroes.map((hero) => (
                <Hero key={hero.id} hero={hero} />
            ))}
        </div>
    )
}

export default HeroesList
