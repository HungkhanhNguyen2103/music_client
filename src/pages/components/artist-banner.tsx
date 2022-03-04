import styled from 'styled-components';
import { Artists } from './artist';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../stores/reducer/index';
import { PlayMusic } from '../../stores/actions';
import { togglePlaySpotifyArtist } from '../../stores/actions';



export const ArtistBannerPage = () =>{

    const ArtistDetail = useSelector((state : State) => state.spotify.ArtistDetail)

    const dispatch = useDispatch()

    const handlePlay = () =>{
     
     if(ArtistDetail.external_urls.spotify !== ''){
       dispatch(PlayMusic(ArtistDetail.external_urls.spotify))
      //  dispatch(togglePlaySpotifyArtist(ArtistDetail))
     }

    }
    
    return (
        <>
        <div className="banner__name relative h-[260px] mt-20">
        <BannerBackground className="absolute w-full h-full rounded-lg pt-20 pl-8">
                <p
                  style={{ color: "#8B8A8D" }}
                  className="font-sans text-base font-medium mb-1"
                >
                 Nghệ sĩ
                </p>
                    <h3 className="font-sans text-3xl font-semibold capitalize max-w-[15rem] mt-2 min-h-[40px]">
                        {ArtistDetail.name !== '' ? (ArtistDetail.name) :('')} 
                    </h3>
                    <div className="flex mt-2 ">
                      <button onClick={handlePlay}  className="banner__play text-center uppercase pt-[0.4rem] pb-[0.4rem] pl-6 pr-6 text-white font-normal rounded-full mt-2 ">play</button>
                      <button className="banner__follow text-center ml-4 uppercase pt-[0.3rem] pb-[0.3rem] pl-6 pr-6  font-medium rounded-full mt-2">follow</button>
                    </div>
        </BannerBackground> 
        <img
        className="rounded-lg h-full border-gray-400 "
        src={ArtistDetail.images.length !== 0 ? (ArtistDetail.images[0].url) :('')} 
        width={400}
        alt="banner"
      /> 
    </div>
    <div className="absolute bottom-0 left-[36%]">
                    <h3 className="font-sans text-5xl font-semibold mb-2 capitalize min-h-[40px]">
                    {ArtistDetail.name !== '' ? (ArtistDetail.name) :('')} 
                    </h3>
                <p
                  style={{ color: "#8B8A8D" }}
                  className="font-sans text-base font-medium mb-1"
                >
                 {ArtistDetail.followers.total !== 0 ? (ArtistDetail.followers.total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) : (0)} lượt theo dõi
                </p>
      </div>
    </>
    )
}

const BannerBackground= styled.div`
  background-image:  linear-gradient( to right, #fffffffb,  #ffffff2b);
  & .banner__play{
    background-color: #15111E ;
  } 
  & .banner__follow{
    border: 2px solid #15111E;
    color : #15111E;
  }
`