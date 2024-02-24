import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Grid } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useCheckEmailMutation, useLoginMutation } from '@services/auth';
import { increment } from '@redux/reducers/userSlice';
import { Loader } from '@components/loader/Loader';
import { regEmail, rulesPassword, rulesEmail } from '@constants/validation';
import { PATHS } from '@constants/paths';
import { IValuesLoginForm } from '@tstypes/types';

import './logIn.css';
import { Rule } from 'antd/lib/form';

const { useBreakpoint } = Grid;

export const LogIn: React.FC = () => {
    const [forgotDisabled, setForgotDisabled] = useState<boolean>(true);
    const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
    const [checkEmail, { isLoading: isLoadingEmail }] = useCheckEmailMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.userReducer);
    const {xs} = useBreakpoint();

    const onFinish = (values: IValuesLoginForm) => {
        login({ email: values.email, password: values.password })
            .unwrap()
            .then((res) => {
                values.remember ? localStorage.setItem('token', res.accessToken) : '';
                dispatch(increment({ email: values.email, password: values.password }));
                navigate(PATHS.MAIN);
            })
            .catch(() => navigate(PATHS.RESULT.ERROR_LOGIN, { state: PATHS.AUTH }));
    };

    const check = useCallback(
        (email: string) => {
            checkEmail({ email })
                .unwrap()
                .then(() => {
                    navigate(PATHS.CONFIRM_EMAIL, { state: PATHS.AUTH });
                })
                .catch((error) => {
                    if (error.status === 404 && error.data.message === 'Email не найден') {
                        navigate(PATHS.RESULT.ERROR_EMAIL_NO_EXIST, { state: PATHS.AUTH });
                    } else {
                        dispatch(increment({ email, password: '' }));
                        navigate(PATHS.RESULT.ERROR_CHECK_EMAIL, { state: PATHS.AUTH });
                    }
                });
        },
        [checkEmail, dispatch, navigate],
    );

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate(PATHS.MAIN);
        }
        if (location.state === PATHS.RESULT.ERROR_CHECK_EMAIL) {
            check(user.email);
        }
    }, [check, location.state, navigate, user.email]);

    return (
        <>
            {(isLoadingLogin || isLoadingEmail) && <Loader />}
            <Form
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name='email'
                    rules={[
                        rulesEmail,
                        {
                            validator: (_: Rule, value: string) => {
                                if (regEmail.test(value)) {
                                    dispatch(increment({ email: value, password: '' }));
                                    return Promise.resolve(setForgotDisabled(false));
                                } else {
                                    return Promise.reject(setForgotDisabled(true));
                                }
                            },
                        },
                    ].flat()}
                >
                    <Input addonBefore='e-mail' data-test-id='login-email' />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={rulesPassword}
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
                    <Button
                        type='link'
                        className='login-form-forgot'
                        data-test-id='login-forgot-button'
                        onClick={() => !forgotDisabled && check(user.email)}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        onSubmit={(e) => e.preventDefault()}
                        className='login-form-button'
                        data-test-id='login-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type='text' className='login-form-button'>
                        {!xs && <GooglePlusOutlined />} Войти через Google
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
