import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {HeroContext} from './context/HeroContext'

import LoginRoute from './components/LoginRoute/LoginRoute'
import NavBar from './components/Navbar/Navbar';
import Notification from './components/Notification/Notification';
import Home from './components/Home/Home';
import Login from './components/Login/Login'


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <div className="App">
      <HeroContext>
        <BrowserRouter>
          <header className="App-header">
            <NavBar />
          </header>
          <main>
            <Notification />
            <Switch>
              <LoginRoute exact path='/' component={Home} />
              <Route path='/login' component={Login} />
            </Switch>
          </main>
          </BrowserRouter>
        </HeroContext>
    </div>
  );
}

export default App;
