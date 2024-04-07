import React, { useState } from 'react';
import { useGetTrainingPartnersQuery, useLazyGetUserJoinTrainListQuery } from '@services/catalogs';
import { Button, Card } from 'antd';

import { JoinUsers } from './join-users/join-users';

import './join-training.css';

export const JoinTraining: React.FC = () => {
    const { data: trainingsPartner } = useGetTrainingPartnersQuery();
    const [getUserJoinTrainList, {data: userJoinTrainList}] = useLazyGetUserJoinTrainListQuery();
    const [isChoiceJoinUser, setIsChoiceJoinUser] = useState(false);

    const randomChoice = () => {
        setIsChoiceJoinUser(true);
        getUserJoinTrainList();
    }

    return isChoiceJoinUser ? (
        <JoinUsers setIsChoiceJoinUser={setIsChoiceJoinUser} usersList={userJoinTrainList}/>
    ) : (
        <React.Fragment>
            <Card
                className='join-training-card'
                actions={[
                    <Button type='link' onClick={randomChoice}>Случайный выбор</Button>,
                    <Button type='text'>Выбор друга по моим видам тренировок </Button>,
                ]}
            >
                <h3 className='join-training-card__title'>
                    Хочешь тренироваться с тем, кто разделяет твои цели и темп?
                    <br />
                    Можешь найти друга для совместных тренировок среди других пользователей.
                </h3>
                <p className='join-training-card__text'>
                    Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                    уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                </p>
            </Card>
            <div className='join-trainings'>
                <h4 className='join-trainings__title'>Мои партнёры по тренировкам</h4>
                {!trainingsPartner?.length && (
                    <p className='join-trainings-eampty__text'>
                        У вас пока нет партнёров для совместных тренировок
                    </p>
                )}
            </div>
        </React.Fragment>
    );
};
