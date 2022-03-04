import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { SignUpPage } from './components/signup';
import { loginUser } from '../stores/actions/auth';

export interface LoginObject {
   username : string,
   password : string,
   remember : boolean
}

export const LoginPage = () => {
  const [toggleForm, setToggleForm] = useState(false);

  const dispatch = useDispatch()

  const handleLogin = () => {
    setToggleForm(!toggleForm);
  };

  const onFinish = (values: LoginObject) => {
    // console.log('Success:', values);
    dispatch(loginUser(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Lỗi đăng nhập !')
  };
  


  return (
    <LoginBlock className="pt-28">
      <div className="background bg-no-repeat fixed top-[0%] left-[0%] w-full h-full bg-cover -z-[1]"></div>
      <div className="account w-[55rem] relative h-[27rem] ml-auto mr-auto flex justify-between">
        <div className="account__sign-up h-[60%] mt-32 ml-12">
          <h4 className="font-sans mt-2 mb-2 ml-0 mr-0 text-white font-light ">
            Không có tài khoản?
          </h4>
          <p className="font-sans text-base text-white pb-4">
            Bạn chưa có tài khoản? Tạo ngay!
          </p>
          <button
            className="text-center outline-none cursor-pointer text-white border uppercase font-extralight font-sans border-white pt-[0.4rem] pb-[0.4rem] pl-6 pr-6"
            onClick={handleLogin}
          >
            Đăng ký
          </button>
        </div>
        <div
          className={
            toggleForm
              ? "account__form absolute w-[28rem] h-[29.6rem] z-[1] top-[-5%] ease-in bg-white  right animaltion-left"
              : "account__form absolute w-[28rem] h-[29.6rem] z-[1] top-[-5%] ease-in bg-white animaltion-right left"
          }
        >
          <SignUpPage toggleForm={toggleForm}/> 
          <Form
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: false }}
            className={
              !toggleForm
                ? "login w-[80%] mt-20 mr-auto ml-auto sign-up "
                : "login sign-up d-none"
            }
          >
            <h3 className="uppercase font-sans font-medium text-2xl mb-4">
              Đăng nhập
            </h3>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Điền thông tin tài khoản!",
                },
              ]}
            >
              <Input placeholder="Tên người dùng" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Điền thông tin mật khẩu!",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>Nhớ mật khấu</Checkbox>
            </Form.Item>
            <Form.Item >
              <Button
                htmlType="submit"
                className="button w-[8rem] text-center uppercase pt-[0.4rem] pb-[0.4rem] pl-8 pr-8 text-white font-normal outline-none mt-2 "
              >
                Đăng nhập
              </Button>
              <a href="/" className="forgot"><span >Quay lại trang chủ</span></a>
            </Form.Item>
            
          </Form>
        </div>
        <div className="account__login account__sign-up h-[60%] mt-32 mr-12">
          <h4 className="font-sans mt-2 mb-2 ml-0 mr-0 text-white font-light">
            Có một tài khoản?
          </h4>
          <p className="font-sans text-base text-white pb-4">
            Đăng nhập tại đây!
          </p>
          <button
            className="text-center outline-none cursor-pointer text-white border uppercase font-extralight font-sans border-white pt-[0.4rem] pb-[0.4rem] pl-6 pr-6"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </LoginBlock>
  );
};
const LoginBlock = styled.div`
  & .background {
    background-image: linear-gradient(to right, #0000005c, #0000005c),
      url(https://nichanunblog.files.wordpress.com/2017/10/spotfiy.jpg);
  }
  & .account {
    background-color: var(--black-800);
    border-radius: 0.3rem;
    & h4 {
      font-size: 1.7em;
    }
    & button {
      background-color: var(--black-800);
      border-radius: 0.4rem;
    }
    & .account__form {
      box-shadow: 1px 1px 15px 2px;
      border-radius: 0.3rem;
      transition: 0.4s all;
      & .sign-up {
        margin: 2rem auto 0 auto !important;
      }
      & h3 {
        color: var(--orange-300);
      }
      & .button {
        background-color: var(--orange-300);
        border: 1px solid var(--green-900);
        border-radius: 0.3rem;
      }
      & a.forgot{
          margin-left: 6.5rem 
      }
    }
  }
  .right {
    animation: animaltion__right 1s;
  }

  .left {
    animation: animaltion__left 1s;
  }

  .animaltion-left {
    left: 5%;
    transition: 0.4s all;
  }

  .animaltion-right {
    left: 44%;
    transition: 0.4s all;
  }
  @keyframes animaltion__right {
    0% {
      left: 44%;
    }
    50% {
      left: 0%;
    }
    100% {
      left: 5%;
    }
  }

  @keyframes animaltion__left {
    0% {
      left: 5%;
    }
    50% {
      left: 49%;
    }
    100% {
      left: 44%;
    }
  }
`;
