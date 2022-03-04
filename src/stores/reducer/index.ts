import { combineReducers } from "redux";
import { authReducers } from './auth';
import { spotifyReducers } from './spotify';
import { playlistReducers } from './playlist';


export const rootReducer = combineReducers({
    auth : authReducers,
    spotify : spotifyReducers,
    playlist : playlistReducers
})

export type State = ReturnType<typeof rootReducer>