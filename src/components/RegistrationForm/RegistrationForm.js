import React, { useContext } from 'react';
import styles from './RegistrationForm.module.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const RegistrationForm = () => {
  const { registration, error } = useContext(UserContext);

  return (
    <div className={styles.registrationForm}>
      <Form
        name="normal_login"
        className={styles.from}
        initialValues={{
          remember: true,
        }}
        validateMessages={{
          required: 'This field is required!',
          types: {
            email: 'Not a validate email!',
          },
        }}
        onFinish={e => {
          registration(e.email, e.password);
        }}
      >
        <Form.Item
          name="email"
          help={error || undefined}
          validateStatus={!!error ? 'error' : undefined}
          rules={[
            {
              required: true,
              // message: 'Please input your Username!',
              type: 'email',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          help={error || undefined}
          validateStatus={!!error ? 'error' : undefined}
          rules={[
            {
              required: true,
              // message: 'Please input your Password!',
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
          <Button type="primary" htmlType="submit" className={styles.button}>
            Register
          </Button>
          Or <Link to="/login">login now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
