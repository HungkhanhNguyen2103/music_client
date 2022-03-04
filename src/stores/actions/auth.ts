export const registerUser = (value : any) =>{
    return {
        type : 'REGISTER_USER',
        payload : value,
    }
}

export const loginUser = (value : any) =>{
    return {
        type : 'LOGIN_USER',
        payload : value,
    }
}

export const dataUser = (value : any) =>{
    return {
        type : 'DATA_USER',
        payload : value,
    }
}