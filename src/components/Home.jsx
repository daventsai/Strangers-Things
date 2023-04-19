import { useNavigate } from "react-router-dom";

export default function Home(){
    
    const nav = useNavigate('');

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
                <h1>Welcome in</h1>
            </div>
        </div>
    )
}