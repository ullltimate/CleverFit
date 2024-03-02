import React from 'react';
import { Button, Form, Grid } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { urlAPI } from '@constants/api';

const { useBreakpoint } = Grid;

export const ButtonGoogle: React.FC = () => {
    const { xs } = useBreakpoint();

    const loginWithGoogle = () => {
        window.location.href = `${urlAPI}/auth/google`;
    };
    return (
        <>
            <Form.Item>
                <Button type='text' className='login-form-button' onClick={loginWithGoogle}>
                    {!xs && <GooglePlusOutlined />} Войти через Google
                </Button>
            </Form.Item>
        </>
    );
};
