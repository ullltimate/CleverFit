import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const Error: React.FC = () => {

    return (
        <>
            <CloseCircleFilled className='result-icon icon-error'/>
            <Title level={3} className='result-title'>Данные не сохранились</Title>
            <Text disabled className='result-text'>
                Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
            </Text>
            <Button type='primary' className='result-button'>Повторить</Button>
        </>
    );
};