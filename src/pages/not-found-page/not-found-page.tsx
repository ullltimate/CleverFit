import React from 'react';
import { Header } from '@components/header/header';
import { Layout } from 'antd';

import './not-found-page.css';

const { Content } = Layout;

export const NotFoundPage: React.FC = () => (
        <React.Fragment>
            <Header />
            <Content style={{ margin: 24 }}> 
                Not Found page
            </Content>
        </React.Fragment>
    );
