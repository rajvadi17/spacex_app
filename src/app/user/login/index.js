import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  showNotification,
  showLoader,
  hideLoader,
} from "../../../duck/actions/commonActions";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const users = [{
  username: 'demo',
  password: 'demo'
}, { username: 'vadi',
password: 'vadi'}]

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      dispatch(showLoader());
      const user = users.filter((obj) => obj.username == values.username);
      if(user.length && user[0].username == values.username && user[0].password == values.password){
      history.push("/dashboard/home");
      } else if(!user.length){
      dispatch(showNotification("error", "User not found"));
      }
      else if(user.length && user[0].password != values.password){

      dispatch(showNotification("error", "Password doesn't match"));
      }
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
      dispatch(showNotification("error", err.message));
    }
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your username!",
            },
          ]}
        >
          <Input id="username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password id="password" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" id="login-btn" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
