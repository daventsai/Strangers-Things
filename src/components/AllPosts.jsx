import { useNavigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAllPosts } from "../api/posts";
import React, {useState,useEffect} from 'react';
import Header from "./Header";

export default function AllPosts(){
    const nav = useNavigate();
    const {user} = useAuth();
    const [postName, setPostName] = useState('');

    
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        async function getPosts(){
            setPosts(await fetchAllPosts());
        }
        getPosts();
    },[]);

    const postDisplay = postName.length ? posts.filter((p)=>p.title.toLowerCase().includes(postName.toLowerCase())) : posts;

    return(
        <div>
            <Header/>
            <div>{
                (!localStorage.getItem('token'))
                ?<h1>Looking for a something, Guest?</h1>
                :<h1>Looking for something, {user.username}?</h1>
                }
                <p>or perhaps you fancy to sell some of your unique wares?
                    <button onClick={()=>nav('/posts/create')}>Create a Post</button>
                </p>
            </div>
            <div className='search'>
                <p>Search for a post: </p>
                <input type='text' onChange={(e)=>setPostName(e.target.value)}/>
            </div>
            <div>{
                postDisplay.map((post)=>{
                    return(
                        <div style={{border: '3px solid white', margin: '15px'}}>
                            <h3>{post.title}</h3>
                            <h4>From: {post.author.username}</h4>
                            <p>{post.description}</p>
                            <p>{post.price}</p>
                            <Link to={`/post/${post._id}`}>View the post here</Link>
                        </div>
                    )
                })
            }</div>
        </div>
    )
}