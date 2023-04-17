import { useState } from 'react';
import './App.css';
import RegisterForm from "./components/RegisterForm";

function App() {
  //cons [token, setToken] = useState(null);

  return (
    <div className="App">
        <h1>Stranger's Things</h1>
        <RegisterForm/>
    </div>
  )
}

export default App;
