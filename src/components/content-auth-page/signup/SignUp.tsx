import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import './signUp.css';
import { regPassword, validateMessage } from '../../../healpers/validation';
import { IValuesSignupForm } from '../../../types/types';

export const SignUp: React.FC = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    const onFinish = (values: IValuesSignupForm) => {
        console.log('Received values of form: ', values);
    };

    useEffect(() => {
        forceUpdate({});
    }, []);
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
                    <Input addonBefore='e-mail' />
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
                    <Input.Password type='password' placeholder='Пароль' />
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
                    <Input.Password type='password' placeholder='Повторите пароль' />
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
