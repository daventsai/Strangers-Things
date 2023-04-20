import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAllPosts } from "../api/posts";
import {useState,useEffect} from 'react';

export default function Home(){
    const nav = useNavigate();
    const {user} = useAuth();

    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        async function getPosts(){
            setPosts(await fetchAllPosts());
        }
        getPosts();
    },[]);

    function logOut(){
        localStorage.removeItem('token');
        nav('/login');
    }


    const postDisplay = posts;
    console.log('posts: ',posts);
    return(
        <div>
            <header>
                <p>Stranger's Things</p>
                <button>Home</button>
                <button>Posts</button>
                <button>Profile</button>
                <button onClick={()=>
                    logOut()
                }>Log Out</button>
            </header>
            <div>
                <h1>Welcome in {user.username}</h1>
            </div>
            <div>{
                postDisplay.map((post)=>{
                    return(
                        <div style={{border: '3px solid white', margin: '15px'}}>
                            <h3>{post.title}</h3>
                            <h4>From: {post.author.username}</h4>
                            <p>{post.description}</p>
                        </div>
                    )
                })
            }</div>
        </div>
    )
}