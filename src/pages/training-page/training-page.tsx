import React, { useState } from 'react';
import { CustomBreadcrumb } from '@components/breadcrumb/custom-breadcrumb';
import { AuthItemsTab } from '@components/content-auth-page/tabs/tabs';
import { JoinTraining } from '@components/content-training-page/join-training/join-training';
import { MyTraining } from '@components/content-training-page/my-training/my-training';
import { Header } from '@components/header/header';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useResize } from '@hooks/use-resize';
import { partnersSelector } from '@redux/reducers/partners-slice';
import { useGetInviteQuery } from '@services/invite';
import { Badge, Card, Layout, Tabs } from 'antd';

import './training-page.css';

const { Content } = Layout;

export const TrainingPage: React.FC = () => {
    const { windowSize } = useResize();
    const [key, setKey] = useState('my-tranings');
    const {data} = useGetInviteQuery();
    const { partners } = useAppSelector(partnersSelector);
    const itemsTab: AuthItemsTab[] = [
        {
            label: 'Мои тренировки',
            key: 'my-tranings',
            children: <MyTraining />,
        },
        {
            label: <span>Совместные тренировки <Badge count={partners.length<4 ? data?.length : 0}/></span>,
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
            <Content  className='training-page-wrapper'>
                <Card className='my-trainings'>
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
