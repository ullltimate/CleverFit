import React, { useState } from 'react';
import { CustomBreadcrumb } from '@components/breadcrumb/custom-breadcrumb';
import { MonthAchievements } from '@components/content-achievements-page/month-achievements/month-achievements';
import { WeekAchievements } from '@components/content-achievements-page/week-achievements/week-achievements';
import { AuthItemsTab } from '@components/content-auth-page/tabs/tabs';
import { Header } from '@components/header/header';
import { useResize } from '@hooks/use-resize';
import { useGetTrainingListQuery } from '@services/catalogs';
import { useGetTrainingQuery } from '@services/trainings';
import { Card, Layout, Tabs } from 'antd';

import './achievements-page.css';

const { Content } = Layout;

export const AchievementsPage: React.FC = () => {
    const { windowSize } = useResize();
    const [key, setKey] = useState('week');
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList } = useGetTrainingListQuery();

    const itemsTab: AuthItemsTab[] = [
        {
            label: 'За неделю',
            key: 'week',
            children: <WeekAchievements trainings={trainings} trainingList={trainingList}/>,
        },
        {
            label: 'За месяц',
            key: 'month',
            children: <MonthAchievements trainings={trainings} trainingList={trainingList}/>,
        },
        {
            label: 'За всё время (PRO)',
            key: 'allTime',
            children:'allTime',
            disabled: true,
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
                        destroyInactiveTabPane={true}
                        tabBarGutter={windowSize<370 ? 10 : windowSize<1300 ? 105: 305}
                        tabBarStyle={{fontSize: 'var(--unit-24)'}}
                        items={itemsTab}
                        onChange={(k) => setKey(k)}
                    />
                </Card>
            </Content>
        </React.Fragment>
    );
};
