import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button } from 'antd';
import React, { useState } from 'react';
import './logIn.css'
import { validateMessage, regEmail } from '../../../healpers/validation';
import { IValuesLoginForm } from '../../../types/types';

export const LogIn: React.FC = () => {
    const [forgotDisabled, setForgotDisabled] = useState(true);

    const onFinish = (values: IValuesLoginForm) => {
        console.log('Received values of form: ', values);
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
                    name='e-mail'
                    rules={[
                        { 
                            required: true, message: validateMessage.require 
                        }, 
                        {
                            type: 'email',
                            message: validateMessage.email, 
                        },
                        {
                            validator: (_, value) => {
                                if(regEmail.test(value)) { 
                                    return Promise.resolve(setForgotDisabled(false))
                                } else {
                                    return Promise.reject(setForgotDisabled(true));
                                }
                            }
                        }
                        ]}
                >
                    <Input addonBefore="e-mail"/>
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: validateMessage.require }]}
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
                    <Button type='link' disabled={forgotDisabled} className='login-form-forgot'>
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
