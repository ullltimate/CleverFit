import React, { useEffect } from 'react';
import './result.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { IPropsResult } from '@tstypes/types';
import { PATHS } from '@constants/paths';

const { Title, Text } = Typography;

export const Result: React.FC<IPropsResult> = ({icon, title, text, btnText, btnPath, dataAtribute}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        !location.state ? navigate(PATHS.AUTH) : '';
    },[location.state, navigate])
    
    return (
        <>
            <div className='result'>
                {icon}
                <Title level={3} className='result-title'>{title}</Title>
                <Text disabled className='result-text'>{text}</Text>
                <Button type='primary' 
                    className='result-button' 
                    data-test-id={dataAtribute} 
                    onClick={() => {
                        navigate(".", { replace: true }), 
                        navigate(btnPath, {state: location.pathname})
                    }}
                >
                    {btnText}
                </Button>
            </div>
        </>
    );
};