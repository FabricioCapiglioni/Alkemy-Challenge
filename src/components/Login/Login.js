import './Login.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
/* import { useState } from 'react' */
import axios from "axios";

const Login = ({setUser}) => {

    const email= 'challenge@alkemy.org'
    const password= 'react'

    const getToken = (values) => {
        
        const { email, password } = values;
        axios.post('http://challenge-react.alkemy.org/', {
            email,
            password,
        }).then(response => { 
            localStorage.setItem("token", response.data.token);
            setUser(true)
        }).catch(error => {
        alert(error);
        })
          
      }
      

    return (
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
                getToken(values)
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
    )
}

export default Login