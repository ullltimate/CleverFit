import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';

import './main-page.css';
import { Header } from '@components/header/header';
import { SiderBar } from '@components/siderBar/siderBar';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout className='back'>
                <SiderBar collapsed={collapsed}/>
                <Layout className="site-layout">
                  <Header />
                  <div className='trapezoid'>
                          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: () => setCollapsed(!collapsed),
                          })}
                      </div>
                  <Content
                    className="site-layout-background"
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                    }}
                  >
                    Content
                  </Content>
                </Layout>
            </Layout>
        </>
    );
};
