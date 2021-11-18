import { Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { HeroContext } from './context/HeroContext'

import HeroesContainer from './components/HeroesContainer/HeroesContainer';

import Login from './components/Login/Login'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const history = createBrowserHistory();

function App() {

    return (
        <div className="App">
            <HeroContext>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={HeroesContainer} />
                        <Route path='/team/:path' component={HeroesContainer} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </Router>
            </HeroContext>
        </div>
    );
}

export default App;
