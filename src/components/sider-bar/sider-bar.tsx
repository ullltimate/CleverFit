import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { ExitIcon } from '@components/icons/exit-icon';
import { PATHS } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { partnersSelector } from '@redux/reducers/partners-slice';
import { saveToken } from '@redux/reducers/token-slice';
import { resetUser } from '@redux/reducers/user-full-slice';
import { increment } from '@redux/reducers/user-slice';
import { useGetInviteQuery } from '@services/invite';
import { useLazyGetTrainingQuery } from '@services/trainings';
import { Badge, Layout, Menu } from 'antd';
import classNames from 'classnames';

import './sider-bar.css';

const { Sider } = Layout;

export const SiderBar: React.FC = () => {
    const [widthCollapsed, setWidthCollapsed] = useState<number>(64);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [mobileWidth, setMobileWidth] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [getTrainings] = useLazyGetTrainingQuery();
    const {data} = useGetInviteQuery();
    const { partners } = useAppSelector(partnersSelector);

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

    type Key = {
        key: string;
    };

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(increment({ email: '', password: '' }));
        dispatch(saveToken(''));
        navigate(PATHS.AUTH);
        dispatch(resetUser());
    };

    const onClick = ({ key }: Key) => {
        switch (key) {
            case 'exit':
                logOut();
                break;
            case 'calendar':
                getTrainings()
                    .unwrap()
                    .then(() => navigate(PATHS.CALENDAR));
                break;
            case 'profile':
                navigate(PATHS.PROFILE)
                break;
            case 'training':
                getTrainings()
                    .unwrap()
                    .then(() => navigate(PATHS.TRAINING))
                    .catch(() => {});
                break;
            case 'achievements':
                getTrainings()
                    .unwrap()
                    .then(() => navigate(PATHS.ACHIEVEMENTS))
                    .catch(() => {});
                break;
        }
    }

    return (
        <div className='sider-wrapper'>
            <div
                className={classNames('trapezoid-wrapper', {'trapezoid-wrapper-collapsed': (mobileWidth && !collapsed)})}
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
                collapsible={true}
                collapsed={collapsed}
                theme='light'
                width={mobileWidth ? 106 : 208}
                collapsedWidth={widthCollapsed}
                breakpoint='sm'
                onBreakpoint={(broken) => changeBreakpoint(broken)}
            >
                <div className={classNames({'logo-hidden': collapsed, 'logo-full': !collapsed})}>
                    <Link to={PATHS.MAIN}>
                        <div className='logo-clever' style={{ opacity: `${collapsed ? 0 : 1}` }}/>
                        <div className='logo-fit logo-collapsed'
                            style={
                                { opacity: `${(collapsed && mobileWidth) ? 0 : 1}` } 
                            }/>
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
                            icon: <CalendarTwoTone twoToneColor='#061178' className='menu-item-icon' />,
                            label: collapsed ? '' : 'Календарь',
                        },
                        {
                            key: 'training',
                            icon:  <Badge data-test-id='notification-about-joint-training' size='small' count={partners.length<4 ? data?.length : 0}><HeartFilled className='menu-item-icon' /></Badge>,
                            label: collapsed ? '' : 'Тренировки',
                        },
                        {
                            key: 'achievements',
                            icon: <TrophyFilled className='menu-item-icon' data-test-id='sidebar-achievements'/>,
                            label: collapsed ? '' : 'Достижения',
                        },
                        {
                            key: 'profile',
                            icon:  <IdcardOutlined className='menu-item-icon' />,
                            label: collapsed ? '' : 'Профиль',
                        },
                        {
                            key: 'exit',
                            icon:  <ExitIcon className='menu-item-icon' />,
                            label: collapsed ? '' : 'Выход',
                        },
                    ]}
                />
            </Sider>
        </div>
    );
};
