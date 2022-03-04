import { RegisterPost , LoginPost } from '../../lib/controllers/user';
import { RegisterObject } from '../../pages/components/signup';

interface InitialState {
    DataUser : object
}

type Action = {
    type : string,
    payload : any
}

export const    authReducers = (
    state: InitialState = {
        DataUser : {}
    },
    action : Action
) => {
    switch(action.type){
        case 'REGISTER_USER':{
            const registerObject : RegisterObject = {
                username : action.payload.username,
                email : action.payload.email,
                password : action.payload.password,
                birthday : action.payload.birthday._d,
                gender : action.payload.gender
            }
            RegisterPost(registerObject)
            return state;
        }
        case 'LOGIN_USER':{
            // const loginObject : 
            LoginPost(action.payload)
            return state;
        } 
        case 'DATA_USER':{
            // const loginObject : 

            return {
                ...state,
                DataUser : action.payload
            };
        } 
        default:
            return state;
    }
}