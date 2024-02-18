import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const SuccessSignup: React.FC = () => {

    return (
        <>
            <CheckCircleFilled className='result-icon icon-success'/>
            <Title level={3} className='result-title'>Регистрация успешна</Title>
            <Text disabled className='result-text'>
                Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.
            </Text>
            <Button type='primary' className='result-button'>Войти</Button>
        </>
    );
};
