import { Menu, Dropdown, message } from 'antd';
import {  UserOutlined  , CaretDownOutlined,LogoutOutlined} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { State } from '../../stores/reducer/index';
import { NavLink } from 'react-router-dom';

export const UserPage = () =>{

  
  const words = document.cookie.split('=')
  const name = words[2]
  

    const DataUser = useSelector((state : State) => state.auth.DataUser)

    const handleLogout = () => {
      const hide = message.loading('', 0);
      // Dismiss manually and asynchronously
        setTimeout(hide, 600);
        setTimeout(() => {
          document.cookie = "id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
          window.location.href = '/login'
        }, 850);
    }
    

    const menu = (
        document.cookie !== "" ? (
          <Menu >
          <Menu.Item key="1" style={{ color: "#8B8A8D" }} icon={<UserOutlined style={{ color: "#8B8A8D" }}/>}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item onClick={handleLogout} key="2" style={{ color: "#8B8A8D" }} icon={<LogoutOutlined style={{ color: "#8B8A8D" }}/>}>
            Đăng xuất
          </Menu.Item>
        </Menu>
        ) : (
          <></>
        )
      );


    return (
        <Dropdown.Button overlay={menu}  placement="bottomCenter" style={{ color: "#8B8A8D" }}  icon={<CaretDownOutlined style={{ color: "#8B8A8D" }}/>} >
            {
              document.cookie !== '' ? (
                name
              ) : (
                <NavLink to='/login'>Đăng nhập</NavLink>
              )
            }
        </Dropdown.Button>
    )
}