import { API_SEARCH,API_TOKEN, CLIENT_ID, CLIENT_SECRET, API_CATEGORIES, API_NEW_RELEASES ,API_PLAYLIST_DETAILS ,API_ARTIST_DETAILS} from '../api/music';

export const getTokenMusic = async () => {
  try {
    const result = await fetch(API_TOKEN , {
        method : 'POST',
        headers : {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization':"Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        },
        body : `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

    })
    const data = await result.json()
    return data.access_token;

  } catch {
    console.log("connect fail !");
  }

};


export const getNewReleases = async (token : string) =>{
  try{
    const result = await fetch(API_NEW_RELEASES, {
      method : 'GET',
      headers : {
        'Authorization':'Bearer ' + token,
    },
  })
    const data = await result.json()
    return data;
  } catch {
    console.log("connect fail !");
  }

}

//All Playlists
export const getAllCategory = async (token : string ) =>{
  try{
    const result = await fetch(`${API_CATEGORIES}?limit=9&country=VN` , {
      method : 'GET',
      headers : {
        'Authorization':'Bearer ' + token,
    },
  })
    const data = await result.json()
    return data.categories;
  } catch {
    console.log("connect fail !");
  }
}



//Category Playlists
export const getCategoryPlaylists = async (token : string , category_id : string , limit : number , country : string) =>{
  try{
    const result = await fetch(`${API_CATEGORIES + '/' + category_id}/playlists?limit=${limit}&country=${country}` , {
      method : 'GET',
      headers : {
        'Authorization':'Bearer ' + token,
    },
  })
    const data = await result.json()
    return data.playlists;
  } catch {
    console.log("connect fail !");
  }
}

// Playlist Details
export const getPlaylistsDetails = async (token : string , playlist_id : string, limit : number) =>{
  try{
    const result = await fetch(`${API_PLAYLIST_DETAILS}/${playlist_id}?limit=${limit}` , {
      method : 'GET',
      headers : {
        'Authorization':'Bearer ' + token,
    },
  })
    const data = await result.json()
    return data;
  } catch {
    console.log("connect fail !");
  }
}

  //Artist Details
  export const getArtistDetails = async (token : string , id_artist : string) =>{
    try{
      const result = await fetch(`${API_ARTIST_DETAILS+ '/' + id_artist}` , {
        method : 'GET',
        headers : {
          'Authorization':'Bearer ' + token,
      },
    })
      const data = await result.json()
      return data;
    } catch {
      console.log("connect fail !");
    }
  } 

  export const getArtistTopTrack = async (token : string , id_artist : string, country : string) =>{
    try{
      const result = await fetch(`${API_ARTIST_DETAILS+ '/' + id_artist}/top-tracks?country=${country}` , {
        method : 'GET',
        headers : {
          'Authorization':'Bearer ' + token,
      },
    })
      const data = await result.json()
      return data.tracks;
    } catch {
      console.log("connect fail !");
    }
  } 


  //Artist Details
  export const getTrackDetails = async (token : string ) =>{
    const id = '3USxtqRwSYz57Ewm6wWRMp'
    try{
      const result = await fetch(`https://api.spotify.com/v1/tracks/${id}?market=VN` , {
        method : 'GET',
        headers : {
          'Authorization':'Bearer ' + token,
      },
    })
      const data = await result.json()
      return data;
    } catch {
      console.log("connect fail !");
    }
  } 


//Playlist Tracks  
export const getPlaylistTracks  = async (token : string , playlist_id : string ,limit : number ) =>{
  try{
    const result = await fetch(`${API_PLAYLIST_DETAILS + '/' + playlist_id }/tracks?limit=${limit}&country=VN` , {
      method : 'GET',
      headers : {
        'Authorization':'Bearer ' + token,
    },
  })
    const data = await result.json()
    return data;
  } catch {
    console.log("connect fail !");
  }
} 

//search
export const getSearch  = async (token : string , query : string ,limit : number ,market : string) =>{
  try{
    const result = await fetch(`${API_SEARCH}?limit=${limit}&q=${query}&market=${market}&type=track` , {
      method : 'GET',
      headers : {
        'Authorization':'Bearer ' + token,
    },
  })
    const data = await result.json()
    return data.tracks;
  } catch {
    console.log("connect fail !");
  }
} 
