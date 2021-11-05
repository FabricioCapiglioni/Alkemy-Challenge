import './App.css';
import {useState, /* useEffect */} from 'react'
import Login from './components/Login/Login';
import NavBar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main/Main';

function App() {

  const [user, setUser] = useState(false)
  
  return (
    <div className="App">
      {user === true ?
      <>
      <header className="App-header">
        <NavBar setUser={setUser} />
      </header>
      <main>
        <Main />
      </main>
    </>
    : <Login setUser={setUser} />
      }
    </div>
  );
}

export default App;
