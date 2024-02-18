import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const ErrorUserExist: React.FC = () => {

    return (
        <>
            <CloseCircleFilled className='result-icon icon-error'/>
            <Title level={3} className='result-title'>Данные не сохранились</Title>
            <Text disabled className='result-text'>
                Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.
            </Text>
            <Button type='primary' className='result-button'>Назад к регистрации</Button>
        </>
    );
};