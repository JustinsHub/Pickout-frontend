import {useState} from 'react'

const useError = (errorData) =>{
    const [errorStorage, setErrorStorage] = useState(errorData)
    return [errorStorage, setErrorStorage]
}

export default useError