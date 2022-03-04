import { heart, heart_active } from '../../helpers/global';
import { Item } from './banner';
import { useDispatch } from 'react-redux';
import { renderPlaylists } from '../../stores/actions';
import { message } from 'antd';
import { getPlaylistsDetails, getPlaylistTracks } from '../../lib/controllers/music';
import { renderPlayListDetail } from '../../stores/actions/spotify';

interface Props {
    item : Item,
    accessToken : string
}

export const PlayListItemPage = (props : Props) =>{

    const dispatch = useDispatch()

    const handlePlaylist = async (value : Item) => {
            // console.log(value);
        const tracks = await getPlaylistTracks(props.accessToken,value.id,5)

            const hide = message.loading('', 0);
        // Dismiss manually and asynchronously
          setTimeout(hide, 600);
          setTimeout(() => {
            dispatch(renderPlaylists(value))   
            dispatch(renderPlayListDetail(tracks.items)) 
          }, 850);
            
    }

    return (
        
        <li className='flex items-center relative w-[80%] hover:bg-white transition-all p-2 pt-3 mb-2 pb-3 duration-200 ease-out rounded-lg'>
                  <img onClick={()=>handlePlaylist(props.item)} src={props.item.url} className='rounded-full ml-2 cursor-pointer' alt="playlist-img" width={55} height={55} />
                  <p className='ml-2 mb-0  max-w-[12rem] font-sans text-base font-medium cursor-pointer' style={{color : '#8B8A8D'}} onClick={()=>handlePlaylist(props.item)}>{props.item.name}</p>
                  <h3 className="ml-6 p-2 rounded-lg absolute right-[10%] cursor-pointer w-[25px] h-[25px]" >{!props.item.toggleLike ? heart : heart_active}</h3>
        </li>
    )
}
