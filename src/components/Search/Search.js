import { useContext, } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Context from '../../context/HeroContext'
import { Formik, Field, Form } from 'formik'
import './Search.css'



const Search = () => {

    const { search } = useContext(Context)

    return (
        <Formik
            initialValues={{
                name: '',
            }}
            onSubmit={(values, { resetForm }) => {
                search(values.name)
                resetForm();
            }}
        >
            {() => (
                <Form>
                    <Stack direction="horizontal" gap={3} >                           
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Search a super hero"
                        />
                        <Button type="submit" variant="primary">Search</Button>
                    </Stack>
                </Form>
            )}

        </Formik>
    )
}

export default Search

