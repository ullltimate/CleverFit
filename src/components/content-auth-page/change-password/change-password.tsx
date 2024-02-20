import React from 'react';
import './change-password.css'
import { Button, Form, Input, Typography } from 'antd';
import { validateMessage, regPassword } from '@constants/validation';
import { IValuesSignupForm } from '@tstypes/types';

const { Title } = Typography;

export const ChangePassword: React.FC = () => {

    const onFinish = (values: IValuesSignupForm) => {
        
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <Form
                name='normal_registration'
                className='registration-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}

            >
                <Title level={3} className='change-password__title'>Восстановление аккауанта</Title>
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
                    <Input.Password type='password' placeholder='Пароль' data-test-id='change-password'/>
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
                    <Input.Password type='password' placeholder='Повторите пароль' data-test-id='change-confirm-password'/>
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
