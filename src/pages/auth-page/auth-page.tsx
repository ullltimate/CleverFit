import React from 'react';
import './auth-page.css';
import { Card, Layout } from 'antd';
import { IAuthChildren } from '../../types/types';

const { Content } = Layout;

export const AuthPage: React.FC<IAuthChildren> = ({children}) => {
    return (
        <>
            <div className='auth-wrapper wrapper'>
                <Layout>
                    <Content>
                        <Card className='auth-card'>
                            {children}
                        </Card>
                    </Content>
                </Layout>
            </div>
        </>
    );
};
