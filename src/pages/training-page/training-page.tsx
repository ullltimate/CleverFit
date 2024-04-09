import React, { useState } from 'react';
import { CustomBreadcrumb } from '@components/breadcrumb/custom-breadcrumb';
import { AuthItemsTab } from '@components/content-auth-page/tabs/tabs';
import { JoinTraining } from '@components/content-training-page/join-training/join-training';
import { MyTraining } from '@components/content-training-page/my-training/my-training';
import { Header } from '@components/header/header';
import { useResize } from '@hooks/use-resize';
import { useGetInviteQuery } from '@services/invite';
import { Badge, Card, Layout, Tabs } from 'antd';

import './training-page.css';

const { Content } = Layout;

export const TrainingPage: React.FC = () => {
    const windowSize = useResize();
    const [key, setKey] = useState('my-tranings');
    const {data} = useGetInviteQuery();
    const itemsTab: AuthItemsTab[] = [
        {
            label: 'Мои тренировки',
            key: 'my-tranings',
            children: <MyTraining />,
        },
        {
            label: <Badge count={data?.length}>Совместные тренировки</Badge>,
            key: 'join-trainings',
            children: <JoinTraining />,
        },
        {
            label: 'Марафоны',
            key: 'marathons',
            children:'marathons',
        },
    ];

    return (
        <React.Fragment>
            <CustomBreadcrumb />
            <Header />
            <Content style={{ padding: windowSize.windowSize < 370 ? '24px 0px' : 24 }}>
                <Card className='my-trainings' style={{ height: '100%' }}>
                    <Tabs
                        activeKey={key}
                        centered={true}
                        tabBarGutter={windowSize.windowSize<370 ? 5 : windowSize.windowSize<1300 ? 65: 205}
                        tabBarStyle={{fontSize: 'var(--unit-24)'}}
                        items={itemsTab}
                        onChange={(k) => setKey(k)}
                    />
                </Card>
            </Content>
        </React.Fragment>
    );
};
