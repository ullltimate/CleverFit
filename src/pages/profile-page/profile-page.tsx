import React from 'react';
import { Header } from '@components/header/header';
import { Layout } from 'antd';

import './profile-page.css';

const { Content } = Layout;

export const ProfilePage: React.FC = () => (
        <React.Fragment>
            <Header />
            <Content style={{ margin: 24 }}>
                <p>profile</p>
            </Content>
        </React.Fragment>
    );
