export const createMyPlaylist = (value : any) =>{
    return {
        type : 'CREATE_MY_PLAYLIST',
        payload : value,
    }
}

export const addTrackPlaylist = (value : any) =>{
    return {
        type : 'ADD_TRACK_PLAYLIST',
        payload : value,
    }
}

export const getAllMyPlaylists = (value : any) =>{
    return {
        type : 'GET_ALL_PLAYLIST',
        payload : value,
    }
}


export const getMyPlaylistDetail = (value : any) =>{
    return {
        type : 'GET_PLAYLIST_DETAIL',
        payload : value,
    }
}

export const getMyPlaylistDetailTrack = (value : any) =>{
    return {
        type : 'GET_PLAYLIST_DETAIL_TRACK',
        payload : value,
    }
}
