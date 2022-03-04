import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../stores/reducer/index';
import { PlayMusic } from '../../stores/actions/spotify';
import { Track } from '../home';
import { useState, useEffect } from 'react';
import { getTimeMyList, getNamePlaylist } from '../../helpers/spotify';

export interface MyPlaylistDetail{
  name : string,
  tracksMusic : Track[]
}
interface Props {
  MyPlayListDetail : MyPlaylistDetail
}

export const PlayListBannerPage = (props : Props) =>{
  

    const PlayListItem = useSelector((state : State) => state.spotify.PlayListItem)

    const TrackSong = useSelector((state : State) => state.playlist.TrackSong)


    let res : number = TrackSong.filter(item => item > 0).reduce((total , currentValue)=> total + currentValue , 0)

    

    const dispatch = useDispatch()

    const handlePlay = () =>{
     
     if(PlayListItem.track !== ''){
       dispatch(PlayMusic(PlayListItem.track))
      //  dispatch(togglePlaySpotifyArtist(ArtistDetail))
     }
    }

    return (
        <>
        <div className="banner__name relative h-[260px] mt-20">
        <BannerBackground className="absolute w-full h-full rounded-lg pt-20 pl-8">
                <p
                  style={{ color: "#8B8A8D" }}
                  className="font-sans text-base font-medium mb-1"
                >
                 Nghệ sĩ
                </p>
                    <h3 className="font-sans text-3xl font-semibold capitalize max-w-[15rem] mt-2 min-h-[40px]">
                        {PlayListItem.name !== '' ? (PlayListItem.name) :('')} 
                    </h3>
                    <div className="flex mt-2 ">
                      <button onClick={handlePlay}  className="banner__play text-center uppercase pt-[0.4rem] pb-[0.4rem] pl-6 pr-6 text-white font-normal rounded-full mt-2 ">play</button>
                  
                    </div>
        </BannerBackground> 
        <img
        className="rounded-lg h-full border-gray-400 "
        src={PlayListItem.url !== ''? (PlayListItem.url) :('')} 
        width={400}
        alt="banner"
      /> 
    </div>
    <div className="absolute bottom-0 left-[36%]">
                    <h3 className="font-sans text-5xl font-semibold mb-2 capitalize min-h-[40px]">
                    {PlayListItem.name !== '' ? (PlayListItem.name) :('')} 
                    {props.MyPlayListDetail.name !== '' ? (getNamePlaylist(props.MyPlayListDetail.name)) :('')}
                    </h3>
                <p
                  style={{ color: "#8B8A8D" }}
                  className="font-sans text-base font-medium mb-1"
                >
                 {PlayListItem.followers !== 0 ? (PlayListItem.followers.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' lượt theo dõi') : ('')} 
                 {props.MyPlayListDetail.tracksMusic.length !== 0 ? (props.MyPlayListDetail.tracksMusic.length + ' ca khúc, ' + getTimeMyList(res)) : ('')}
                </p>
      </div>
    </>
    )
}

const BannerBackground= styled.div`
  background-image:  linear-gradient( to right, #fffffffb,  #ffffff2b);
  & .banner__play{
    background-color: #15111E ;
  } 
  & .banner__follow{
    border: 2px solid #15111E;
    color : #15111E;
  }
`