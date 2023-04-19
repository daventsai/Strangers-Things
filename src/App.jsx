import { useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  console.log('Token from App: ',token);
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginForm setToken={setToken}/>}/>
        <Route path='/register' element={<RegisterForm setToken={setToken}/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App;
