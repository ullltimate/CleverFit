import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button } from 'antd';
import React, { useState } from 'react';
import './logIn.css'
import { validateMessage, regEmail } from '@constants/validation';
import { IValuesLoginForm } from '@tstypes/types';
import { useLoginMutation } from '@services/auth';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@components/loader/Loader';
import { PATHS } from '@constants/paths';

export const LogIn: React.FC = () => {
    const [forgotDisabled, setForgotDisabled] = useState(true);
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();
    
    const onFinish = async (values: IValuesLoginForm) => {
        login({ email: values.email, password: values.password })
        .unwrap()
        .then((res) => {
            values.remember ? localStorage.setItem('token', res.accessToken) : sessionStorage.setItem('token', res.accessToken);
            navigate(`${PATHS.MAIN}`);
        }).catch(() => navigate(`${PATHS.RESULT.ERROR_LOGIN}`, {state: `${PATHS.AUTH}`}));
        console.log('Received values of form: ', values);
      };


    return (
        <>
        {isLoading && <Loader/>}
            <Form
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name='email'
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
                    <Input addonBefore="e-mail" data-test-id='login-email'/>
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: validateMessage.require }]}
                >
                    <Input.Password
                        type='password'
                        placeholder='Пароль'
                        data-test-id='login-password'
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button type='link' disabled={forgotDisabled} className='login-form-forgot' data-test-id='login-forgot-button'>
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type='primary'  htmlType='submit' className='login-form-button' data-test-id='login-submit-button'>
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
