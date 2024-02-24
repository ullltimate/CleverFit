import React from 'react';
import { Card, Layout } from 'antd';
import { IAuthChildren } from '@tstypes/types';

import './auth-page.css';

const { Content } = Layout;

export const AuthPage: React.FC<IAuthChildren> = ({ children }) => {
    return (
        <>
            <div className='auth-wrapper wrapper'>
                <Layout>
                    <Content>
                        <Card className='auth-card'>{children}</Card>
                    </Content>
                </Layout>
            </div>
        </>
    );
};
