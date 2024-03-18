import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    HeartFilled,
    TrophyFilled,
    IdcardOutlined,
    CalendarTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { increment } from '@redux/reducers/user-slice';
import { saveToken } from '@redux/reducers/token-slice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ExitIcon } from '@components/icons/exit-icon';
import { PATHS } from '@constants/paths';

import './sider-bar.css';
import { useLazyGetTrainingQuery } from '@services/trainings';

const { Sider } = Layout;

export const SiderBar: React.FC = () => {
    const [widthCollapsed, setWidthCollapsed] = useState<number>(64);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [mobileWidth, setMobileWidth] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [getTrainings] = useLazyGetTrainingQuery();

    const changeBreakpoint = (broken: boolean): void => {
        if (broken) {
            setWidthCollapsed(1);
            setMobileWidth(true);
            setCollapsed(true);
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
        dispatch(saveToken(''));
        navigate(PATHS.AUTH);
    };

    const onClick = ({ key }: key) => {
        switch (key) {
            case 'exit':
                logOut();
                break;
            case 'calendar':
                getTrainings()
                    .unwrap()
                    .then(() => navigate(PATHS.CALENDAR))
                    .catch((error) => console.log(error));
                break;
            }
    }

    return (
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
                style={mobileWidth ? { height: '100vh' } : { height: '100%' }}
                collapsedWidth={widthCollapsed}
                breakpoint='sm'
                onBreakpoint={(broken) => changeBreakpoint(broken)}
            >
                <div className={`logo-${collapsed ? 'hidden' : 'full'}`}>
                    <Link to={PATHS.MAIN}>
                        <img
                            src='/Clever.svg'
                            alt='logo'
                            className='logo-clever'
                            style={{ opacity: `${collapsed ? 0 : 1}` }}
                        />
                        <img
                            src='/fit.svg'
                            alt='logo'
                            className={`logo-fit ${mobileWidth ? 'logo-collapsed' : ''}`}
                            style={
                                mobileWidth ? { opacity: `${collapsed ? 0 : 1}` } : { opacity: 1 }
                            }
                        />
                    </Link>
                </div>
                <Menu
                    theme='light'
                    mode='inline'
                    inlineIndent={mobileWidth ? 8 : 16}
                    className='menu'
                    onClick={onClick}
                    items={[
                        {
                            key: 'calendar',
                            icon: mobileWidth ? '' : <CalendarTwoTone twoToneColor='#061178' />,
                            label: collapsed ? '' : 'Календарь',
                        },
                        {
                            key: '2',
                            icon: mobileWidth ? '' : <HeartFilled style={{ color: '#061178' }} />,
                            label: collapsed ? '' : 'Тренировки',
                        },
                        {
                            key: '3',
                            icon: mobileWidth ? '' : <TrophyFilled style={{ color: '#061178' }} />,
                            label: collapsed ? '' : 'Достижения',
                        },
                        {
                            key: '4',
                            icon: mobileWidth ? '' : <IdcardOutlined style={{ color: '#061178' }} />,
                            label: collapsed ? '' : 'Профиль',
                        },
                        {
                            key: 'exit',
                            icon: mobileWidth ? '' : <ExitIcon />,
                            label: collapsed ? '' : 'Выход',
                        },
                    ]}
                />
            </Sider>
        </div>
    );
};
