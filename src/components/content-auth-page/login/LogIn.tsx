import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './logIn.css'
import { validateMessage, regEmail, regPassword } from '@constants/validation';
import { IValuesLoginForm } from '@tstypes/types';
import { useCheckEmailMutation, useLoginMutation } from '@services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '@components/loader/Loader';
import { PATHS } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { increment } from '@redux/reducers/userSlice';

export const LogIn: React.FC = () => {
    const [forgotDisabled, setForgotDisabled] = useState(true);
    const [login, {isLoading: isLoadingLogin}] = useLoginMutation();
    const [checkEmail, {isLoading: isLoadingEmail}] = useCheckEmailMutation();
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.userReducer);
    console.log(user)
    
    
    const onFinish = (values: IValuesLoginForm) => {
        login({ email: values.email, password: values.password })
            .unwrap()
            .then((res) => {
                values.remember ? localStorage.setItem('token', res.accessToken) : '';
                dispatch(increment({ email: values.email, password: values.password }))
                navigate(PATHS.MAIN);
            }).catch(() => navigate(PATHS.RESULT.ERROR_LOGIN, {state: PATHS.AUTH}));
        console.log('Received values of form: ', values);
    };
    
    const check = useCallback((email: string) => {
        checkEmail({email})
            .unwrap()
            .then(() => {
                navigate(PATHS.CONFIRM_EMAIL, {state: PATHS.AUTH})
            })
            .catch((error) => {
                if (error.status === 404 && error.data.message === 'Email не найден'){
                    navigate(PATHS.RESULT.ERROR_EMAIL_NO_EXIST, {state: PATHS.AUTH})
                } else {
                    dispatch(increment({email, password: ''}))
                    navigate(PATHS.RESULT.ERROR_CHECK_EMAIL, {state: PATHS.AUTH})
                }
            })
    },[checkEmail, dispatch, navigate])

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate(PATHS.MAIN)
        }
        if(location.state === PATHS.RESULT.ERROR_CHECK_EMAIL){
            check(user.email);
        }
    },[check, location.state, navigate, user.email])

    return (
        <>
        {(isLoadingLogin || isLoadingEmail) && <Loader/>}
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
                                    dispatch(increment({email: value, password: ''}))
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
                    rules={[
                        {
                            validator: (_, value) => {
                                if (regPassword.test(value)) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error(validateMessage.password));
                                }
                            },
                        },
                    ]}
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
                    <Button type='link' 
                        className={`login-form-forgot ${forgotDisabled ? 'disabled' : ''}`} 
                        data-test-id='login-forgot-button'
                        onClick={() => !forgotDisabled && check(user.email)}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type='primary'  htmlType='submit' onSubmit={(e) => e.preventDefault()} className='login-form-button' data-test-id='login-submit-button'>
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
