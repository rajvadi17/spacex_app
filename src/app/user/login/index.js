import React from "react";
import { Form, Input, Button } from "antd";
import { userLogin } from "../../../api/login";
import Auth from "../../../utils/auth";
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

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      dispatch(showLoader());
      const response = await userLogin(values);
      Auth.login({ ...response, username: values.username });
      history.push("/dashboard/home");
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
