import {baseUrl} from "../constants";

const checkEnspiration = (token) =>{
        let data = JSON.parse(atob(token.split('.')[1]))
        return data.exp > Date.now() / 1000;
    }


const fetchWithAuth = async (path, options) => {
    if (!checkEnspiration(localStorage.getItem('access'))){
        console.log('EXPIRE!')
        let response = await fetch(baseUrl+'token/refresh/',
            {
                method: 'POST',
                body:JSON.stringify({'refresh':localStorage.getItem('refresh')})
            })
        let updatedTokens = await response.json()
        console.log(updatedTokens)
        localStorage.setItem('access', updatedTokens.access)
        localStorage.setItem('refresh', updatedTokens.refresh)
    }
    options.headers['Authorization'] = `Bearer ${localStorage.getItem('access')}`
    let response = await fetch(path, options)
    if (response.status !== 401){
        return response
    }
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}

// export const createFetchWithAuth = (cb) => (path, options) => fetchWithAuthInternal(path, options, cb);
export {fetchWithAuth}
