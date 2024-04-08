import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { colorTrainings } from '@constants/calendar';
import { Training } from '@services/trainings';
import { createPeriodString } from '@utils/my-trainings-healper';
import { Badge } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import './detail-training.css';

type DetailTrainingProps = {
    training: Training;
    isModalOpen: boolean;
    closeCard: () => void;
};

export const DetailTraining: React.FC<DetailTrainingProps> = ({
    training,
    isModalOpen,
    closeCard,
}) => (
    <div
        className='modal-training'
        data-test-id='joint-training-review-card'
        style={{
            display: `${isModalOpen ? 'block' : 'none'}`,
        }}
    >
        <div className='create-exercise'>
            <Badge color={colorTrainings.find((el) => el.name === training.name)?.color} text={training.name} />
            <CloseOutlined 
                style={{ width: 16, marginTop: 12 }}
                onClick={closeCard}
            />
        </div>
        <div className='modal-content'>
            <p>{createPeriodString(training.parameters.period)}</p>
            <p>{new Date(training.date).toLocaleDateString('ru')}</p>
            <ul style={{ padding: '12px 0' }}>
                {training.exercises
                    .filter((e) => e.name !== '')
                    .map((e) => (
                        <li key={uuidv4()} className='list-item'>
                            <p style={{ color: 'var(--color-disabled)' }}>{e.name}</p>
                            <p>{e.replays}х{e.weight}</p>
                        </li>
                    ))}
            </ul>
        </div>
    </div>
);
