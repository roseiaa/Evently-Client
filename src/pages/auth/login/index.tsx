import { Link, useNavigate } from "react-router-dom";
import WelcomePage from "../common/WelcomePage";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { loginUser } from "../../../api/usersService";
import Cookies from "js-cookie";

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async(values: never) => {
        try {
          setLoading(true);
          const response = await loginUser(values);
          message.success(response.message);
          Cookies.set("token", response.token);
          navigate("/");
        } catch (error: any) {
          message.error(error.response?.data.message || error.message)
          
        } finally {
          setLoading(false);
        }
    }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div className="col-span-1 lg:flex hidden">
        <WelcomePage />
      </div>
      <div>
        <div className="h-screen flex items-center justify-center">
          <Form className="flex flex-col gap-5 w-96" layout="vertical" onFinish={onFinish}>
            <h1 className="text-2xl font-bold text-gray-600">
              Login to your account
            </h1>

            <Form.Item name="email" required label="Email" rules={[{ required: true , message: "Please enter email"}]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" required label="Password" rules={[{ required: true , message: "Please enter password"}]}>
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
            <Link to={"/register"}>Don't have an account? Register</Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
