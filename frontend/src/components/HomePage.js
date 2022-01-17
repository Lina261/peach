import {useEffect, useState} from "react";
import {fetchWithAuth} from "../api/fetchWithAuth";
import {baseUrl} from "../constants";


export const HomePage = () =>{

    const [userData, setUserData] = useState()

    useEffect(async () => {
        const response = fetchWithAuth(baseUrl + 'user-info/', {method: 'GET', headers:{}})
            .then((response) => {return response.json()})
        const data = await response
        if (response){
            setUserData(data.user)
        }
    }, [])
    return (
        <h1>Hi, {userData}! </h1>
    )
}