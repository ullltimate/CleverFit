import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { PATHS } from '@constants/paths';
import { Button, Typography } from 'antd';

import './header.css';

const { Title } = Typography;

export const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className='header' style={{paddingTop: location.pathname === PATHS.PROFILE ? 'var(--unit-16)' : ''}}>
            <div className='header-wrapper'>
                {location.pathname === PATHS.MAIN && (
                    <Title className='header-title'>
                        <span>
                            Приветствуем тебя в CleverFit — приложении,
                            <br /> которое поможет тебе добиться своей мечты!
                        </span>
                    </Title>
                )}
                {
                    location.pathname === PATHS.PROFILE && (
                        <Title level={4} className='header-title'>
                            <span>
                                Профиль
                            </span>
                        </Title>
                    )
                }
                <Button type='text' className='header-btn' data-test-id='header-settings' onClick={() => navigate(PATHS.SETTINGS)}>
                    <SettingOutlined className='header-btn__icon' />
                    <span className='header-btn__text'>Настройки</span>
                </Button>
            </div>
        </header>
    );
};
