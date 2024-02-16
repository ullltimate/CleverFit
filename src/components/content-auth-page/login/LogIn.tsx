import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button } from 'antd';
import React from 'react';
import './logIn.css'

export const LogIn: React.FC = () => {
    const onFinish = () => {
        console.log('Received values of form: ');
      };
    return (
        <>
            <Form
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name='username'
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input addonBefore="e-mail"/>
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        type='password'
                        placeholder='Пароль'
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button type='link' disabled={true} className='login-form-forgot'>
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type='primary'  htmlType='submit' className='login-form-button'>
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
