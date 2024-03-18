import React from 'react';
import { Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import './header.css';
import { useLocation } from 'react-router-dom';
import { PATHS } from '@constants/paths';

const { Title } = Typography;

export const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className='header'>
            <div className='header-wrapper'>
                <Title className='header-title'>
                    {location.pathname === PATHS.MAIN && (
                        <span>
                            Приветствуем тебя в CleverFit — приложении,
                            <br /> которое поможет тебе добиться своей мечты!
                        </span>
                    )}
                </Title>
                <Button type='text' className='header-btn'>
                    <SettingOutlined className='header-btn__icon' />
                    <span className='header-btn__text'>Настройки</span>
                </Button>
            </div>
        </header>
    );
};
