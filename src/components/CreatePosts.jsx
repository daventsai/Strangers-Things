import { useNavigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAllPosts } from "../api/posts";
import React, {useState,useEffect} from 'react';

export default function CreatePost(){
    const nav = useNavigate();
    
    const post= {
        title:'',
        description:'',
        price:'',
        willDeliver:false
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
            <div>
                <p>Title: <input type='text' placeholder='The one ring to rule them all'/></p>
                <p>Description: <input type='text' placeholder='I am one with the force and the force si with me'/></p>
                <p>Price: $<input type='text' placeholder='1'/></p>
                <p>Location: <input type='text' placeholder='The Watchtower'/></p>
                <p><input type='checkbox'/> Willing to deliver?</p>
                <button>Submit</button>
            </div>

        </div>
    )
}