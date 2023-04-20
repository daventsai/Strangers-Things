import {Routes,Route,Navigate,Outlet} from 'react-router-dom';
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import useAuth from './hooks/useAuth';

function ProtectedComponent(props){
  if (props.token === null){
    return(<div className='App'>
        <Navigate to='/login'/>
      </div>)
  }
  else{
    return(
      <Outlet/>
    )
  }
}

function App() {
  const {token,setToken} = useAuth();

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginForm setToken={setToken}/>}/>
        <Route path='/register' element={<RegisterForm setToken={setToken}/>}/>
        
        <Route element={<ProtectedComponent token={token}/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
