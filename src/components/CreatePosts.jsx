import { useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, {useState} from 'react';
import { makePost } from "../api/posts";

export default function CreatePost(){
    const nav = useNavigate();
    const {token}=useAuth();
    const [postObj, setPostObj] = useState({
        title:'',
        description:'',
        price:'',
        location:'',
        willDeliver:false
    })

    async function handleSubmit(e){
        e.preventDefault();
        console.log('postObj:',postObj)
        try{
            await makePost(token,postObj);
            nav('/posts');
        }
        catch(error){
            console.log('Error on posting');
        }
        
    }


    return(
        <div>
            <header>
                <button onClick={()=>nav('/')}>Home</button>
                <button onClick={()=>nav('/posts')}>Posts</button>
                <button>Profile</button>
                <button onClick={()=>
                    logOut()
                }>Log Out</button>
            </header>
            <div>
                <h1>List thine artifact</h1>
                <h3>
                    What powers might your item possess? List their properties so all who hail the lands may
                    have a fair chance at obtaining your prize.
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <p>Title: <input type='text'
                placeholder='The one ring to rule them all'
                onChange={(e)=>setPostObj({title:e.target.value,...postObj})}/></p>
                <p>Description: <input type='text'
                placeholder='I am one with the force and the force is with me'
                onChange={(e)=>setPostObj({description:e.target.value,...postObj})}/></p>
                <p>Price: $<input type='text'
                placeholder='1'
                onChange={(e)=>setPostObj({price:e.target.value,...postObj})}/></p>
                <p>Location: <input type='text'
                placeholder='The Watchtower'
                onChange={(e)=>setPostObj({location:e.target.value,...postObj})}/></p>
                <p><input type='checkbox'
                 onChange={(e)=>setPostObj({willDeliver:e.target.value,...postObj})}/> Willing to deliver?</p>
                <button>Submit</button>
            </form>

        </div>
    )
}