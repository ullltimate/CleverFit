import React, { useState } from 'react';
import {
    HeartFilled,
    TrophyFilled,
    IdcardOutlined,
    CalendarTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { increment } from '@redux/reducers/userSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ExitIcon } from '@components/icons/exitIcon';

import './siderBar.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths';

const { Sider } = Layout;

export const SiderBar: React.FC = () => {
    const [widthCollapsed, setWidthCollapsed] = useState<number>(64);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [mobileWidth, setMobileWidth] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function changeBreakpoint(broken: boolean): void {
        if (broken) {
            setWidthCollapsed(1);
            setMobileWidth(true);
        } else {
            setWidthCollapsed(64);
            setMobileWidth(false);
        }
    }

    type key = {
        key: string;
    };

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(increment({ email: '', password: '' }));
        navigate(PATHS.AUTH);
    };

    function onClick({ key }: key) {
        switch (key) {
            case 'exit':
                logOut();
        }
    }

    return (
        <>
            <div className='sider-wrapper'>
                <div
                    className={`trapezoid-wrapper ${
                        mobileWidth ? (collapsed ? ' ' : 'trapezoid-wrapper-collapsed') : ''
                    }`}
                >
                    <div
                        className='trapezoid'
                        data-test-id={`${mobileWidth ? 'sider-switch-mobile' : 'sider-switch'}`}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </div>
                </div>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme='light'
                    width={mobileWidth ? 106 : 208}
                    style={!mobileWidth ? { height: '100%' } : { height: '100vh' }}
                    collapsedWidth={widthCollapsed}
                    breakpoint='sm'
                    onBreakpoint={(broken) => changeBreakpoint(broken)}
                >
                    <div className={`logo-${!collapsed ? 'full' : 'hidden'}`}>
                        <a href=''>
                            <img
                                src='/Clever.svg'
                                alt='logo'
                                className='logo-clever'
                                style={{ opacity: `${!collapsed ? 1 : 0}` }}
                            />
                            <img
                                src='/fit.svg'
                                alt='logo'
                                className={`logo-fit ${mobileWidth ? 'logo-collapsed' : ''}`}
                                style={
                                    mobileWidth
                                        ? { opacity: `${!collapsed ? 1 : 0}` }
                                        : { opacity: 1 }
                                }
                            />
                        </a>
                    </div>
                    <Menu
                        theme='light'
                        mode='inline'
                        inlineIndent={mobileWidth ? 8 : 16}
                        className='menu'
                        onClick={onClick}
                        items={[
                            {
                                key: '1',
                                icon: !mobileWidth ? (
                                    <CalendarTwoTone twoToneColor='#061178' />
                                ) : (
                                    ''
                                ),
                                label: !collapsed ? 'Календарь' : '',
                            },
                            {
                                key: '2',
                                icon: !mobileWidth ? (
                                    <HeartFilled style={{ color: '#061178' }} />
                                ) : (
                                    ''
                                ),
                                label: !collapsed ? 'Тренировки' : '',
                            },
                            {
                                key: '3',
                                icon: !mobileWidth ? (
                                    <TrophyFilled style={{ color: '#061178' }} />
                                ) : (
                                    ''
                                ),
                                label: !collapsed ? 'Достижения' : '',
                            },
                            {
                                key: '4',
                                icon: !mobileWidth ? (
                                    <IdcardOutlined style={{ color: '#061178' }} />
                                ) : (
                                    ''
                                ),
                                label: !collapsed ? 'Профиль' : '',
                            },
                            {
                                key: 'exit',
                                icon: !mobileWidth ? <ExitIcon /> : '',
                                label: !collapsed ? 'Выход' : '',
                            },
                        ]}
                    />
                </Sider>
            </div>
        </>
    );
};
