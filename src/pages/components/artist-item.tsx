import { play_artist } from '../../helpers/global';
import { Artists } from './artist';
import { useDispatch } from 'react-redux';
import { PlayMusic, renderPlayListDetail } from '../../stores/actions';
import { getArtistTopTrack } from '../../lib/controllers/music';
import { message } from 'antd';
import { renderArtistsDetail } from '../../stores/actions/spotify';


interface Props {
    item : Artists,
    accessToken : string
}

export const ArtistItemPage = (props : Props) => {
  

    const dispatch = useDispatch()

    const handlePlay = (value : Artists) => {
            dispatch(PlayMusic(value.external_urls.spotify))    
    }

    const handleArtist = async (value : Artists) =>{
        // console.log(value);
        // 
        const hide = message.loading('', 0);
        setTimeout(hide, 600);
        setTimeout(() => {
        //   dispatch(renderPlaylists(payload)) 
            window.location.href ='/artist/' + value.id
        }, 850);
  
            
    }

    return (
        <li className='flex items-center relative w-[80%] hover:bg-white transition-all p-2 pt-3 mb-2 pb-3 duration-200 ease-out rounded-lg'>
                <div className='bg-cover w-[55px] h-[55px] flex items-center  ml-2 cursor-pointer' onClick={()=>handleArtist(props.item)} ><img  src={props.item.images[0].url} className='w-full h-full rounded-lg' alt="playlist-img"  /></div>
                  <div>
                        <p onClick={()=>handleArtist(props.item)} className='ml-2 mb-0  max-w-[12rem] font-sans text-base font-medium cursor-pointer' style={{color : '#8B8A8D'}} >{props.item.name}</p>
                        <p className='ml-2 mb-0  max-w-[12rem] font-sans text-sm font-extralight' style={{color : '#8B8A8D'}} >{props.item.followers.total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} người theo dõi</p>
                  </div>
                  <h3 onClick={()=>handlePlay(props.item)}  className="ml-6 p-2 rounded-lg absolute right-[10%] cursor-pointer  mt-2 ml-4" >{play_artist}</h3>
        </li>
                
    )
}