import { useParams } from "react-router-dom"
import Header from "./Header"
import { useState, useEffect} from "react";
import { fetchAllPosts,postMessage } from "../api/posts";
import useAuth from "../hooks/useAuth";

export default function SinglePost(){
    const {postId} = useParams();
    const [posts,setPosts] = useState([]);
    //const [messagesArr,setMessagesArr] = useState([]);
    let messagesArr = [];
    const {token,user} = useAuth();
    const [content, setContent] = useState('');
    useEffect(()=>{
        async function getPosts(){
            setPosts(await fetchAllPosts());
        }
        getPosts();
    },[]);

    // useEffect(()=>{

    // },[messagesArr])

    const post = posts.find(p => p._id === postId);
    console.log('posts: ', posts);
    console.log('post: ', post);
    messagesArr= post ? post.messages : [];
    
    const msgDisplay = messagesArr;

    async function handleSubmit(e){
        e.preventDefault();
        try {
            postMessage(postId,token,content);
        } catch (error) {
            console.log('Error on submitting a message',error)
        }
    }

    return(
        <div>
            <Header/>
            <div>
                <div style={{border: '3px solid white', margin: '15px'}}>
                    <h3>{post?.title}</h3>
                    <p>{post?.description}</p>
                    <p>Price: {post?.price}</p>
                    <p>Location: {post?.location}</p>
                    {post?.willDeliver===true?
                    <p>Deliver? Willing to deliver.</p>
                    : <p>Deliver? Nah, you gotta pick it up</p>
                    }
                    <p>Posted By: {post?.author.username}</p>
                    <p>Created Date: {post?.createdAt}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Inquire about the item:</h3>
                    <input type='text' name='content' placeholder='What is it that you wish to know, young padawan?'
                    onChange={(e)=>setContent(e.target.value)}/>
                    <button>Submit</button>
                </div>
            </form>

            <h2>Messages</h2>
            <div>{
                msgDisplay.map((msg)=>{
                    return(
                        <div style={{border: '3px solid white', margin: '15px'}}>
                            <h3>{msg.fromUser.username}:</h3>
                            <p>{msg.content}</p>
                        </div>
                    )
                })   
            }
            </div>
        </div>
    )
}