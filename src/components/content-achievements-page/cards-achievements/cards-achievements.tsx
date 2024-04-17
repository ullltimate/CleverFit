import React, { useEffect, useState } from 'react';
import { Training } from '@services/trainings';
import { generalLoadForPeriod, getTotalApproaches, getTotalReplays } from '@utils/achievements-week-healper';
import { Card } from 'antd';

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
        <div style={{ display: 'flex' }}>
            <Card>
                <p>{totalLoad}</p>
                <p>Общая нагрузка, кг</p>
            </Card>
            <Card>
                <p>{dayLoad.toFixed(1)}</p>
                <p>Нагрузка в день, кг</p>
            </Card>
            <Card>
                <p>{countReplays}</p>
                <p>Количество повторений, раз</p>
            </Card>
            <Card>
                <p>{countApproaches}</p>
                <p>Подходы, раз</p>
            </Card>
        </div>
    );
};
