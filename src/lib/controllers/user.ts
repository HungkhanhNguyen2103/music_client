import axios from "axios"
import { API_REGISTER, API_LOGIN, API_VERIFY_TOKEN } from '../api/user';
import qs from 'qs'
import { message } from 'antd';
import { RegisterObject } from '../../pages/components/signup';
import { LoginObject } from '../../pages/login';




const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}



export const RegisterPost = async (registerObject : RegisterObject) =>{
        await axios.post(API_REGISTER , qs.stringify(registerObject) ,{
            headers : headers
          }).then(res =>{
            console.log(res);
            if(!res.data.success){
              message.error(res.data.message)
            } 
            else {
              message.loading('Loading....',2)
              setTimeout(() => {
                message.success(res.data.message,2)
                setTimeout(() => {
                  // accessToken(res.data.accessToken)
                  window.location.reload()
                }, 100);
              }, 2300);
            }
          })
          .catch(err => {
            console.log(err);
          })
}


export const LoginPost = async (value : LoginObject) => {
    try{

      await axios.post(API_LOGIN , qs.stringify(value) ,{
        headers : headers
      })
      .then(res => {
        console.log(res);
        if(!res.data.success){
          message.error(res.data.message)
        } 
        else {
          message.loading('Loading....',2)
          setTimeout(() => {
            message.success(res.data.message,2)
            setTimeout(() => {
              // console.log(res);
                window.location.href = '/' + res.data.accessToken
            }, 100);
          }, 2300);
        }
      })
      .catch(err => {
        console.log(err);
      })
    }  catch{ console.log('fail');}
}


