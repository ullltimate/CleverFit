import React from 'react';
import { Card, Layout } from 'antd';

import './auth-page.css';

const { Content } = Layout;

type AuthChildren = {
    children: React.ReactNode
}

export const AuthPage: React.FC<AuthChildren> = ({ children }) => (
    <div className='auth-wrapper wrapper'>
        <Layout>
            <Content>
                <Card className='auth-card'>{children}</Card>
            </Content>
        </Layout>
    </div>
);
