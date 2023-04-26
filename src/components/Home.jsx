import { useNavigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from 'react';
import Header from "./Header";

export default function Home(){
    const nav = useNavigate();
    const {user} = useAuth();

    return(
        <div>
            <Header/>
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