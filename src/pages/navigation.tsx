import {
    MenuFoldOutlined,
    HomeOutlined,
    HistoryOutlined,
    PlusCircleOutlined,
    HeartOutlined,
    MenuUnfoldOutlined 
  } 
from "@ant-design/icons";

import { Menu ,List,Divider,message } from 'antd';
import { NavLink} from 'react-router-dom';
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMyPlaylist } from '../stores/actions';
import axios from 'axios';
import { API_PLAYLIST } from '../lib/api/playlist';
import { State } from '../stores/reducer/index';
import { getAllMyPlaylists, getMyPlaylistDetail } from '../stores/actions';
import { getNamePlaylist } from '../helpers/spotify';




interface Props {
    toggle : boolean,
    handleToggle : any,

}

interface MenuName {
    home : string,
    search : string,
    history : string,
    playlist : string,
    liked : string
}

export interface MyPlaylist{
  name : string,
  owner : any

}

export const NavigationPage= (props : Props) => {

    
  const dataPlaylist = useSelector((state : State) => state.playlist.MyPlayList)

  const words = document.cookie.split('=')
  const id = words[1]
  


  const [count,setCount] =useState<number>(0)


  

  const dispatch = useDispatch()

    const menuName : MenuName = {
        home : 'Trang chủ',
        search : 'Tìm kiếm',
        history : 'Lịch sử của bạn',
        playlist : 'Tạo playlist',
        liked : 'Bài hát đã thích'
    }

    const logoNav  = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="130"
          height="30"
          viewBox="74.428 1369.145 9772.44 2931.018"
        >
          <path
            fill="#2EBD59"
            d="M1539.928 1369.145c-809.356 0-1465.5 656.126-1465.5 1465.482 0 809.443 656.144 1465.535 1465.5 1465.535 809.392 0 1465.5-656.091 1465.5-1465.535 0-809.304-656.074-1465.412-1465.518-1465.412l.018-.07zm672.069 2113.646c-26.32 43.173-82.565 56.7-125.598 30.397-344.137-210.332-777.297-257.845-1287.421-141.312-49.157 11.271-98.157-19.547-109.356-68.688-11.253-49.157 19.424-98.157 68.704-109.356 558.249-127.628 1037.101-72.695 1423.378 163.344 43.05 26.426 56.699 82.601 30.275 125.65l.018-.035zm179.374-398.981c-33.145 53.777-103.46 70.647-157.167 37.624-393.837-242.094-994.384-312.217-1460.32-170.781-60.428 18.252-124.25-15.803-142.59-76.125-18.2-60.428 15.873-124.128 76.195-142.503 532.227-161.489 1193.865-83.265 1646.239 194.723 53.726 33.075 70.7 103.425 37.625 157.079l.018-.017zm15.4-415.52c-472.395-280.542-1251.599-306.337-1702.556-169.47-72.414 21.962-148.994-18.918-170.939-91.333-21.945-72.449 18.9-148.977 91.367-170.992 517.667-157.149 1378.229-126.787 1922.022 196.035 65.135 38.657 86.503 122.779 47.897 187.827-38.5 65.135-122.85 86.607-187.774 47.933h-.017zM4061.569 2722.05c-253.033-60.34-298.078-102.689-298.078-191.678 0-84.069 79.152-140.646 196.857-140.646 114.1 0 227.237 42.962 345.852 131.407 3.588 2.678 8.086 3.744 12.513 3.045 4.428-.665 8.348-3.098 10.938-6.755l123.55-174.16c5.075-7.175 3.692-17.062-3.15-22.54-141.172-113.277-300.142-168.35-485.956-168.35-273.21 0-464.047 163.957-464.047 398.545 0 251.562 164.622 340.637 449.102 409.394 242.13 55.772 282.993 102.498 282.993 186.025 0 92.557-82.636 150.097-215.618 150.097-147.699 0-268.169-49.752-402.937-166.46-3.342-2.888-7.928-4.199-12.162-3.954-4.463.367-8.541 2.432-11.375 5.845l-138.53 164.867c-5.81 6.842-5.075 17.062 1.646 22.978 156.799 139.982 349.648 213.92 557.759 213.92 294.401 0 484.644-160.86 484.644-409.832.525-210.175-125.299-326.55-433.474-401.52l-.527-.228zM5161.617 2472.5c-127.609 0-232.277 50.26-318.587 153.247v-115.92c0-9.152-7.42-16.607-16.555-16.607h-226.572c-9.152 0-16.555 7.455-16.555 16.607V3797.86c0 9.152 7.402 16.607 16.555 16.607h226.572c9.135 0 16.555-7.454 16.555-16.607v-406.577c86.328 96.88 191.013 144.218 318.587 144.218 237.107 0 477.138-182.524 477.138-531.439.35-349.002-239.75-531.579-476.875-531.579l-.263.017zm213.675 531.562c0 177.678-109.445 301.665-266.158 301.665-154.926 0-271.791-129.623-271.791-301.665 0-172.024 116.865-301.664 271.791-301.664 154.176-.018 266.176 126.822 266.176 301.646l-.018.018zM6253.966 2472.5c-305.357 0-544.582 235.13-544.582 535.359 0 296.957 237.58 529.619 540.837 529.619 306.442 0 546.401-234.342 546.401-533.417 0-298.042-238.35-531.526-542.674-531.526l.018-.035zm0 834.994c-162.418 0-284.865-130.498-284.865-303.52 0-173.758 118.213-299.845 281.119-299.845 163.468 0 286.737 130.497 286.737 303.642 0 173.723-118.999 299.723-282.975 299.723h-.016zM7448.688 2493.221h-249.322v-254.905c0-9.135-7.385-16.59-16.537-16.59h-226.537c-9.17 0-16.607 7.455-16.607 16.59v254.905h-108.938c-9.117 0-16.503 7.454-16.503 16.607v194.722c0 9.135 7.386 16.607 16.503 16.607h108.938v503.842c0 203.612 101.342 306.845 301.209 306.845 81.271 0 148.697-16.783 212.24-52.815 5.162-2.888 8.364-8.452 8.364-14.367v-185.43c0-5.723-2.976-11.13-7.875-14.122-4.935-3.098-11.077-3.255-16.135-.753-43.646 21.963-85.837 32.095-133 32.095-72.694 0-105.122-33.005-105.122-106.977v-468.229h249.322c9.152 0 16.52-7.455 16.52-16.607v-194.705c.35-9.152-7-16.607-16.274-16.607l-.246-.106zM8317.388 2494.218v-31.308c0-92.103 35.314-133.175 114.52-133.175 47.232 0 85.173 9.38 127.662 23.555 5.233 1.646 10.692.823 14.945-2.31 4.375-3.133 6.843-8.155 6.843-13.475V2146.58c0-7.298-4.69-13.755-11.726-15.908-44.888-13.353-102.322-27.055-188.316-27.055-209.266 0-319.883 117.845-319.883 340.672v47.95h-108.85c-9.135 0-16.625 7.455-16.625 16.59v195.72c0 9.135 7.49 16.607 16.625 16.607h108.85v777.156c0 9.152 7.385 16.607 16.521 16.607h226.572c9.152 0 16.607-7.455 16.607-16.607V2721.21h211.54l324.047 776.964c-36.785 81.637-72.959 97.877-122.342 97.877-39.918 0-81.953-11.918-124.934-35.438-4.042-2.223-8.837-2.59-13.194-1.242-4.323 1.522-7.962 4.742-9.8 8.942l-76.79 168.472c-3.658 7.963-.525 17.309 7.14 21.438 80.167 43.417 152.531 61.949 241.973 61.949 167.299 0 259.77-77.927 341.285-287.577l393.066-1015.698c1.977-5.11 1.383-10.885-1.75-15.417-3.113-4.498-8.137-7.21-13.633-7.21h-235.865c-7.068 0-13.389 4.497-15.697 11.13l-241.621 690.164-264.652-690.619c-2.414-6.423-8.609-10.676-15.469-10.676h-387.101l.052-.051zM7813.738 2493.221h-226.572c-9.153 0-16.607 7.454-16.607 16.607v988.485c0 9.152 7.454 16.607 16.607 16.607h226.572c9.135 0 16.607-7.455 16.607-16.607v-988.416a16.57 16.57 0 0 0-16.626-16.607l.019-.069zM7701.738 2043.139c-89.757 0-162.592 72.659-162.592 162.417 0 89.81 72.853 162.558 162.593 162.558 89.723 0 162.486-72.748 162.486-162.558 0-89.74-72.799-162.417-162.398-162.417h-.089zM9686.585 2811.037c-89.67 0-159.441-72.013-159.441-159.46s70.682-160.282 160.281-160.282c89.672 0 159.443 71.995 159.443 159.372 0 87.448-70.701 160.37-160.299 160.37h.016zm.875-303.887c-81.672 0-143.465 64.925-143.465 144.427 0 79.468 61.355 143.518 142.643 143.518 81.654 0 143.518-64.872 143.518-144.428 0-79.467-61.426-143.517-142.625-143.517h-.071zm35.352 159.914l45.098 63.141h-38.027l-40.602-57.925h-34.91v57.925h-31.832v-167.37h74.637c38.885 0 64.453 19.897 64.453 53.393.174 27.44-15.75 44.205-38.676 50.837h-.141zm-26.95-75.511h-41.512v52.938h41.512c20.719 0 33.09-10.133 33.09-26.495 0-17.22-12.424-26.442-33.074-26.442h-.016z"
          />
        </svg>
      );
      useEffect(() => {
         if(document.cookie !== ''){
          axios.get(API_PLAYLIST + id + '/playlists')
          .then(res => {
            // console.log(res);        
            dispatch(getAllMyPlaylists(res.data))
            return setCount(res.data.length);
          })
          .catch(err => {
          console.log(err);
            window.location.href = '/error'
          })
       
         }
      }, [count,id])
      

      const handleHome = () => {
        window.location.href = '/'
      }

    // console.log(count);
    

      const handleMyPlaylist = () =>{
        const playlistName = 'My Playlist #' + (count + 1) + '-' + id

        const newPlaylist : MyPlaylist = {
          name : playlistName,
          owner : id
        }
        if(count <= 5){
          dispatch(createMyPlaylist(newPlaylist))
        }
        else message.error('Quá số lượng Playlist! ')
      }

      const handleItemPlaylist = (value : any)=>{
        // console.log(value);
        dispatch(getMyPlaylistDetail(value))
      }


    return(
      <MenuCollapsible className={!props.toggle ? ("fixed h-full w-[270px] ") : ("fixed h-full w-[80px] ")}>
        <div className="flex justify-between h-14 items-center border-b bg-white">
              {
                !props.toggle ? (
                  <span onClick={handleHome} className='cursor-pointer'>{logoNav}</span>
                ) : (
                  <div className="w-[1rem]"></div>
                )
              }
              {
                !props.toggle ? (
                  <MenuFoldOutlined onClick={props.handleToggle} className="cursor-pointer mr-4" style={{ color: "#8B8A8D" }}/>
                ) : (
                  <MenuUnfoldOutlined onClick={props.handleToggle} className="cursor-pointer mr-8" style={{ color: "#8B8A8D" }}/>
                )
              }
            </div>
        <Menu
       
            mode="inline"
            style={{ height: "866px", borderRight: 0  }}
          >
            
            <Menu.Item key={1}  icon={<HomeOutlined style={{ fontSize : '1rem' }}/>} className='mt-2 text-base font-medium'>
              <NavLink to='/'>{menuName.home}</NavLink>
            </Menu.Item>
            {/* <Menu.Item key='2' icon={<SearchOutlined style={{ fontSize : '1rem' }}/>} className='text-base font-medium' >
              <label htmlFor="search">{menuName.search}</label>
            </Menu.Item> */}
            <Menu.Item key='2' icon={<HistoryOutlined style={{ fontSize : '1rem' }}/>} className='text-base font-medium' >
              <NavLink to='/'>{menuName.history}</NavLink>
            </Menu.Item>
            <Menu.Item onClick={handleMyPlaylist} key='3' icon={<PlusCircleOutlined style={{ fontSize : '1rem' }}/>} className='text-base font-medium' >
              {menuName.playlist}
            </Menu.Item>
            <Menu.Item key='4' icon={<HeartOutlined style={{ fontSize : '1rem' }}/>} className='text-base font-medium' >
                <NavLink to='/'>{menuName.liked}</NavLink>
            </Menu.Item> 

          </Menu>
          <div className="absolute top-[35%]">
          <Divider orientation="left" className={!props.toggle ? ("ml-8"):("d-none")}>Playlist của tôi</Divider>

              <List
              className={!props.toggle ? ("mb-0"):("d-none")}
              dataSource={dataPlaylist}
              renderItem={(item : any)=> <List.Item onClick={()=>handleItemPlaylist(item)} className="ml-8 mt-0 mb-0 font-sans text-base font-medium cursor-pointer" style={{ color: "#8B8A8D" }}><p  className="w-[230px] overflow-hidden whitespace-nowrap text-ellipsis">{getNamePlaylist(item.name)}</p></List.Item>}
              /> 

            </div>
          </MenuCollapsible>
    )
}

const MenuCollapsible = styled.div`
  transition: 0.2s all;
  
`