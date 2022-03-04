import { useState } from "react";
import {
  heart,
  musicNote,
  zoomOut,
  repeat,
  prev,
  pause,
  play,
  random,
  soundMax,
  soundMin,
} from "../../helpers/global";

import { Slider, Col } from "antd";
import styled from "styled-components";


export const BoxMusicPage = () => {
  const [toggleStart, setToggleStart] = useState<boolean>(true);


  const handleStart = () => {
      setToggleStart(!toggleStart);
  }; 

  const [timeValue,setTimeValue] = useState<Number>(0)

  const actionTimeMusic = () =>{
    // setTimeValue()
  }

  return (
    <BoxMusic className="w-[57%] ml-10 bg-white rounded-xl mb-4 mt-6" >
      <div className="music-box flex justify-between items-center w-full">
        <div className="react flex mt-3">
          <h3 className="ml-6 p-2 rounded-lg" style={{backgroundColor : '#F4F5FE' }}>{heart}</h3>
          <h3 className="ml-4 p-2 rounded-lg" style={{backgroundColor : '#F4F5FE'}}>{musicNote}</h3>
          <h3 className="ml-4 p-2 rounded-lg" style={{backgroundColor : '#F4F5FE'}}>{zoomOut}</h3>
        </div>
        <div className="function flex items-center mt-3 relative">
          <h3 className="ml-2 mr-2">{repeat}</h3>
          <h3 className="ml-2 mr-2">{prev}</h3>
          <h3  className="cursor-pointer w-[20%] ml-2 mr-2">
            {!toggleStart ? pause : play}
          </h3>

          <h3 className="rotate-180 ml-2 mr-2">{prev}</h3>
          <h3 className="ml-2 mr-2">{random}</h3>
        </div>
        <div className="volume flex items-center mt-3 mr-6">
          <h3 className="mr-1">{soundMin}</h3>
          <Col span={12} >
            <Slider
              min={0}
              max={100}
              className="w-[60px] mt-1"
              // onChange={this.onChange}
              // value={typeof inputValue === 'number' ? inputValue : 0}
            />
          </Col>
          <h3 className="ml-3">{soundMax}</h3>
        </div>
      </div>
      <div className="time block flex items-center justify-center pb-2 mt-2 w-full">
      <h3 className="mr-4">12:23</h3>
        <Col className="w-[78%]">       
          <Slider
            min={0}
            max={100}
            className="w-full mt-1 "
            // onChange={actionTimeMusic}
            // value={typeof timeValue === 'number' ? timeValue : 0}
          />
        </Col>
        <h3 className="ml-4">14:29</h3>
      </div>
    </BoxMusic>
  );
};

const BoxMusic= styled.div`
    & h3{
        cursor: pointer;
    }
`