import Context from '../../context/HeroContext'
import {useContext} from 'react'
import Search from "../Search/Search"


const Home = () => {

    const {heroes} = useContext(Context)

    console.log(heroes)
    return (
        <div>
            <Search />
        </div>
    )
}

export default Home
