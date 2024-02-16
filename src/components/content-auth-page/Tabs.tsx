import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';
import { IAuthItemsTab } from '../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';

export const CustomTabs: React.FC = () => {
    const [key, setKey] = useState('1');
    const navigate = useNavigate();
    const location = useLocation();
    const itemsTab: IAuthItemsTab[] = [
        {
            label: `Вход`,
            key: '1',
            children: <LogIn />,
        },
        {
            label: `Регистрация`,
            key: '2',
            children: <SignUp />,
        },
    ]

    useEffect(() => {
        location.pathname === '/auth/registration' ? setKey('2') : setKey('1');
    },[location.pathname])

    return (
        <>
            <img src='/logo.svg' alt='' />
            <Tabs
                activeKey={key}
                centered
                items={itemsTab}
                onChange={(k:string) => {setKey(k); key==='2' ? navigate(`/auth`) : navigate('/auth/registration')}}
            />
        </>
    );
};
