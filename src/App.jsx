import { useState } from 'react';
import './App.css';
import RegisterForm from './components/RegisterForm';

function App() {
  const [token, setToken] = useState(null);

  console.log('Token from App: ',token);
  return (
    <div className='App'>
        <h1>Stranger's Things</h1>
        <RegisterForm setToken={setToken}/>
    </div>
  )
}

export default App;
