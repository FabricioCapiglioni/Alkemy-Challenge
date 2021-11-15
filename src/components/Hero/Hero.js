import Card from 'react-bootstrap/Card'
import PowerStats from '../PowerStats/PowerStats'
import './Hero.css'


const Hero = ({ hero }) => {  

    return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Hero Name</Card.Title>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <PowerStats /> 
                </Card.Body>
            </Card>
        )
}

export default Hero
