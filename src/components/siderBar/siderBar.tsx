import {
    HeartFilled,
    TrophyFilled,
    IdcardOutlined,
    CalendarTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './siderBar.css';
import { ExitIcon } from '@components/icons/exitIcon';
const { Sider } = Layout;



export const SiderBar: React.FC = () => {
    const [widthCollapsed, setWidthCollapsed] = useState(64);
    const [collapsed, setCollapsed] = useState(false);
    const [mobileWidth, setMobileWidth] = useState(false);

    function changeBreakpoint(broken: boolean){
      if(broken){
        setWidthCollapsed(1);
        setMobileWidth(true);
      }else{
        setWidthCollapsed(64);
        setMobileWidth(false);
      }
    }

    return (
        <>
          <div className='sider-wrapper'>
            <div className={`trapezoid-wrapper ${mobileWidth ? collapsed ? ' ' : 'trapezoid-wrapper-collapsed': ''}`}>
              <div className='trapezoid' data-test-id={`${mobileWidth ? 'sider-switch-mobile' : 'sider-switch'}`}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                })}
              </div>
            </div>
            <Sider trigger={null} collapsible collapsed={collapsed} 
              theme='light' 
              width={208} 
              style={{height: '100%'}}
              collapsedWidth={widthCollapsed}
              breakpoint='xs'
              onBreakpoint={(broken)=> changeBreakpoint(broken)}
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
          </div>
        </>
    );
};
