import { Link, useNavigate } from "react-router-dom";
import WelcomePage from "../common/WelcomePage";
import { Button, Form, Input, message } from "antd";
import { registerUser } from "../../../api/usersService";
import { useState } from "react";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: never) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
      message.success(response.message);
      navigate("/login");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div className="col-span-1 lg:flex hidden">
        <WelcomePage />
      </div>
      <div>
        <div className="h-screen flex items-center justify-center">
          <Form
            className="flex flex-col gap-5 w-96"
            layout="vertical"
            onFinish={onFinish}
          >
            <h1 className="text-2xl font-bold text-gray-600">
              Register your account
            </h1>

            <Form.Item
              name="name"
              required
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>

            <Form.Item
              name="email"
              required
              label="Email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              required
              label="Password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
            <Link to={"/login"}>
              Already have an account? Click here to login
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
