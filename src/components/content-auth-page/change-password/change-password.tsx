import React, { useCallback, useEffect } from 'react';
import './change-password.css';
import { Button, Form, Input, Typography } from 'antd';
import { validateMessage, regPassword } from '@constants/validation';
import { IChangePassord } from '@tstypes/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useChangePassordMutation } from '@services/auth';
import { increment } from '@redux/reducers/userSlice';
import { Loader } from '@components/loader/Loader';

const { Title } = Typography;

export const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const [change, { isLoading }] = useChangePassordMutation();

    const onFinish = useCallback(
        (values: IChangePassord) => {
            dispatch(increment({ email: user.email, password: values.password }));
            change(values)
                .unwrap()
                .then(() =>
                    navigate(PATHS.RESULT.SUCCESS_CHANGE_PASSWORD, {
                        state: PATHS.CHANGE_PASSWORD,
                    }),
                )
                .catch(() =>
                    navigate(PATHS.RESULT.ERROR_CHANGE_PASSWORD, { state: PATHS.CHANGE_PASSWORD }),
                );
        },
        [change, dispatch, navigate, user.email],
    );

    useEffect(() => {
        if (location.state === PATHS.RESULT.ERROR_CHANGE_PASSWORD) {
            onFinish({ password: user.password, confirmPassword: user.password });
        } else if (
            location.state != PATHS.CONFIRM_EMAIL &&
            location.state != PATHS.RESULT.ERROR_CHANGE_PASSWORD
        ) {
            navigate(PATHS.AUTH);
        }
    }, [location.state, navigate, onFinish, user.password]);

    return (
        <>
            {isLoading && <Loader />}
            <Form
                name='normal_registration'
                className='change-password-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Title level={3} className='change-password__title'>
                    Восстановление аккауанта
                </Title>
                <Form.Item
                    name='password'
                    help={validateMessage.password}
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
                        data-test-id='change-password'
                    />
                </Form.Item>
                <Form.Item
                    name='confirmPassword'
                    dependencies={['password']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('password') === value) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(
                                        new Error(validateMessage.repeatPassword),
                                    );
                                }
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        type='password'
                        placeholder='Повторите пароль'
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type='primary'
                            data-test-id='change-submit-button'
                            htmlType='submit'
                            className='login-form-button'
                        >
                            Войти
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    );
};
