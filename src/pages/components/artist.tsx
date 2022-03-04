import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getCategoryPlaylists ,getPlaylistTracks , getArtistDetails} from '../../lib/controllers';
import { useDispatch, useSelector } from 'react-redux';
import { shortcutsArtists, artistID} from '../../stores/actions';
import { Image } from '../home';
import { State } from '../../stores/reducer/index';
import { ArtistItemPage } from './artist-item';


interface Props {
    accessToken : string,
    CategoryTitle : string

}

export interface Artists {
    id : string,
    external_urls : {
      spotify : string
    }
    name : string
    images : Image[]
    followers : {
        total : number
    }
    popularity : number,
    toggleFollower : boolean
  }

export const ArtistPage = (props : Props)=>{

    const dispatch = useDispatch()

    const Artist_ShortCut = useSelector((state : State) => state.spotify.Artist_ShortCut)
   
    // console.log(Artist_ShortCut);
    

    useEffect(() => {
        
        const render = async()=>{
            if( props.CategoryTitle !== ''){
                
                const playlist = await getCategoryPlaylists(props.accessToken ,props.CategoryTitle , 1 ,'VN')

                const tracks = await getPlaylistTracks(props.accessToken,playlist.items[0].id,5)

                // console.log( props.CategoryTitle);
                
                const listArtistsID : string[] = []
                tracks.items.map((item : any) =>{
                    return listArtistsID.push(item.track.artists[0].id)
                })
                // dispatch(artistID(listArtistsID))
                
                let i : number = 0
                const listArtists : Artists[] = []
                while(listArtistsID.length - 1 >= i){
                    const artist = await getArtistDetails(props.accessToken , listArtistsID[i])
                    listArtists.push(artist)
                    i++;
                }
                dispatch(shortcutsArtists(listArtists))
                // console.log(listArtists);
            }
            
        }
        render()
      }, [props.accessToken,props.CategoryTitle])
    
      

    return(
        <Artist id='artist-shortcuts' className=' relative show'>
            <h3 className='font-sans text-3xl font-semibold'>Nghệ sĩ</h3>
            <ul  className=" w-full absolute ">
                {
                    Artist_ShortCut.length !== 0 ? (
                        Artist_ShortCut.map((item : Artists) =>
                            <ArtistItemPage accessToken={props.accessToken} item={item} key={item.id}/>
                        )
                    ) : (
                        <>No data</>
                    )
                }
            </ul>
        </Artist>
    )

}

const Artist = styled.div`
    &.hide{
        transition: 0.4s all;
        opacity: 0;
        top: 65%;
    }
    &.show{
        transition: 0.4s all;
        top: 45%;
        opacity: 1;
        width: 100%;
    }
    & li h3{
        opacity: 0;
        top : 2rem;
        transition: 0.4s all;
    }
    & li:hover h3{
        transition: 0.4s all;
        top: 1rem;
        opacity: 1;
    }
`