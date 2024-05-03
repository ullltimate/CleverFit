import React, { useEffect, useState } from 'react';
import { Training } from '@services/trainings';
import {
    getMostReapetedTrain,
    getMostRepitedExercise,
} from '@utils/achievements-week-healper';

import './most-reapeted-block.css'

type MostReapetedBlockProps = {
    filteredTrain: Training[];
    filterValue: string
};

export const MostReapetedBlock: React.FC<MostReapetedBlockProps> = ({ filteredTrain, filterValue }) => {
    const [train, setTrain] = useState<string | undefined>('');
    const [exercise, setExercise] = useState('');

    useEffect(() => {
        setTrain(getMostReapetedTrain(filteredTrain));
        setExercise(getMostRepitedExercise(filteredTrain).type)
    }, [filteredTrain]);

    return (
        <div>
            {filterValue === 'Все' && (
                <div className='reapeted-block'>
                    <p className='reapeted-block__subtitle'>Самая частая тренировка </p>
                    <p className='reapeted-block__title'>{train?.toLocaleLowerCase()}</p>
                </div>
            )}
            <div className='reapeted-block'>
                <p className='reapeted-block__subtitle'>Самое частое упражнение </p>
                <p className='reapeted-block__title'>{exercise.toLocaleLowerCase()}</p>
            </div>
        </div>
    );
};
