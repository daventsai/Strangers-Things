import { useParams,useNavigate } from "react-router-dom"
import Header from "./Header"
import { useState, useEffect} from "react";
import { fetchAllPosts,postMessage,deletePost,updatePost } from "../api/posts";
import useAuth from "../hooks/useAuth";

export default function SinglePost(){
    const nav = useNavigate();
    const {postId} = useParams();
    const [posts,setPosts] = useState([]);
    const [editMode,setEditMode] = useState(false);
    const [editedPost,setEditedPost] = useState({});
    let messagesArr = [];
    const {token,user} = useAuth();
    const [content, setContent] = useState('');
    const [submitState,setSubmitState]=useState(false);
    useEffect(()=>{
        async function getPosts(){
            setPosts(await fetchAllPosts(token));
        }
        getPosts();
    },[editMode,submitState]);
    //putting in the edmitMode auto-refreshing now breaks the messages refreshing upon submission...
    //created the submitState to try to fix, but it's not working
    let post = posts.find(p => p._id === postId);
    messagesArr= post ? post.messages : [];

    const msgDisplay = messagesArr;

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await postMessage(postId,token,content);
            console.log('content after posting: ', content);
            console.log('post message: ',post.messages);
            
        } catch (error) {
            console.log('Error on submitting a message',error);
        }
    }
    async function handleEditSubmit(e){
        e.preventDefault();
        try{
            console.log('new edited post info: ',editedPost)
            await updatePost(postId,token,editedPost.title,editedPost.description,editedPost.price,editedPost.location,editedPost.willDeliver)
            setEditMode(false);
            setSubmitState(false);
            messagesArr= post ? post.messages : [];
        }
        catch(error){
            console.log('Error on editing a message',error);
        }
    }
    async function deletingPost(e){
        try {
            deletePost(postId,token);
            nav('/');
        } catch (error) {
            console.log('Error on deleting a post',error);
        }
    }
    
    return(
        <div>
            <Header/>
            <div>
                <div style={{border: '3px solid white', margin: '15px'}}>
                { editMode !== true
                ?
                    <div>
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
                        { user._id===post?.author._id
                            ?
                            <div>
                                <button onClick={()=> setEditMode(true)}>Edit</button>
                                <button onClick={()=> deletingPost()}>Delete</button>
                            </div>
                            :
                            <div/>
                        }
                    </div>
                :
                    <form onSubmit={handleEditSubmit}>
                        <p>Title: <input type='text' defaultValue={post?.title} onChange={(e)=>setEditedPost({...editedPost,title:e.target.value})}></input></p>
                        <p>Description: <input type='text' defaultValue={post?.description} onChange={(e)=>setEditedPost({...editedPost,description:e.target.value})}></input></p>
                        <p>Price: <input type='text' defaultValue={post?.price} onChange={(e)=>setEditedPost({...editedPost,price:e.target.value})}></input></p>
                        <p>Location: <input type='text' defaultValue={post?.location} onChange={(e)=>setEditedPost({...editedPost,location:e.target.value})}></input></p>
                        {/*------tried for a while checkbox can't auto-fill according to willDeliver, doesn't work------*/}
                        <p>Willing to deliver: <input type='checkbox' checked={post?.willDeliver ? true : false} onChange={(e)=>setEditedPost({...editedPost,willDeliver:(e.target.value==='on' ? true : false)})}></input></p>
                        <p>Posted By: {post?.author.username}</p>
                        <p>Created Date: {post?.createdAt}</p>
                        <button>Submit</button>
                    </form>
                }
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Inquire about the item:</h3>
                    <input type='text' name='content' placeholder='What is it that you wish to know, young padawan?'
                    onChange={(e)=>setContent(e.target.value)}/>
                    <button onClick={()=>setSubmitState(true)}>Submit</button>
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