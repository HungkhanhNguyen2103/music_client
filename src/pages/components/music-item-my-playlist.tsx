import { sound } from '../../helpers/global';
import { PlayListItem } from '../components';
import { useState, useEffect } from 'react';
import styled from "styled-components"
import { PlayListsDetail, Image, Track } from '../home';
import getTime from '../../helpers/spotify';
import { PlayMusic ,togglePlayMusic,addTrackPlaylist} from '../../stores/actions';
import { useDispatch } from 'react-redux';
import { Artists } from './artist';
import { MyPlaylistDetail } from './playlist-banner';




interface Props{
    index : number,
    item : Track,
    toggleAdd: boolean
   
}


export const MusicItemMyPlaylistPage = (props : Props) => {

    // console.log(props.item);

    const dispatch = useDispatch()

    const duration = props.item.duration_ms
  
    const handlePicker = (value : Track ) => {
      // console.log(value);
      
    //   if(!props.toggleAdd){
    //     if(value.togglePlay === false) dispatch(PlayMusic(value.track.external_urls.spotify))
 
    //     dispatch(togglePlayMusic(value))
    //   }
    //   else{
        
    //     dispatch(addTrackPlaylist(value.track))
    //   }
      
    }


   

  return (
    <Tr  onClick={()=>handlePicker(props.item)} className={!props.item.togglePlay ? ("cursor-pointer ease-in-out transition duration-300 items-center font-sans text-base font-medium  hover:bg-white border-0") : ("shadow-lg cursor-pointer ease-in-out transition duration-300 items-center font-sans text-base font-medium  bg-white border-0")}>
      <td scope="row" className="border-0 pt-3 pb-3  text-center">
        {!props.item.togglePlay ? props.index + 1 : sound}
      </td>

      <td className="border-0 pt-3 pb-3  w-[350px] "><p className='m-0 overflow-hidden whitespace-nowrap text-ellipsis w-[260px]'>{props.item.name}</p></td>
      <td className="border-0 pt-3 pb-3 w-[350px]"><p className='m-0 overflow-hidden whitespace-nowrap text-ellipsis w-[260px]'>{props.item.artists.map((item : Artists) => item.name + ' ')}</p></td>
      <td className="border-0 pt-3 pb-3 text-left">{getTime(duration)}</td>
      <td className="border-0 pt-3 pb-3 "><p className='m-0 overflow-hidden whitespace-nowrap text-ellipsis w-[260px]'>{props.item.album.name}</p></td>
      
    </Tr>

  );
};

const Tr = styled.tr`
    color: #8B8A8D;
    :hover{
        color: #000000e2;
    }

`
