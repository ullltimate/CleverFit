import React from 'react';
import { Breadcrumb } from 'antd';

import './breadcrumb.css';

export const CustomBreadcrumb: React.FC = () => {
    return (
        <>
            <div className='breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </>
    );
};
