import React, {useState} from "react";
import {baseUrl} from "../constants";
import {useNavigate } from "react-router-dom";


export const RegistrationPage = ()=>{
    let navigate  = useNavigate();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onRegistration = async (e) => {
        e.preventDefault();
        console.log(email, username, password)
        const response = await fetch(baseUrl+'register/', {
            headers: {'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({email, username, password})
        })
        if (response.status === 201) {
            console.log('Registered')
            navigate('/',{replace: true})
        }
    }
    return (
        <div>
            <h2>Registration</h2>
            <form onSubmit={onRegistration}>
                Email: <input type={"email"} onChange={(e) => {setEmail(e.target.value)}} />
                Username: <input type={"text"} onChange={(e) => {setUsername(e.target.value)}}  />
                Password: <input type={"password"} onChange={(e) => {setPassword(e.target.value)}} />
                <button type={"submit"} >Register</button>

            </form>
        </div>
    )
}


