import { useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState(null);

  console.log('Token from App: ',token);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginForm setToken={setToken}/>}/>
        <Route path='/register' element={<RegisterForm setToken={setToken}/>}/>
      </Routes>
    </div>
  )
}

export default App;
