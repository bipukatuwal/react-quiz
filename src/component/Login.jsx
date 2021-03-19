import React from "react";
import { Form, Input, Button } from "antd";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Login() {
  const history = useHistory();

  const onFinish = (values) => {
    Cookies.set("username", values.username);
    Cookies.set("loggedin", true);
    history.push("/");
  };

  return (
    <div className="login-container">
      <br />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h2 style={{ textAlign: "center" }}>Quiz Game Login</h2>
        <br />
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
