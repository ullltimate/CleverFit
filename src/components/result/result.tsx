import React from 'react';
import './result.css'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { IPropsResult } from '@tstypes/types';

const { Title, Text } = Typography;

export const Result: React.FC<IPropsResult> = ({icon, title, text, btnText, btnPath}) => {
    const navigate = useNavigate();
    
    return (
        <>
            <div className='result'>
                {icon}
                <Title level={3} className='result-title'>{title}</Title>
                <Text disabled className='result-text'>{text}</Text>
                <Button type='primary' className='result-button' onClick={() => navigate(btnPath)}>{btnText}</Button>
            </div>
        </>
    );
};