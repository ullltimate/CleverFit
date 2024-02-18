import { WarningFilled } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const ErrorLogin: React.FC = () => {

    return (
        <>
            <WarningFilled className='result-icon icon-warning'/>
            <Title level={3} className='result-title'>Вход не выполнен</Title>
            <Text disabled className='result-text'>Что-то пошло не так. Попробуйте еще раз</Text>
            <Button type='primary' className='result-button'>Повторить</Button>
        </>
    );
};
