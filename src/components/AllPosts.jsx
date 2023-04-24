import { useNavigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAllPosts } from "../api/posts";
import React, {useState,useEffect} from 'react';

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


    function logOut(){
        localStorage.removeItem('token');
        nav('/login');
    }

    return(
        <div>
            <header>
                <p>Stranger's Things</p>
                <div>{
                    (!localStorage.getItem('token'))
                    ?<Link to='/login'>Login</Link>
                    : <div/>
                }
                </div>
                <div>{
                    (!localStorage.getItem('token'))
                        ?<Link to='/register'>Register</Link>
                        : <div/>
                }
                </div>
                <button onClick={()=>nav('/')}>Home</button>
                <button onClick={()=>nav('/posts')}>Posts</button>
                <button>Profile</button>
                <button onClick={()=>
                    logOut()
                }>Log Out</button>
            </header>
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
                        </div>
                    )
                })
            }</div>
        </div>
    )
}