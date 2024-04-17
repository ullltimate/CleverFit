import React, { useEffect, useState } from 'react';
import { Training } from '@services/trainings';
import {
    getMostReapetedTrain,
    getMostRepitedExercise,
} from '@utils/achievements-week-healper';

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
                <div>
                    <span>Самая частая тренировка </span>
                    <span>{train?.toLocaleLowerCase()}</span>
                </div>
            )}
            <div>
                <span>Самое частое упражнение </span>
                <span>{exercise}</span>
            </div>
        </div>
    );
};
