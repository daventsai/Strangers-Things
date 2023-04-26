import { useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, {useState} from 'react';
import { makePost } from "../api/posts";
import Header from "./Header";

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
            <Header/>
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
                onChange={(e)=>setPostObj({...postObj,title:e.target.value})}/></p>
                <p>Description: <input type='text'
                placeholder='I am one with the force and the force is with me'
                onChange={(e)=>setPostObj({...postObj,description:e.target.value})}/></p>
                <p>Price: $<input type='text'
                placeholder='1'
                onChange={(e)=>setPostObj({...postObj,price:e.target.value})}/></p>
                <p>Location: <input type='text'
                placeholder='The Watchtower'
                onChange={(e)=>setPostObj({...postObj,location:e.target.value})}/></p>
                <p><input type='checkbox'
                 onChange={(e)=>setPostObj({...postObj,willDeliver:(e.target.value==='on' ? true : false)})}/> Willing to deliver?</p>
                <button>Submit</button>
            </form>

        </div>
    )
}