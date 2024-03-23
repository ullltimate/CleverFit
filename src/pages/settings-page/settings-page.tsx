import React from 'react';
import { Header } from '@components/header/header';
import { Layout } from 'antd';

import './settings-page.css';

const { Content } = Layout;

export const SettingsPage: React.FC = () => (
        <React.Fragment>
            <Header />
            <Content style={{ margin: 24 }}> 
                Settings page
            </Content>
        </React.Fragment>
    );
