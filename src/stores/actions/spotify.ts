
export const renderCategory = (value : any) =>{
    return {
        type : 'RENDER_CATEGORY',
        payload: value,
    }
}

export const renderPlaylists = (value : any) =>{
    return {
        type : 'RENDER_PLAYLISTS',
        payload: value,
    }
}

export const shortcutsPlaylists = (value : any) =>{
    return {
        type : 'SHORTCUTS_PLAYLISTS',
        payload: value,
    }
}

export const artistID = (value : any) =>{
    return {
        type : 'ARTIST_ID',
        payload: value,
    }
}

export const shortcutsArtists = (value : any) =>{
    return {
        type : 'SHORTCUTS_ARTISTS',
        payload: value,
    }
}

export const renderArtistsDetail = (value : any) =>{
    return {
        type : 'RENDER_ARTISTS_DETAIL',
        payload: value,
    }
}

export const renderArtistsTopTrack = (value : any) =>{
    return {
        type : 'RENDER_ARTISTS_TOP_TRACK',
        payload: value,
    }
}



export const PlayMusic = (value : any) =>{
    return {
        type : 'PLAY_MUSIC',
        payload: value,
    }
}

export const PlayListDetail = (value : any) =>{
    return {
        type : 'PLAYLIST_DETAIL',
        payload: value,
    }
}

export const renderPlayListDetail = (value : any) =>{
    return {
        type : 'RENDER_PLAYLIST_DETAIL',
        payload: value,
    }
}

export const togglePlayMusic = (value : any) =>{
    return {
        type : 'TOGGLE_PLAY_MUSIC',
        payload: value,
    }
}

export const togglePlayMusicAll = (value : any) =>{
    return {
        type : 'TOGGLE_PLAY_MUSIC_ALL',
        payload: value,
    }
}

export const togglePlaySpotifyArtist = (value : any) =>{
    return {
        type : 'TOGGLE_PLAY_SPOTIFY_ARTIST',
        payload: value,
    }
}


