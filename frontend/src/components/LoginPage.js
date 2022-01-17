import React, {useState} from "react";
import {baseUrl} from "../constants";
import {Link, useNavigate } from "react-router-dom";


export const LoginPage = () =>{
    let navigate = useNavigate ();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(baseUrl+'token/', {
            headers: {'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({email, password})
        })
        if (response.status === 200) {
            let tokens = await response.json()
            localStorage.setItem('access', tokens.access)
            localStorage.setItem('refresh', tokens.refresh)
            navigate('/home', {replace: true})
        }
    }
    return (
         <div>
            <h2>Login</h2>
            <form onSubmit={onLogin}>
                Email: <input type={"email"} onChange={(e) => {setEmail(e.target.value)}} />
                Password: <input type={"password"} onChange={(e) => {setPassword(e.target.value)}} />
                <button type={"submit"} >Login</button>
            </form>
             <div>
                 <h3><Link to='/registration'> Create account </Link></h3>
             </div>
        </div>
    )
}