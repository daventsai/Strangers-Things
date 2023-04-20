import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
        </div>
    )
}