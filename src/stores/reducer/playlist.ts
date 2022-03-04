import { CreateMyPlaylist } from '../../lib/controllers';
import { Track } from '../../pages';
import { addTrackMyPlayList, getPlayListDetail } from '../../lib/controllers';
import { MyPlaylistDetail } from '../../pages/components/playlist-banner';

interface InitialState {
    MyPlayList : object[],
    MyTrackPlaylist : Track[],
    MyPlayListDetail : MyPlaylistDetail,
    TrackSong : number[]

}

type Action = {
    type : string,
    payload : any
}

export const playlistReducers = (
    state: InitialState = {
        MyPlayList : [],
        MyTrackPlaylist : [],
        MyPlayListDetail : {
            name : '',
            tracksMusic : []
        },
        TrackSong : []
    },
    action : Action
) => {
    switch(action.type){
        
        case 'CREATE_MY_PLAYLIST':{
            // console.log(action.payload);
 
            CreateMyPlaylist(action.payload)
            return state;
        } 
        case 'GET_PLAYLIST_DETAIL_TRACK':{
            const newList : number[] = []
            // console.log(action.payload);
            action.payload.tracksMusic.map((item : Track) =>{
                return newList.push(item.duration_ms)     
            }
            )

            return{
                ...state,
                MyPlayListDetail : action.payload,
                TrackSong : [...newList]

            };
            
            
        } 
        case 'GET_PLAYLIST_DETAIL':{

            window.location.href = '/my-playlists/' + action.payload._id
            return state;
        } 
        case 'GET_ALL_PLAYLIST':{

            return {
                ...state,
                MyPlayList : action.payload
            };
        } 

        case 'ADD_TRACK_PLAYLIST':{
            
            const detailSelected : Track = {
                id : action.payload.id,
                album : action.payload.album,
                artists :action.payload.artists,
                external_urls : action.payload.external_urls,
                name : action.payload.name,
                duration_ms : action.payload.duration_ms,
                togglePlay : false,
                toggleLike : false
            } 
            addTrackMyPlayList(detailSelected);
            return state;
        } 
        
        default:
            return state;
    }
}