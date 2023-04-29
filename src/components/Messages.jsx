import { useState,useEffect } from "react";
import Header from "./Header"
import { fetchAllPosts } from "../api/posts";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Messages(){
    const [posts, setPosts]=useState([]);
    const {token,user} = useAuth();
    let messagesArr=[];

    useEffect(()=>{
        async function getPosts(){
            setPosts(await fetchAllPosts(token))
        }
        getPosts();
    },[]);

    console.log('posts', posts);
    let post = posts.filter(p=>p.author._id===user._id)
    console.log('single post',post)
    if(post.length>0){
        for (let i=0;i<post.length;i++){
            for (let j=0;j<post[i].messages.length;j++){
                const tempParent = {messages:post[i].messages[j], title:post[i].title, postId:post[i]._id};
                messagesArr.push(tempParent);
            }
        }
    }
    //tried sorting them by date, but didn't get it to work
    const msgDisplay = messagesArr.sort((a,b)=>Date(a.messages.createdAt)-Date(b.messages.createdAt));

    return(
        <div>
            <Header/>
            <div>
                <h2>Messages Received:</h2>
                {
                msgDisplay?.map((msg)=>{
                    return(
                        <div style={{border: '3px solid white', margin: '15px'}}>
                            <h3>{msg.title}</h3>
                            <h3>{msg.messages.fromUser.username}</h3>
                            <p>From: {msg.messages.content}</p>
                            <p>Created Date: {msg.messages.createdAt}</p>
                            <Link to={`/post/${msg.postId}`}>View the post here</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}