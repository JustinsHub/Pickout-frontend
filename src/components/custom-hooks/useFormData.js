import {useState} from 'react'

const useFormData = (INITIAL_STATE) => {
    const [formData, setFormData] = useState(INITIAL_STATE) 
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(state=> ({...state, [name]:value}))
    }
    return [formData, handleChange]
}

export default useFormData
