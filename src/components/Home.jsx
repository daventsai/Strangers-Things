import { useNavigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from 'react';

export default function Home(){
    const nav = useNavigate();
    const {user} = useAuth();
    

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
                ?<h1>Welcome in Guest</h1>
                :<h1>Welcome in {user.username}</h1>
                }
                <h4>Take some time to browse upon my divine wares. What you seek may lie
                    buried deep into the mountains of Stranger's Things.
                </h4>
            </div>
        </div>
    )
}