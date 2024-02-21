import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './signUp.css';
import { regPassword, validateMessage } from '@constants/validation';
import { IValuesSignupForm } from '@tstypes/types';
import { useSignupMutation } from '@services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {increment} from '@redux/reducers/userSlice'


export const SignUp: React.FC = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [signup] = useSignupMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.userReducer);

    const onFinish = useCallback((values: IValuesSignupForm) => {
        signup({ email: values.email, password: values.password })
        .unwrap()
        .then(() => {
            navigate(`${PATHS.RESULT.SUCCESS}`, {state: `${PATHS.REGISTRATION}`});
        }).catch((error) => {
            if(error.status === 409){
                navigate(`${PATHS.RESULT.ERROR_USER_EXIST}`, {state: `${PATHS.REGISTRATION}`})
            }else{
                navigate(`${PATHS.RESULT.ERROR}`, {state: `${PATHS.REGISTRATION}`}); 
                dispatch(increment(values))
            }
        });
        console.log('Received values of form: ', values);
    },[dispatch, navigate, signup]);

    useEffect(() => {
        forceUpdate({});
        if(location.state === `${PATHS.RESULT.ERROR}`){
            console.log(location.state)
            onFinish(user)
        }
    }, [location.state, onFinish, user]);
    return (
        <>
            <Form
                name='normal_registration'
                className='registration-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: validateMessage.require,
                        },
                        {
                            type: 'email',
                            message: validateMessage.email,
                        },
                    ]}
                >
                    <Input addonBefore='e-mail' data-test-id='registration-email'/>
                </Form.Item>
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
                    <Input.Password type='password' placeholder='Пароль' data-test-id='registration-password'/>
                </Form.Item>
                <Form.Item
                    name='repeatPassword'
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
                    <Input.Password type='password' placeholder='Повторите пароль' data-test-id='registration-confirm-password'/>
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

                <Form.Item>
                    <Button type='text' className='login-form-button'>
                        <GooglePlusOutlined /> Войти через Google
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
