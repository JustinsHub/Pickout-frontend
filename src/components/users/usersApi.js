import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";


class User {

static async register (userInfo) {
    try{
        const res = await axios.post(`${BASE_URL}/auth/register`,
        userInfo
    )
    return res
    }catch(e){
        return e.response.data.error.message
    }
}

static async login (loginInfo) {
    try{
        const res = await axios.post(`${BASE_URL}/auth/login`,
        loginInfo
    )
    return res
    }catch(e){
        return e.response.data.error.message
    }
}

static async getUserId(id){
    try{
        const res = await axios.get(`${BASE_URL}/users/${id}`)
        return res
    }catch(e){
        return e.response.data.error.message
    }
}

static async updateUser(id, editInfo){
    try{
        //requests user id to match our user and looks for edited info
    const res = await axios.patch(`${BASE_URL}/users/update/${id}`, editInfo) // object must be passed in for editInfo and match the API req.body
    return res
    }catch(e){
        return e.response.data.error.message
    }
}

static async deleteUser(id){
    try {
    const res = await axios.delete(`${BASE_URL}/users/delete/${id}`)
    return res
    }catch(e){
        return e.response.data.error.message
    }
}

static async getUserAddress(id) {
    try{
        const res = await axios.get(`${BASE_URL}/address/${id}`)
        return res
    }catch(e){
        return e.response.data.error.message
    }
}

static async updateAddress(id, addressInfo){
    try{
        const res = await axios.patch(`${BASE_URL}/address/update/${id}`, addressInfo)
        return res
    }catch(e){
        return e.response.data.error.message
    }
}

//check for extra authentication (not in use right now)
// static async checkPassword(id, userPass){
//     try{
//     const res = await axios.post(`${BASE_URL}/users/authorization/${id}`, {password: userPass})
//     return res
//     }catch(e){
//         return e
//     }
// }
}

export default User