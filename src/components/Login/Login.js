import {useContext} from 'react'
import { useHistory } from 'react-router';
import Context from '../../context/HeroContext'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Notification from '../Notification/Notification'

import './Login.css'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'


const Login = () => {

    const history = useHistory();
    const {getToken, setNotification} = useContext(Context)
    const email= 'challenge@alkemy.org'
    const password= 'react'


    const login = (values) => {

        const { email, password } = values;
       
        setNotification("spinner", "Processing", 2000) 

        getToken(email, password).then(response => { 
            localStorage.setItem("token", response);
            history.push('/')    
            setNotification()
        }).catch(error => {
            alert(error);
        })    
    }

    

    return (
        <>
        <Notification />
            <Formik 
                initialValues={{
                    email: '',
                    password: '',
                }}
                validate={(values) => {
                    let err = {}

                    //validación correo
                    if (!values.email) {
                        err.email = "Por favor ingrese un correo"
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                        err.email= "Correo inválido"
                    } 

                    //validación contraseña
                    if (!values.password) {
                        err.password = "Por favor ingrese la contraseña"                   
                    } else if (!/[a-zA-ZÀ-ÿ\s]$/.test(values.password)) {
                        err.password= "Contraseña inválida"
                    }
                    return err 
                }}
                onSubmit={(values) => {
                    (values.email.toLowerCase() === email && values.password === password) ?
                    login(values)
                    :
                    alert('Los datos ingresados son incorrectos')
                    
                }}   
        >
            
            {({errors}) => (
                <Form>
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <Col md={{ span: 6, offset: 3 }}>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"                            
                            />
                            <ErrorMessage name="email" component={() => (<div className="error">{errors.email}</div>)} />
                        </Col>
                        <Col md={{ span: 6, offset: 3 }}>                   
                            <Field 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Password"                         
                            />
                            <ErrorMessage name="password" component={() => (<div className="error">{errors.password}</div>)} />
                        </Col>                 
                        <Button type="submit" variant="primary">Submit</Button>
                    </Stack>
                </Form>
            )} 
        </Formik>
        </>
    )
}

export default Login