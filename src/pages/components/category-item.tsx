import { CategoryItem } from '../home';
import { useEffect, useState } from 'react';
import { getCategoryPlaylists, getPlaylistTracks } from '../../lib/controllers/music';
import { renderPlaylists } from '../../stores/actions';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../stores/reducer';
import { PlayMusic, PlayListDetail } from '../../stores/actions';
import { renderPlayListDetail, shortcutsPlaylists } from '../../stores/actions/spotify';
import { message } from 'antd';
interface Props {
    item : CategoryItem,
    accessToken : string
}

export const CategoryItemPage = (props : Props) => {

  const dispatch = useDispatch()

  // const PlayListItem = useSelector((state : State) => state.spotify.PlayListItem)
  const IdPlaylistDetail = useSelector((state : State) => state.spotify.IdPlaylistDetail)

  useEffect(() => {
    const render = async () =>{
      
      if(IdPlaylistDetail !== ''){
        const tracks = await getPlaylistTracks(props.accessToken ,IdPlaylistDetail,5)
        dispatch(renderPlayListDetail(tracks.items))
      }
    }
    render()
  }, [props.accessToken,IdPlaylistDetail])
  

  const handleItemCategory = async (value : CategoryItem) => {
        // console.log(value);
        const playlist = await getCategoryPlaylists(props.accessToken ,value.id , 5, 'VN')
        // console.log(playlist != undefined);
        
          const payload = {
            idCategory : value.id,
            items : playlist.items
          }
          const hide = message.loading('', 0);
        // Dismiss manually and asynchronously
          setTimeout(hide, 600);
          setTimeout(() => {
            dispatch(renderPlaylists(payload)) 
            if(playlist.length !== 0){
              dispatch(PlayListDetail(playlist.items[0].id))
              dispatch(shortcutsPlaylists(playlist.items))
            }          
            else message.error('Không tìm thấy dữ liệu')
          }, 850);
          
 
  }

  return (
    <li
      onClick={()=>handleItemCategory(props.item)}
      className="w-[30%] mt-2 mb-2 mr-2 rounded-full pt-2 pb-2 text-center font-medium cursor-pointer"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {props.item.name}
    </li>
  );
};
