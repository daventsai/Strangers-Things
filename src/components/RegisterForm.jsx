import { useState } from "react";
import { registerUser } from "../api/users";

export default function RegisterForm({setToken}){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const result = await registerUser(username, password);
            console.log('Result on Submission: ', result);
            setToken(result.data.token);
        } catch (error) {
            console.log('Error on Submission: ',error);
        }
        console.log({username,password});
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
                <input type='text' name='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                <button>Submit</button>
            </form>
            
        </div>
    );
}
