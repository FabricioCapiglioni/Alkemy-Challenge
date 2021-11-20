import { useContext, useState } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Context from '../../context/HeroContext'
import { Formik, Field, Form } from 'formik'
import './Search.css'



const Search = () => {

    const { search, alreadySerched, setNotification } = useContext(Context)
    const [serchedWords, SetSerchedWords] = useState([])

    return (
        <Formik
            initialValues={{
                name: '',
            }}
            onSubmit={(values, { resetForm }) => {
                if (alreadySerched((values.name).toLowerCase(), serchedWords)) {
                    return setNotification('error', `You already search the word: '${values.name}'`, 3000)
                }else {
                    SetSerchedWords((values.name).toLowerCase())
                    search((values.name).toLowerCase())
                    resetForm();
                }                
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

