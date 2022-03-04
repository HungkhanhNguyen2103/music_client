import { message } from 'antd';
import { CategoryItem  ,Track} from '../../pages';
import { Item  , Artists} from '../../pages/components';
import { PlayListsDetail } from '../../pages/home';





interface InitialState {
    CategoryList: CategoryItem[];
    PlayListItem : Item;
    PlayList_ShortCut : Item[];
    UrlMusic : string;
    IdPlaylistDetail : string;
    ArtistID : string[];
    ArtistDetail : Artists;
    ArtistTrack : Track[];
    Artist_ShortCut : Artists[];
    Playlists: PlayListsDetail[]
    PlaylistsAll: PlayListsDetail[]
    CategoryTitle : string,
    HTTP_detail : string
}

type Action = {
    type : string,
    payload : any
}

export const spotifyReducers = (
    state: InitialState = {
        CategoryList : [],
        PlayList_ShortCut : [],
        ArtistID : [],
        Artist_ShortCut : [],
        ArtistDetail : {
            id : '',
            external_urls : {
            spotify : '',
            },
            name : '',
            images : [],
            followers : {
                total : 0
             },
            popularity : 0,
            toggleFollower : false
        },
        ArtistTrack : [],
        PlayListItem : {
            id : '',
            name : '',
            url : '',
            track : '',
            followers : 0,
            toggleLike : false
        },
        UrlMusic : '',
        CategoryTitle : '',
        IdPlaylistDetail : '',
        Playlists : [],
        PlaylistsAll : [],
        HTTP_detail : ''
 
    },
    action : Action
) => {
    switch(action.type){
        case 'RENDER_CATEGORY':{
            // console.log(action.payload);
            
            const newList = [...action.payload]
            return {
                ...state,
                CategoryList : newList,
                CategoryTitle : newList[0].id
            };
        }
        case 'SHORTCUTS_ARTISTS':{
            // console.log(action.payload);

            return {
                ...state,
                Artist_ShortCut : action.payload
            };
        }
        case 'SHORTCUTS_PLAYLISTS':{
            // console.log(action.payload);
            const newList : Item[] = []
            if(action.payload[0].followers !== undefined){
                action.payload.map((item : any) => {
                const newItem : Item = {
                    id : item.id,
                    name : item.name,
                    url : item.images[0].url,
                    track : item.external_urls.spotify,
                    followers : item.followers.total,
                    toggleLike : false
                }
                return newList.push(newItem)
                
            })
            }
            else{
                action.payload.map((item : any) => {
                    const newItem : Item = {
                        id : item.id,
                        name : item.name,
                        url : item.images[0].url,
                        track : item.external_urls.spotify,
                        followers : 0,
                        toggleLike : false
                    }
                    return newList.push(newItem)
                })

            }
            return {
                ...state,
                PlayList_ShortCut : [...newList]
            };
        }
        case 'ARTIST_ID':{

            return {
                ...state,
                ArtistID : action.payload
            };
        }  
        case 'RENDER_ARTISTS_TOP_TRACK':{
    
        const listTrack : Track[] = []
            action.payload.map((item : Track) => {
                    const detail : Track = {
                        id : item.id,
                        album : item.album,
                        external_urls : item.external_urls,
                        artists : item.artists,
                        name : item.name,
                        duration_ms : item.duration_ms,
                        toggleLike : false,
                        togglePlay : false
                    }
                   return listTrack.push(detail) 
            })
            return {
                ...state,
                ArtistTrack : [...listTrack]
            };
        }
        case 'RENDER_ARTISTS_DETAIL':{

            return {
                ...state,
                ArtistDetail : action.payload
            };
        }  
        case 'RENDER_PLAYLISTS':{
            console.log(action.payload);
            
            if(action.payload.items !== undefined){
                if(action.payload.items[0].followers){
                    const newItem : Item = {
                        id : action.payload.items[0].id,
                        name : action.payload.items[0].name,
                        url : action.payload.items[0].images[0].url,
                        track : action.payload.items[0].external_urls.spotify,
                        followers : action.payload.items[0].followers.total,
                        toggleLike : false
                    }
                    return {
                        ...state,
                        PlayListItem : newItem,
                        CategoryTitle : action.payload.idCategory
                    };  
                }
                else {
                    const newItem : Item = {
                        id : action.payload.items[0].id,
                        name : action.payload.items[0].name,
                        url : action.payload.items[0].images[0].url,
                        track : action.payload.items[0].external_urls.spotify,
                        followers : 0,
                        toggleLike : false
                    }
                    return {
                        ...state,
                        PlayListItem : newItem,
                        CategoryTitle : action.payload.idCategory
                    };  
                }  
            }
                const newItem : Item = {
                    id : action.payload.id,
                    name : action.payload.name,
                    url : action.payload.images[0].url ,
                    track : action.payload.external_urls.spotify,
                    followers : action.payload.followers.total,
                    toggleLike : false
                }
                return {
                    ...state,
                    PlayListItem : newItem,
                    CategoryTitle : action.payload.idCategory
                };   
    
        }
        case 'PLAY_MUSIC':{
            return {
                ...state,
                UrlMusic : action.payload,
            };
        }   
        case 'PLAYLIST_DETAIL':{

            return {
                ...state,
                IdPlaylistDetail : action.payload,
                PLaylists : [...state.Playlists]
            };
        }
        case 'RENDER_PLAYLIST_DETAIL':{
            // console.log(action.payload);
            const listTrack : PlayListsDetail[] = []
            action.payload.map((item : PlayListsDetail) => {
                    const detail : PlayListsDetail = {
                        added_at : item.added_at,
                        track : item.track,
                        togglePlay : false,
                        toggleLike : false
                    }
                   return listTrack.push(detail) 
            })
            return {
                ...state,
                Playlists : [...listTrack],
            };
        }
        case 'TOGGLE_PLAY_MUSIC':{

                const checkPlayAll : boolean = state.Playlists.every((item : PlayListsDetail) => item.togglePlay === false)
            // const checkPlay : boolean = state.Playlists.every((item : PlayListsDetail) => item.track.id === action.payload.togglePlay)
            const index = state.Playlists.findIndex((item : PlayListsDetail) => item.track.id === action.payload.track.id)
            const detailSelected : PlayListsDetail = {
                added_at : action.payload.added_at,
                track : action.payload.track,
                togglePlay : true,
                toggleLike : false
            } 
            if(checkPlayAll){
                 state.Playlists.splice(index, 1 , detailSelected)
                // console.log(itemChange);         
            }
            else{
                const itemChange  = state.Playlists.find((item : PlayListsDetail) => item.togglePlay === true)
                const indexChange = state.Playlists.findIndex((item : PlayListsDetail) => item.track.id === itemChange?.track.id)
                const detailSelectedFalse : any = {
                    added_at : itemChange?.added_at,
                    track : itemChange?.track,
                    togglePlay : false,
                    toggleLike : false
                }
                state.Playlists.splice(indexChange, 1 , detailSelectedFalse)
                if(index !== indexChange ){
                    state.Playlists.splice(index, 1 , detailSelected)
                }
 
            }
            
            return {
                ...state,
                Playlists : [...state.Playlists]
            };
        }
        case 'TOGGLE_PLAY_MUSIC_ALL':{
            
            const checkPlayAll : boolean = state.ArtistTrack.every((item : Track) => item.togglePlay === false)
        // const checkPlay : boolean = state.Playlists.every((item : PlayListsDetail) => item.track.id === action.payload.togglePlay)
        const index = state.ArtistTrack.findIndex((item : Track) => item.id === action.payload.id)
        const detailSelected : Track = {
            id : action.payload.id,
            album : action.payload.album,
            artists :action.payload.artists,
            external_urls : action.payload.external_urls,
            name : action.payload.name,
            duration_ms : action.payload.duration_ms,
            togglePlay : true,
            toggleLike : false
        } 
        if(checkPlayAll){
              state.ArtistTrack.splice(index, 1 , detailSelected)
            // console.log(itemChange);         
        }
        else{
            const itemChange  = state.ArtistTrack.find((item : Track) => item.togglePlay === true)
            const indexChange = state.ArtistTrack.findIndex((item : Track) => item.id === itemChange?.id)
            const detailSelectedFalse : any = {
                id : itemChange?.id,
                album : itemChange?.album,
                artists :itemChange?.artists,
                external_urls : itemChange?.external_urls,
                name : itemChange?.name,
                duration_ms : itemChange?.duration_ms,
                togglePlay : false,
                toggleLike : false
            }
            state.ArtistTrack.splice(indexChange, 1 , detailSelectedFalse)
            if(index !== indexChange ){
                state.ArtistTrack.splice(index, 1 , detailSelected)
            }

        }
        
        return {
            ...state,
            ArtistTrack : [...state.ArtistTrack]
        };
    }
    case 'TOGGLE_PLAY_SPOTIFY_ARTIST':{
        const checkPlayAll : boolean = state.ArtistTrack.every((item : Track) => item.togglePlay === false)
        const detailSelected : Track = {
            ...state.ArtistTrack[0],
            togglePlay : true
        }
        if(checkPlayAll){
            state.ArtistTrack.splice(0,1,detailSelected)
        }
        else{
            const itemChange  = state.ArtistTrack.find((item : Track) => item.togglePlay === true)
            const indexChange = state.ArtistTrack.findIndex((item : Track) => item.id === itemChange?.id)
            const detailSelectedFalse : any = {
                ...itemChange,
                togglePlay : false
            }
           if(indexChange !== 0)  state.ArtistTrack.splice(indexChange, 1 , detailSelectedFalse)
           state.ArtistTrack.splice(0,1,detailSelected)
        }
    
    return {
        ...state,
        ArtistTrack : [...state.ArtistTrack]
    };
}
        default:
            return state;
    }
}