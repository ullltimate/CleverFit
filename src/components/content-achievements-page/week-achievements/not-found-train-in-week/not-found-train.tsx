import React from 'react';

import './not-found-train.css';

type NotFoundTrainProps = {
    isMonth?: boolean;
}

export const NotFoundTrain: React.FC<NotFoundTrainProps> = ({isMonth}) => (
        <div className='not-found-train'>
            <div className='not-found-train__img'/>
            <h3 className='not-found-train__title'>Ой, такой тренировки {isMonth ? <span>в этом месяце</span> : <span>на этой неделе</span>} не было.</h3>
        </div>
    );
