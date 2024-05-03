import React from 'react';

import './user-card-descript.css';

type UserCardDescriptProps = {
    trainingType: string;
    avgWeightInWeek: number
};

export const UserCardDescript: React.FC<UserCardDescriptProps> = ({
    trainingType,
    avgWeightInWeek
}) => (
        <div>
            <div className='join-users-item__descript'>
                <p>Тип тренировки:</p> <p>{trainingType}</p>
            </div>
            <div className='join-users-item__descript'>
                <p>Средняя нагрузка:</p> <p>{avgWeightInWeek} кг/нед</p>
            </div>
        </div>
    );
