import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header(){
    const nav = useNavigate();
    const {token,setToken} = useAuth();
    const loc = useLocation();

    function logOut(){
        localStorage.removeItem('token');
        setToken(null);
        nav('/login');
    }

    return(
        <header>
            <p>Stranger's Things</p>
            { token
            ?
            <div>
                <button onClick={()=>nav('/')}>Home</button>
                <button onClick={()=>nav('/posts')}>Posts</button>
                <button onClick={()=>nav('/messages')}>Messages</button>
                <button onClick={()=>
                    logOut()
                }>Log Out</button>
            </div>
            :
            <div>
                <div>{
                    (loc.pathname !== '/login' && loc.pathname !=='/register')
                    ?
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </div>
                    :
                    <div/>
                    }
                </div>
                <button onClick={()=>nav('/')}>Home</button>
                <button onClick={()=>nav('/posts')}>Posts</button>
            </div>
            }
        </header>
    )
}