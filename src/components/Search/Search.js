import {/* useContext, */ useState} from 'react'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
//import Context from '../../context/HeroContext'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios';

const Search = () => {

    //const {search} = useContext(Context)
    const [heroes, setHeroes] = useState([])
    const [term, setTerm] = useState([])


    const searchSuperHeros = async () => {
    const response = await axios.get(`http://localhost:5000/${term}`);
    if (response && response.data && response.data.results) {
      const newHeros = [...heroes, ...response.data.results].reverse();
      setHeroes(newHeros);
    }
  };
    
    
    console.log(heroes)
   
    return (
        <Formik 
                initialValues={{
                    name: '',
                }}
                validate={(values) => {
                    let err = {}

                    if (!values.name) {
                        err.name = "Please, enter a Superhero name"                   
                    }
                    return err 
                }}
                onSubmit={(values) => {
                    setTerm(values.name)
                    searchSuperHeros()
                   
                }}   
        >
            
            {({errors}) => (
                <Form>
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <Col md={{ span: 6, offset: 3 }}>                   
                            <Field 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Search a super hero"                         
                            />
                            <ErrorMessage name="name" component={() => (<div className="error">{errors.name}</div>)} />
                        </Col>                 
                        <Button type="submit" variant="primary">Submit</Button>
                    </Stack>
                </Form>
            )}
                
            </Formik>
    )
}

export default Search

