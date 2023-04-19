import {Link,useNavigate} from 'react-router-dom';
import { useState } from "react";
import { loginUser } from '../api/users';

export default function LoginForm({setToken}){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    
    const nav = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const result = await loginUser(username,password);
            setToken(result.data.token);
            localStorage.setItem('token',result.data.token);
            console.log('Log in successful');
            nav('/');
        } catch(error){
            console.log('Error on logging in submission');
        }
    }

    return(
        <div>
            <h1>Stranger's Things</h1>
            <h3>Enter Login Information</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='username' placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
                    <input type='text' name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                    <button>Submit</button>
                </div>
                <Link to='/register'>Register a new user</Link>
            </form>
        </div>
        
    )
}