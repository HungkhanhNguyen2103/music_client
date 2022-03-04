import axios from 'axios';
import { API_NEW_MY_PLAYLIST } from '../api';
import qs from 'qs';
import { MyPlaylist } from '../../pages/navigation';
import { Track } from '../../pages/home';
import {  API_PLAYLIST } from '../api/playlist';
import { message } from 'antd';

const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  

export const CreateMyPlaylist = async (value : MyPlaylist) => {

      await axios.post(API_NEW_MY_PLAYLIST , qs.stringify(value) ,{
        headers : headers
      })
      .then(res => {

        window.location.href = '/my-playlists/' + res.data.playlistId
      })
      .catch(err => {
        console.log(err);
      })

}

export const getPlayListDetail = (value : any) => {

 axios.get(API_PLAYLIST + value)
  .then(res => {
    console.log(res);
    
  })
  .catch(err => {
    console.log(err);
  })

}

export const addTrackMyPlayList = async (value : Track) => {
  // console.log(value);
  const code = window.location.href.split('/my-playlists/') 
  const id_my_playlist = code[1]

  
  await axios.post(API_PLAYLIST + id_my_playlist + '/add-track' , qs.stringify(value) ,{
    headers : headers
  })
  .then(res => {
    // console.log(res);
    message.success(res.data.message)
    setTimeout(() => {
      window.location.reload()
    }, 800);
  })
  .catch(err => {
    console.log(err);
  })

}

