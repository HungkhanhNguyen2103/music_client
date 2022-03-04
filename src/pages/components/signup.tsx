import { Form, Input, Button, Select, DatePicker ,message } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from '../../stores/actions/auth';

interface Props {
    toggleForm : boolean
}

export interface RegisterObject {
  username : string,
  email : string,
  password : string,
  birthday : string,
  gender : string
} 

export const SignUpPage = (props : Props) =>{

  const dispatch = useDispatch()

  //finish
  const onFinish = (values : any) => {
    dispatch(registerUser(values));
    // console.log('Success:', values);
    
  };

  //failed
  const onFinishFailed = (errorInfo : any) => {
    console.log('Failed:', errorInfo);
    message.error('Lỗi đăng ký !')
  };


    return (
        <Form
        name="sigup" 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={!props.toggleForm ? "sign-up d-none" : "sign-up w-[80%] "}>
            <h3 className="uppercase font-sans font-medium text-2xl mb-4">
              Đăng ký
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Điền thông tin email!",
                },
              ]}
            >
              <Input placeholder="Email" />
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
              name="birthday"
              rules={[{ required: true, message: "Chọn ngày sinh!" }]}
            >
              <DatePicker className="w-full" placeholder="Ngày sinh" />
            </Form.Item>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: "Chọn giới tính phù hợp!" }]}
            >
              <Select placeholder="Giới tính" allowClear>
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="button w-[8rem] text-center uppercase  pt-[0.4rem] pb-[0.4rem] pl-8 pr-8 text-white font-normal outline-none mt-4 "
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
    )
}