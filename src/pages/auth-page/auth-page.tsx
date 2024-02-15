import React from 'react';
import './auth-page.css';
import { Card, Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const AuthPage: React.FC = () => {
    return (
        <>
            <div className='auth-wrapper wrapper'>
                <Layout>
                    <Content>
                        <Card className='auth-card'>
                            <Outlet />
                        </Card>
                    </Content>
                </Layout>
            </div>
        </>
    );
};
