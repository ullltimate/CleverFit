import React from 'react';
import { Content } from 'antd/lib/layout/layout';
import { CustomComment } from '@components/content-comments-page/comment/CustomComment';

import './comments-page.css';


export const CommentsPage: React.FC = () => {

    return (
        <>
            <Content style={{ margin: 24 }}>
                <CustomComment />
            </Content>
        </>
    );
};
