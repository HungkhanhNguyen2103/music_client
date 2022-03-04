import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryItemPage } from './category-item';
import { State } from '../../stores/reducer';
import { useEffect, useState } from 'react';
import { PlayListItemPage } from './playlists-item';
import { getCategoryPlaylists } from '../../lib/controllers';
import { shortcutsPlaylists } from '../../stores/actions';
import { Item } from './banner';
import { ArtistPage } from './artist';

interface Props{
    accessToken : string,
    toggleMoreLists : boolean
}


export const ShortcutsPage = (props : Props) =>{

    

    const CategoryList = useSelector((state : State) => state.spotify.CategoryList)

    const CategoryTitle = useSelector((state : State) => state.spotify.CategoryTitle)

    const PlayList_ShortCut = useSelector((state : State) => state.spotify.PlayList_ShortCut)
    // console.log(Playlists);


    const dispatch = useDispatch()


   useEffect(() => {
     const render = async()=>{
      if(CategoryTitle !== ''){
        const playlist = await getCategoryPlaylists(props.accessToken , CategoryTitle, 6 , 'VN')
        // console.log(playlist);  
        dispatch(shortcutsPlaylists(playlist.items))

        
      }
     }
   
     render()
   }, [props.accessToken , CategoryTitle])
   

    return(

        <Shortcuts className=" ml-20 mt-10 w-[40%] relative ">
              <h3 id='title-shortcuts' className="font-sans text-3xl font-semibold">Truy cập nhanh</h3>
              <ul id='category-shortcuts' className="flex flex-wrap w-full show  absolute">
              {
                CategoryList.length !== 0 ? (
                  CategoryList.map((item,key) => 
                    <CategoryItemPage accessToken={props.accessToken} item={item} key={key}/>
                  )   
                ) : (
                  <><h3>No data</h3></>
                )
              }
              </ul>
              <ArtistPage accessToken={props.accessToken} CategoryTitle={CategoryTitle}/>
              <ul id='playlists-shortcuts' className=" w-full absolute hide d-none">
              {
                PlayList_ShortCut.length !== 0 ? (
                  PlayList_ShortCut.map((item : Item,key : number) => 
                    <PlayListItemPage accessToken={props.accessToken}  item={item} key={key}/>
                  )   
                ) : (
                  <><h3>No data</h3></>
                )
              }
              </ul>
        </Shortcuts>

    )
}

const Shortcuts = styled.div`
  & ul.hide{
    transition: 0.4s all;
    opacity: 0;
    top: 40%;
  }
  & ul.show{
    transition: 0.4s all;
    top: 13%;
    opacity: 1;
    width: 100%;
  }
`
