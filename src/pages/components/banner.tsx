import styled from "styled-components";
import { useEffect, useState } from 'react';
import { getCategoryPlaylists } from '../../lib/controllers';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../stores/reducer';
import { PlayMusic ,PlayListDetail,togglePlayMusic, renderPlaylists} from '../../stores/actions';
import { message } from 'antd';




interface Props {
    accessToken : string
}

export interface PlayListItem {
    href : string,
    icons : any,
    id : string,
    name : string,
    uri : string
  }


export interface Item {
    id : string,
    name : string,
    url : string,
    track : string,
    followers : number,
    toggleLike: boolean
}



export const BannerPage = (props : Props) =>{
     

    const dispatch = useDispatch()

    const PlayListItem = useSelector((state : State) => state.spotify.PlayListItem)

    const CategoryTitle = useSelector((state : State) => state.spotify.CategoryTitle)

    // const PlayLists = useSelector((state : State) => state.spotify.Playlists)

    
    useEffect(() => {
        const render = async() =>{
  
              if(CategoryTitle !== ''){
                const playlist = await getCategoryPlaylists(props.accessToken ,CategoryTitle , 1 ,'VN')
                // console.log(playlist);
                
                if(playlist.items.length !== 0 ){
                  
                  const payload = {
                    idCategory : CategoryTitle,
                    items : playlist.items
                  } 
                  
                  dispatch(renderPlaylists(payload))
    
                  dispatch(PlayListDetail(playlist.items[0].id))
    
                }
                else message.error('Không tìm thấy dữ liệu')
              }
        // console.log(playlist.items);
        }
        render();
    }, [props.accessToken,CategoryTitle])
    

    // console.log(CategoryTitle);
    

    const handlePlay = () =>{
        dispatch(PlayMusic(PlayListItem.track));
        dispatch(PlayListDetail(PlayListItem.id))
        // dispatch(togglePlayMusic(PlayLists[0]))
    }
    

    return (
    
        <div className="banner__name relative h-[260px]">
        <BannerBackground className="absolute w-full h-full rounded-2xl pt-14 pl-8">
                <p
                  style={{ color: "#8B8A8D" }}
                  className="font-sans text-base font-medium mb-1"
                >
                 Nghệ sĩ
                </p>
                    <h3 className="font-sans text-4xl font-semibold max-w-[15rem] min-h-[80px]">
                        {PlayListItem.name}
                    </h3>
                    <div className="flex mt-2 ">
                      <button onClick={handlePlay}  className="banner__play text-center uppercase pt-[0.4rem] pb-[0.4rem] pl-6 pr-6 text-white font-normal rounded-full mt-2 ">play</button>
                      <button className="banner__follow text-center ml-4 uppercase pt-[0.3rem] pb-[0.3rem] pl-6 pr-6  font-medium rounded-full mt-2">follow</button>
                    </div>
        </BannerBackground> 
        <img
        className="rounded-2xl h-full border-gray-400 "
        src={PlayListItem.url}
        width={800}
        alt="banner"
      />
    </div>
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