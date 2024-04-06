import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Training } from '@services/trainings';
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import './my-training-card.css';

type MyTrainingCardProps = {
    id: string;
    train: Training;
    isModalOpen: boolean;
    closeCard: () => void;
    editTraining: (e: Training) => void;
};

export const MyTrainingCard: React.FC<MyTrainingCardProps> = ({
    id,
    train,
    isModalOpen,
    closeCard,
    editTraining,
}) => (
    <div
        className='modal-training'
        style={{
            display: `${isModalOpen ? 'block' : 'none'}`,
        }}
    >
        {id === train._id && (
            <React.Fragment>
                <div className='create-exercise'>
                    <ArrowLeftOutlined
                        data-test-id='modal-exercise-training-button-close'
                        style={{ width: 16, marginTop: 12 }}
                        onClick={closeCard}
                    />
                    {train.name}
                </div>
                <div className='modal-content'>
                    <ul style={{ padding: '12px 0' }}>
                        {train.exercises
                            .filter((e) => e.name !== '')
                            .map((e) => (
                                <li key={uuidv4()} className='list-item'>
                                    <p style={{ color: 'var(--color-disabled)' }}>{e.name}</p>
                                </li>
                            ))}
                    </ul>
                </div>
                <Button
                    type='text'
                    className='modal-btn btn-text'
                    onClick={() => editTraining(train)}
                >
                    Добавить упражнения
                </Button>
            </React.Fragment>
        )}
    </div>
);
