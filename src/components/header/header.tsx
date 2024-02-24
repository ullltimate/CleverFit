import React from 'react';
import { Button, Typography, Breadcrumb } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import './header.css';

const { Title } = Typography;

export const Header: React.FC = () => {
    return (
        <>
            <header className='header'>
                <Breadcrumb>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </Breadcrumb>
                <div className='header-wrapper'>
                    <Title className='header-title'>
                        Приветствуем тебя в CleverFit — приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </Title>
                    <Button type='text' className='header-btn'>
                        <SettingOutlined className='header-btn__icon' />
                        <span className='header-btn__text'>Настройки</span>
                    </Button>
                </div>
            </header>
        </>
    );
};
