import {Routes,Route,Navigate,Outlet} from 'react-router-dom';
import './App.css';
import useAuth from './hooks/useAuth';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import AllPosts from './components/AllPosts';
import CreatePost from './components/CreatePosts';
import SinglePost from './components/SinglePost';
import Messages from './components/Messages';

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
        <Route path='/' element={<Home/>}/>
        <Route path='/posts' element={<AllPosts/>}/>
        <Route path='/messages' element={<Messages/>}/>
        
        <Route element={<ProtectedComponent token={token}/>}>
          <Route path='/posts/create' element={<CreatePost/>}/>
          <Route path='/post/:postId' element={<SinglePost/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
