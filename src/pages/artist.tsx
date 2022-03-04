import { Layout, message } from 'antd';
import { useEffect, useState } from "react";
import { NavigationPage } from "./navigation";
import { BoxMusicPage ,ArtistBannerPage } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../stores/reducer/index';
import { getTokenMusic,getArtistDetails,getArtistTopTrack } from '../lib/controllers';
import { renderArtistsDetail, renderArtistsTopTrack } from '../stores/actions/spotify';
import { back } from '../helpers/global';
import { Track } from './home';
import { MusicItemAllPage } from './components/music-item-all';
import { UserPage } from './components/user';
import { SearchPage } from './components/search';


const { Content, Sider } = Layout;


export const ArtistDetialPage = () =>{

    const [toggle, setToggle] = useState<boolean>(false);

    const [accessToken,setAccessToken] = useState<string>('')  

    const dispatch = useDispatch()

    const  listTrack = useSelector((state : State) => state.spotify.ArtistTrack)
  


    const code = window.location.href.split('/')
    const id_artist = code[4]

    useEffect(() => {
        const render = async() =>{
            if(id_artist !== undefined){
              const token = await getTokenMusic()
             if(accessToken !== token)  setAccessToken(token)
            const artist = await getArtistDetails(token,id_artist) 
            // console.log(artist);
              const track = await getArtistTopTrack(token , artist.id, 'VN')
              dispatch(renderArtistsTopTrack(track))
              
              return dispatch(renderArtistsDetail(artist))
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
                <ArtistBannerPage />
  
          </div>
          <div className="contents ">
            <div className="contents__name mt-6 ml-10 flex items-center mb-4 justify-between w-[57%]">
              <h3 className="font-sans text-3xl font-semibold">Tracks</h3>
              {/* <p
                style={{ color: "#8B8A8D" }}
                className="font-sans text-base font-medium cursor-pointer "
              >
                Hiển thị tất cả
              </p> */}
            </div>
            <table className="table w-[95%] ml-10 mb-20">
              <thead className="border-b-0  font-sans text-sm font-medium uppercase "  style={{ color: "#8b8a8d92" }}>
              <tr >
                  <th className="border-0 w-[70px] text-center" scope="col">#</th>
                  <th className="border-0 w-[30%]" scope="col">Title</th>
                  <th className="border-0  " scope="col">artist</th>
                  <th className="border-0 text-left" scope="col">time</th>
                  <th className="border-0" scope="col">album</th>
              </tr>
              </thead>
              <tbody>
              {
                listTrack.length !== 0 ? (
                  listTrack.map((item : Track ,key : number) =>
                    <MusicItemAllPage  item={item} key={item.id} index={key} />
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

