import {
    HeartFilled,
    TrophyFilled,
    IdcardOutlined,
    CalendarTwoTone,
  } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import './siderBar.css';
import { ExitIcon } from '@components/icons/exitIcon';
const { Sider } = Layout;

type PropTypes = {
    collapsed: boolean
};

export const SiderBar: React.FC<PropTypes> = ({collapsed}) => {

    return (
        <>
            <Sider trigger={null} collapsible collapsed={collapsed} 
              theme='light' 
              width={208} 
              collapsedWidth={64}
            >
              <div className={`logo-${!collapsed ? 'full' : 'hidden'}`}>
                <a href="">
                    <img src="/Clever.svg" alt="" className='logo-clever' style={{opacity: `${!collapsed? 1: 0}`}}/>
                    <img src="/fit.svg" alt="" />
                </a>
              </div>
              <Menu
                theme="light"
                mode="inline"
                inlineIndent={16}
                className='menu'
                items={[
                  {
                    key: '1',
                    icon: <CalendarTwoTone twoToneColor='#061178'/>,
                    label: 'Календарь',
                  },
                  {
                    key: '2',
                    icon: <HeartFilled style={{color: '#061178'}}/>,
                    label: 'Тренировки',
                  },
                  {
                    key: '3',
                    icon: <TrophyFilled style={{color: '#061178'}}/>,
                    label: 'Достижения',
                  },
                  {
                    key: '4',
                    icon: <IdcardOutlined style={{color: '#061178'}}/>,
                    label: 'Профиль',
                  },
                  {
                    key: '5',
                    icon: <ExitIcon />,
                    label: 'Выход',
                  },
                ]}
              />
            </Sider>
        </>
    );
};
