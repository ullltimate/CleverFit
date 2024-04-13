import React, { useState } from 'react';
import { CustomBreadcrumb } from '@components/breadcrumb/custom-breadcrumb';
import { AuthItemsTab } from '@components/content-auth-page/tabs/tabs';
import { Header } from '@components/header/header';
import { useResize } from '@hooks/use-resize';
import { Card, Layout, Tabs } from 'antd';

import './achievements-page.css';

const { Content } = Layout;

export const AchievementsPage: React.FC = () => {
    const { windowSize } = useResize();
    const [key, setKey] = useState('week');

    const itemsTab: AuthItemsTab[] = [
        {
            label: 'За неделю',
            key: 'week',
            children: 'week',
        },
        {
            label: 'За месяц',
            key: 'month',
            children: 'month',
        },
        {
            label: 'За всё время (PRO)',
            key: 'allTime',
            children:'allTime',
        },
    ];

    return (
        <React.Fragment>
            <CustomBreadcrumb />
            <Header />
            <Content className='achievements-page-wrapper'>
                <Card className='achievements'>
                    <Tabs
                        activeKey={key}
                        centered={true}
                        tabBarGutter={windowSize<370 ? 5 : windowSize<1300 ? 65: 205}
                        tabBarStyle={{fontSize: 'var(--unit-24)'}}
                        items={itemsTab}
                        onChange={(k) => setKey(k)}
                    />
                </Card>
            </Content>
        </React.Fragment>
    );
};
