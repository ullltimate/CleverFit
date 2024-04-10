import React from 'react';
import { Button } from 'antd';

import './training-empty.css';

type EmptyTrainingProps = {
    openDrawer: () => void
}
export const EmptyTraining: React.FC<EmptyTrainingProps> = ({openDrawer}) => {
    const onClick = () => openDrawer();

    return (
        <div className='my-traning-empty'>
            <h3 className='my-traning-empty__title'>У вас ещё нет созданных тренировок</h3>
            <Button className='my-traning-empty__btn' data-test-id='create-new-training-button' type='primary' onClick={onClick}>Создать тренировку</Button>
        </div>
    )
};