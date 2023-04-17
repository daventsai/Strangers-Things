import { useState } from "react";

export default function RegisterForm(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        console.log({username,password});
    }

    return(
        <div></div>
    );
}
