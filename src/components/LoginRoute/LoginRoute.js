import Context from '../../context/HeroContext'
import {useContext, useEffect} from 'react'
import { Redirect, Route } from 'react-router-dom'

const LoginRoute = ({ component: Component, ...rest }) => {

  const {user} = useContext(Context)

  useEffect(() => {
  }, [user])

  return (
    <Route
      {...rest}
      
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

export default LoginRoute