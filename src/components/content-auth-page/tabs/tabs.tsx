import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths';
import { Tabs } from 'antd';

import { LogIn } from '../login/login';
import { SignUp } from '../signup/signup';

import './tabs.css';

type AuthItemsTab = {
    label: string,
    key: string,
    children: React.ReactNode,
}

export const CustomTabs: React.FC = () => {
    const [key, setKey] = useState('1');
    const navigate = useNavigate();
    const location = useLocation();
    const itemsTab: AuthItemsTab[] = [
        {
            label: 'Вход',
            key: '1',
            children: <LogIn />,
        },
        {
            label: 'Регистрация',
            key: '2',
            children: <SignUp />,
        },
    ];

    useEffect(() => {
        if(location.pathname === PATHS.REGISTRATION) {
            setKey('2')
        } else {
            setKey('1')
        };
    }, [location.pathname]);

    return (
        <React.Fragment>
            <img src='/logo.svg' className='logo' alt='logo' />
            <Tabs
                activeKey={key}
                centered={true}
                tabBarGutter={0}
                items={itemsTab}
                onChange={(k: string) => {
                    setKey(k);
                    if(key === '2') {
                        navigate(PATHS.AUTH)
                    } else {
                        navigate(PATHS.REGISTRATION)
                    };
                }}
            />
        </React.Fragment>
    );
};
