import { Layout, message } from 'antd';
import { useEffect, useState } from "react";
import { NavigationPage } from "./navigation";
import { BoxMusicPage  } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../stores/reducer/index';
import { getTokenMusic,getArtistDetails,getArtistTopTrack } from '../lib/controllers';
import { renderPlaylists, renderPlayListDetail } from '../stores/actions/spotify';
import { back } from '../helpers/global';
import { Track, PlayListsDetail } from './home';
import { MusicItemAllPage } from './components/music-item-all';
import { PlayListBannerPage } from './components';
import { getPlaylistTracks, getPlaylistsDetails, getNewReleases, getCategoryPlaylists } from '../lib/controllers/music';
import { MusicItemPlaylistPage } from './components/music-item-playlist';
import axios from 'axios';
import { API_PLAYLIST } from '../lib/api/playlist';
import { getMyPlaylistDetailTrack } from '../stores/actions/playlist';
import { MusicItemMyPlaylistPage } from './components/music-item-my-playlist';
import { MyPlaylistDetail } from './components/playlist-banner';
import { SearchPage } from './components/search';
import { UserPage } from './components/user';

const { Content, Sider } = Layout;

export const PlayListAllPage = () =>{
    const [toggle, setToggle] = useState<boolean>(false);

    const [toggleAdd, setToggleAdd] = useState<boolean>(false);

    const [accessToken,setAccessToken] = useState<string>('')  

    const dispatch = useDispatch()

    const  Playlists = useSelector((state : State) => state.spotify.Playlists)

    const MyPlayListDetail = useSelector((state : State) => state.playlist.MyPlayListDetail)

 

    const code = window.location.href
    
    useEffect(() => {
        const render = async() =>{
          if(code.search('my-playlists') === -1){
              const word = code.split('/')
              const id_playlist = word[4]
              if(id_playlist !== '' ){
                const token = await getTokenMusic()
               if(accessToken !== token)  setAccessToken(token)
                  const playlistTrack = await getPlaylistTracks(token,id_playlist,20)
                  const playlistdetail = await getPlaylistsDetails(token,id_playlist,1)
                  // console.log(playlistTrack.items);
                  setToggleAdd(false)
                  dispatch(renderPlaylists(playlistdetail))
                  dispatch(renderPlayListDetail(playlistTrack.items))
          }
          }
          if(code.search('my-playlists') === 22){
              const word = code.split('/')
              const id_my_playlist = word[4]
              if(id_my_playlist !== ''){
                const token = await getTokenMusic()
                if(accessToken !== token)  setAccessToken(token)
                const playlist = await getCategoryPlaylists(token,'toplists',1,'VN')
                const tracks = await getPlaylistTracks(token, playlist.items[0].id,30)
                setToggleAdd(true)
                dispatch(renderPlayListDetail(tracks.items))

                await axios.get(API_PLAYLIST + id_my_playlist + '/track')
                .then(res => {
                  dispatch(getMyPlaylistDetailTrack(res.data))
                })
                .catch(err => {
                  console.log(err);
                })

              }

          } 
        }
        render()
    }, [])
    
    const handleBack = () =>{
      window.history.back()
    }

    const handleToggle = () => {
        setToggle(!toggle);
      };

    return (
        <>
    
      <Layout>
        <Sider
          width={270}
          trigger={null}
          collapsible
          collapsed={toggle}
          className="site-layout-background bg-white"
        >
          <NavigationPage handleToggle={handleToggle} toggle={toggle} />
          
        </Sider>
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
            backgroundColor: "#F4F5FE",
          }}
        >
          <div className="flex ml-10 relative" >
                
                <div className='w-[20px] h-[20px] absolute top-[6%] cursor-pointer' onClick={handleBack}>{back}</div>
                <div className="absolute top-[6%] right-[10%]"><UserPage/></div>
                <div className="w-[8rem] absolute duration-300 ease-out left-[30%] focus-within:w-[20rem] top-[6%] p-0 mb-4">
                  <SearchPage accessToken={accessToken}/>
               </div>
                <PlayListBannerPage MyPlayListDetail={MyPlayListDetail}/>
  
          </div>
          <div className="contents my-playlist">

            <div className="contents__name mt-6 ml-10 flex items-center mb-4 justify-between w-[57%]">

            </div>
            {
              code.search('my-playlists') === 22 ? (
                <table className="table w-[95%] ml-10 mb-2">
              <thead className="border-b-0  font-sans text-sm font-medium uppercase "  style={{ color: "#8b8a8d92" }}>
              <tr >
                  <th className="border-0 w-[70px] text-center" scope="col">#</th>
                  <th className="border-0 w-[30%]" scope="col">Title</th>
                  <th className="border-0  " scope="col">artist</th>
                  <th className="border-0 text-left" scope="col">time</th>
                  <th className="border-0" scope="col">album</th>
                  <th className="border-0" scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {
                MyPlayListDetail.tracksMusic !== 0 ? (
                  MyPlayListDetail.tracksMusic.map((item : Track ,key : number) =>
                    <MusicItemMyPlaylistPage toggleAdd={toggleAdd}  item={item} key={key} index={key} />
                    )
                ) : (
                    <tr><th>No data</th></tr>
                )
            }
              </tbody>
            </table>
              ) : (
                <></>
              )
            }
          </div>
          <div className="contents ">
            <div className="contents__name mt-6 ml-10 flex items-center mb-4 justify-between w-[57%]">
              {
                code.search('my-playlists') === -1 ? (
                  <h3 className="font-sans text-3xl font-semibold">Tracks</h3>
                ) : (
                  <h3 className="font-sans text-3xl font-semibold">Recommend</h3>
                )
              }

            </div>
            <table className="table w-[95%] ml-10 mb-20">
              <thead className="border-b-0  font-sans text-sm font-medium uppercase "  style={{ color: "#8b8a8d92" }}>
              <tr >
                  <th className="border-0 w-[70px] text-center" scope="col">#</th>
                  <th className="border-0 w-[30%]" scope="col">Title</th>
                  <th className="border-0  " scope="col">artist</th>
                  <th className="border-0 text-left" scope="col">time</th>
                  <th className="border-0" scope="col">album</th>
                  <th className="border-0" scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {
                Playlists.length !== 0 ? (
                  Playlists.map((item : PlayListsDetail ,key : number) =>
                    <MusicItemPlaylistPage toggleAdd={toggleAdd}  item={item} key={key} index={key} />
                    )
                ) : (
                    <tr><th>No data</th></tr>
                )
            }
              </tbody>
            </table>
          </div>
            <BoxMusicPage/>

        </Content>
      </Layout>
    </>
    )
}