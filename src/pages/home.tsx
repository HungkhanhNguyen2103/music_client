import { Layout, message ,Input} from 'antd';
import { useEffect, useState } from "react";
import { NavigationPage } from "./navigation";
import { RightOutlined ,LeftOutlined } from "@ant-design/icons";
import { BoxMusicPage ,CategoryItemPage ,MusicItemPage, PlayListItemPage,BannerPage, ShortcutsPage} from './components';
import { getTokenMusic, getNewReleases, getAllCategory, getCategoryPlaylists, getPlaylistTracks, getTrackDetails } from '../lib/controllers/music';
import { useDispatch, useSelector } from "react-redux";
import { renderCategory } from '../stores/actions';
import { State } from '../stores/reducer';
import { Album ,Artists , UserPage , SearchPage} from './components';
import {AnimationShortCuts} from '../lib/controllers';
import styled from "styled-components";
import axios from 'axios';
import { API_VERIFY_TOKEN } from '../lib/api/user';
import { dataUser } from '../stores/actions/auth';





const { Content, Sider } = Layout;
 
export interface CategoryItem {
  href : string,
  icons : any,
  id : string,
  name : string,
} 

export interface Image{
  url : string
}

export interface Track{
  id : string,
  album : Album,
  artists : Artists[],
  external_urls : {
    spotify : string
  },
  name : string,
  duration_ms : number,
  toggleLike : boolean,
  togglePlay : boolean,
}

export interface PlayListsDetail {
  added_at : string ,
  track : Track,
  togglePlay : boolean
  toggleLike : boolean
}



export const HomePage = () => {


  const [toggle, setToggle] = useState<boolean>(false);

  const [accessToken,setAccessToken] = useState<string>('')  

  const [toggleMoreLists,setToggleMoreLists] = useState<boolean>(false)

  const TrackLists =  useSelector((state : State) => state.spotify.Playlists)


  const IdPlaylistDetail = useSelector((state : State) => state.spotify.IdPlaylistDetail)

 const code = window.location.href.split('/')
 const userAccessToken = code[3]

 
  const dispatch = useDispatch()

  useEffect(() => {
    const render = async() =>{
      const token = await getTokenMusic()
      if(accessToken !== token)  setAccessToken(token)
      const category = await getAllCategory(token)
      // setCategoryItem(category.items);
      dispatch(renderCategory(category.items)) 
      if(userAccessToken !== ''){
        await axios.post(API_VERIFY_TOKEN +  userAccessToken + '/verify-token')
        .then(res =>{
            // console.log(res);
            dispatch(dataUser(res.data.user))
            document.cookie = `id=${res.data.user._id}=${res.data.user.username}; expires= Thu, 21 Aug 2022 20:00:00 UTC`
            window.history.replaceState({},'','/')
          })
          .catch(err => {
            console.log(err);
            // window.location.href = API_URI + '/error'
          }) 
      }
    }
    render();
  }, [])



  const handleMoreLists = () =>{
    setToggleMoreLists(!toggleMoreLists)
    AnimationShortCuts(toggleMoreLists)
  }

  const handleToggle = () => {
    setToggle(!toggle);
  };



  const handleFull = () => {
    const hide = message.loading('', 0);
    setTimeout(hide, 600);
    setTimeout(() => {

    // console.log(TrackLists);
    
        window.location.href =  '/playlist/'  + IdPlaylistDetail
    }, 850);
  }

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
          <NavigationPage  handleToggle={handleToggle} toggle={toggle} />
          
        </Sider>
        <Content
          style={{
            padding: "0 24px",  
            backgroundColor: "#F4F5FE",
          }}
        >
          <div className="flex ml-10">
            <div className="banner mt-4 rounded-xl">
              <div className="flex justify-between">
              <div className="w-[8rem] duration-300 ease-out focus-within:w-[20rem] p-0 mb-4">
                  <SearchPage accessToken={accessToken}/>
              </div>
                  <UserPage/>
              </div>
            
              <p
                style={{ color: "#8B8A8D" }}
                className="font-sans text-base font-medium mb-1"
              >
                Có gì mới
              </p>
              <div className="banner__text flex items-center justify-between mb-2">
                <h3 className="font-sans text-3xl font-semibold">Xu hướng</h3>
                    <p
                      style={{ color: "#8B8A8D" }}
                      onClick={handleMoreLists}
                      className="m-0 flex items-center font-sans text-base font-medium cursor-pointer"
                      >
                       {!toggleMoreLists ? (
                         <>Thêm <RightOutlined className="mt-1 text-xs" /></>  
                       ) : (
                          <><LeftOutlined id="button-shortcut" className="mt-1 text-xs " /> Thu gọn</>
                       )
                      }
                      </p>
              </div>
                <BannerPage accessToken={accessToken}/>
            </div>
              <ShortcutsPage accessToken={accessToken}  toggleMoreLists={toggleMoreLists}/>
          </div>
          <div className="contents ">
            <div className="contents__name mt-6 ml-10 flex items-center justify-between w-[57%]">
              <h3 className="font-sans text-3xl font-semibold">PlayLists</h3>
              <p
              onClick={handleFull}
                style={{ color: "#8B8A8D" }}
                className="font-sans text-base font-medium cursor-pointer "
              >
                Hiển thị tất cả
              </p>
            </div>
            <table className="table w-[57%] ml-10 mb-20">
              <thead className="border-b-0  font-sans text-sm font-medium uppercase "  style={{ color: "#8b8a8d92" }}>
              <tr >
                  <th className="border-0 w-[70px] text-center" scope="col">#</th>
                  <th className="border-0 w-[40%]" scope="col">Title</th>
                  <th className="border-0  " scope="col">artist</th>
                  <th className="border-0 text-center" scope="col">time</th>
                  <th className="border-0" scope="col">album</th>
              </tr>
              </thead>
              <tbody>
              {
                TrackLists.length !== 0 ? (
                  TrackLists.map((item : PlayListsDetail ,key : number) =>
                    <MusicItemPage  item={item} key={key} index={key} />
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
  );
};

