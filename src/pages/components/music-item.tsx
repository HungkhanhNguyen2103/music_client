import { sound } from '../../helpers/global';
import { PlayListItem } from '../components';
import { useState, useEffect } from 'react';
import styled from "styled-components"
import { PlayListsDetail, Image, Track } from '../home';
import getTime from '../../helpers/spotify';
import { PlayMusic ,togglePlayMusic} from '../../stores/actions';
import { useDispatch } from 'react-redux';
import { Artists } from './artist';

interface Props{
    item : PlayListsDetail,
    index : number,
   
}

export interface Album {
  id : string,
  name : string,
  release_date : string
  images : Image
}



export const MusicItemPage = (props : Props) => {

    // console.log(props.item);

    const dispatch = useDispatch()

    const duration = props.item.track.duration_ms
  
    const handlePicker = (value : PlayListsDetail ) => {
      
      if(value.togglePlay === false) dispatch(PlayMusic(value.track.external_urls.spotify))
      // console.log(value);
      dispatch(togglePlayMusic(value))
      
    }

   

  return (
    <Tr onClick={()=>handlePicker(props.item)}  className={!props.item.togglePlay ? ("cursor-pointer ease-in-out transition duration-300 items-center font-sans text-base font-medium  hover:bg-white border-0") : ("shadow-lg cursor-pointer ease-in-out transition duration-300 items-center font-sans text-base font-medium  bg-white border-0")}>
      <td scope="row" className="border-0 pt-3 pb-3  text-center">
        {!props.item.togglePlay ? props.index + 1 : sound}
      </td>

      <td className="border-0 pt-3 pb-3 "><p className='m-0 overflow-hidden whitespace-nowrap text-ellipsis w-[16.5rem]'>{props.item.track.name}</p></td>
      <td className="border-0 pt-3 pb-3 "><p className='m-0 overflow-hidden whitespace-nowrap text-ellipsis w-[6rem]'>{props.item.track.artists.map((item : Artists) => item.name + ' ')}</p></td>
      <td className="border-0 pt-3 pb-3 text-center">{getTime(duration)}</td>
      <td className="border-0 pt-3 pb-3  "><p className='m-0 overflow-hidden whitespace-nowrap text-ellipsis w-[6rem]'>{props.item.track.album.name}</p></td>
    </Tr>
  );
};

const Tr = styled.tr`
    color: #8B8A8D;
    :hover{
        color: #000000e2;
    }

`
