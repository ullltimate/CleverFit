import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React from 'react';
import './signUp.css'

export const SignUp: React.FC = () => {
    return (
        <>
            <Form
                name='normal_registration'
                className='registration-form'
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name='username'
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input addonBefore='e-mail' />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password type='password' placeholder='Пароль' />
                </Form.Item>
                <Form.Item
                    name='repeat-password'
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password type='password' placeholder='Повторите пароль' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        Войти
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type='text' className='login-form-button'>
                        <GooglePlusOutlined /> Войти через Google
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
