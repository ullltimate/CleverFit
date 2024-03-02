import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { increment } from '@redux/reducers/userSlice';
import { useSignupMutation } from '@services/auth';
import { Loader } from '@components/loader/Loader';
import { ButtonGoogle } from '@components/content-auth-page/buttons/ButtonGoogle';
import { rulesEmail, rulesPassword, rulesRepeatPassword, validateMessage } from '@constants/validation';
import { PATHS } from '@constants/paths';
import { IValuesSignupForm } from '@tstypes/types';

import './signUp.css';

export const SignUp: React.FC = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [signup, { isLoading }] = useSignupMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.userReducer);

    const onFinish = useCallback(
        (values: IValuesSignupForm) => {
            signup({ email: values.email, password: values.password })
                .unwrap()
                .then(() => {
                    navigate(PATHS.RESULT.SUCCESS, { state: PATHS.REGISTRATION });
                })
                .catch((error) => {
                    if (error.status === 409) {
                        navigate(PATHS.RESULT.ERROR_USER_EXIST, {
                            state: PATHS.REGISTRATION,
                        });
                    } else {
                        navigate(PATHS.RESULT.ERROR, { state: PATHS.REGISTRATION });
                        dispatch(increment(values));
                    }
                });
        },
        [dispatch, navigate, signup],
    );

    useEffect(() => {
        forceUpdate({});
        if (location.state === PATHS.RESULT.ERROR) {
            onFinish(user);
        }
    }, [location.state, onFinish, user]);
    return (
        <>
            {isLoading && <Loader />}
            <Form
                name='normal_registration'
                className='registration-form'
                onFinish={onFinish}
                form={form}
            >
                <Form.Item name='email' rules={rulesEmail}>
                    <Input addonBefore='e-mail' data-test-id='registration-email' />
                </Form.Item>
                <Form.Item name='password' help={validateMessage.password} rules={rulesPassword}>
                    <Input.Password
                        type='password'
                        placeholder='Пароль'
                        data-test-id='registration-password'
                    />
                </Form.Item>
                <Form.Item
                    name='repeatPassword'
                    dependencies={['password']}
                    rules={rulesRepeatPassword}
                >
                    <Input.Password
                        type='password'
                        placeholder='Повторите пароль'
                        data-test-id='registration-confirm-password'
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type='primary'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                            htmlType='submit'
                            className='login-form-button'
                            data-test-id='registration-submit-button'
                        >
                            Войти
                        </Button>
                    )}
                </Form.Item>
                <ButtonGoogle />
            </Form>
        </>
    );
};
