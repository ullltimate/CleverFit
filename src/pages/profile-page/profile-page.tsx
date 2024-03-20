import React from 'react';
import { Layout } from 'antd';
import { Header } from '@components/header/header';

import './profile-page.css';

const { Content } = Layout;

export const ProfilePage: React.FC = () => {
    
    return (
        <>
            <Header />
            <Content style={{ margin: 24 }}>
                <p>profile</p>
            </Content>
        </>
    );
};
