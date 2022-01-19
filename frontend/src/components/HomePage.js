import {useEffect, useState} from "react";
import {fetchWithAuth} from "../api/fetchWithAuth";
import {baseUrl} from "../constants";
import {Link} from "react-router-dom";


export const HomePage = () =>{

    const [userData, setUserData] = useState()

    useEffect( () => {
        fetchWithAuth(baseUrl + 'home/', {method: 'GET', headers:{}})
            .then((response) =>  response.json())
            .then((data) => {if(data){ setUserData(data.user)}});
    }, [])
    return (
        <div>
        <h1>Hi, {userData}!</h1>
            <h3><Link to='/profile'> My profile </Link></h3>
        </div>
    )
}