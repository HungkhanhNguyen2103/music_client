import { useSelector } from 'react-redux';
import { State } from '../../stores/reducer';
import { useEffect } from 'react';
export const BoxMusicPage = () => {


  const urlMusic = useSelector((state : State) => state.spotify.UrlMusic)

  const srcMusic = urlMusic.replace("https://open.spotify.com","https://open.spotify.com/embed")
  


  return (
      <>
      <iframe id='box-music' className="fixed w-full h-[80px] bottom-0 left-0" src={srcMusic} frameBorder={0}  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
      </>
  );
};

