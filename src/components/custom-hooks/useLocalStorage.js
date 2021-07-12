import {useState, useEffect} from 'react'

//create localStorage for token
//takes a key, which is our user token requested from our server. 
//stores user token to remember user

const useLocalStorage = (key) => {
    //create a variable that captures the key/token we are searching for as the useState value
    const initialValue = localStorage.getItem(key) || null

    const [storage, setStorage] = useState(initialValue)  

    //when custom hook is used token is set to the local storage on load
    useEffect(()=> {

    if (storage === null) {
        //if key has no value, remove it
        localStorage.removeItem(key); 
    } else {
        localStorage.setItem(key, storage);
    }
    }, [key, storage])
    
    return [storage, setStorage];
}

export default useLocalStorage