import React from 'react';
import styles from './LoginForm.module.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className={styles.loginForm}>
      <Form
        name="normal_login"
        className={styles.from}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className={styles.forgot} to="/forgot">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Log in
          </Button>
          Or <Link to="/reg">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
