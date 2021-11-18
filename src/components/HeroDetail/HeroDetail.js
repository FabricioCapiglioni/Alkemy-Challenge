import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const HeroDetail = ({ hero, show, setShow }) => {

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{hero.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>  
                <Container>
                    <Row>                        
                        <Col xs={12} md={8}>
                            <Image src={`${hero.image.url}`} fluid  />
                        </Col>
                        <Col xs={12} md={4}>  
                            <h4>Biography</h4>
                                <p>Full name: {hero.biography['full-name']}</p>
                                <p>Aliases: {hero.biography.aliases.join(', ')} </p>
                            <h4>Appearance</h4>
                                <p>Weight: {hero.appearance.weight[0]} / {hero.appearance.weight[1]}</p>
                                <p>Height: {hero.appearance.height[0]} / {hero.appearance.height[1]}</p>
                                <p>Eyes: {hero.appearance['eye-color']}</p>
                                <p>Hair: {hero.appearance['hair-color']} </p>
                            <h4>Work</h4>
                                <p>{hero.work.occupation}</p>
                                <p>Base: {hero.work.base}</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default HeroDetail
