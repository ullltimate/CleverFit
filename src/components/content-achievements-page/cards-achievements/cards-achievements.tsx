import React, { useEffect, useState } from 'react';
import { Training } from '@services/trainings';
import { generalLoadForPeriod, getTotalApproaches, getTotalReplays } from '@utils/achievements-week-healper';
import { Card } from 'antd';

import './cards-achievements.css'

type CardsAchievementsProps = {
    filteredTrain: Training[],
};

export const CardsAchievements: React.FC<CardsAchievementsProps> = ({ filteredTrain }) => {
    const daysInWeek = 7;
    const [totalLoad, setTotalLoad] = useState<number>(0);
    const [dayLoad, setDayLoad] = useState<number>(0);
    const [countReplays, setCountReplays] = useState<number>(0);
    const [countApproaches, setCountApproaches] = useState<number>(0);

    useEffect(() => {
        setTotalLoad(generalLoadForPeriod(filteredTrain));
        setCountReplays(getTotalReplays(filteredTrain));
        setCountApproaches(getTotalApproaches(filteredTrain));
    },[filteredTrain])

    useEffect(() => {
        setDayLoad(totalLoad/daysInWeek)
    },[totalLoad])

    return (
        <div className='achiev-cards'>
            <Card className='achiev-card' bordered={true}>
                <p className='achiev-card__title'>{totalLoad}</p>
                <p className='achiev-card__subtitle'>Общая нагрузка, кг</p>
            </Card>
            <Card className='achiev-card' bordered={true}>
                <p className='achiev-card__title'>{(dayLoad % 1) === 0 ? dayLoad : dayLoad.toFixed(1)}</p>
                <p className='achiev-card__subtitle'>Нагрузка в день, кг</p>
            </Card>
            <Card className='achiev-card' bordered={true}>
                <p className='achiev-card__title'>{countReplays}</p>
                <p className='achiev-card__subtitle'> Количество повторений, раз</p>
            </Card>
            <Card className='achiev-card' bordered={true}>
                <p className='achiev-card__title'>{countApproaches}</p>
                <p className='achiev-card__subtitle'>Подходы, раз</p>
            </Card>
        </div>
    );
};
