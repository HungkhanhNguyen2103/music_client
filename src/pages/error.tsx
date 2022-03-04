import styled from "styled-components";

const broken = require('../assets/images/icons8-broken-pencil-64.png')

export const ErrorPage = () => {
  return (
    <ErrorBlock className="pt-20">
      <div className="error-background fixed top-0 left-0 w-[100%] h-[100%] -z-[1]" />
      <div className="error-container m-auto w-[45rem] h-[35rem] rounded-lg shadow-2xl">
        <div className="error-logo pt-20">
          <img src={broken} alt="broken" className="m-auto" width={128} height={128}/>
        </div>
        <div className="error-message p-4">
          <h3 className="font-sans text-center">Có điều gì đó không ổn!</h3>
          <p className="text-center font-sans">
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
            viên của bạn để lấy tài khoản. Hoặc <a href="/login" className="decoration-auto">đăng nhập </a>
            bằng tài khoản khác
          </p>
        </div>
        <div className="error-btn text-center">
          <a href="/">
            <button className="btn btn-default cursor-pointer w-[13rem] font-sans h-10 outline-none rounded-lg">Quay lại trang chủ</button>
          </a>
        </div>
      </div>
    </ErrorBlock>
  );
}

const ErrorBlock = styled.div`
    .error-background{
      background-color: var(--gray-300);
    }
    .error-container{
      background-color: var(--white-100);
      box-shadow: 0rem 0rem 11px 13px var(--gray-500);
      & h3{
        font-size: 23px;
      }
      & button{
        background-color: var(--black-900);
        color: var(--white-100);
        font-size: 14px;
      }
    }
`
