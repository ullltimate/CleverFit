import React, { useCallback, useEffect, useState } from 'react';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { partnersSelector, setPartners } from '@redux/reducers/partners-slice';
import {
    useGetTrainingListQuery,
    useLazyGetUserJoinTrainListQuery,
} from '@services/catalogs';
import { useGetInviteQuery, useGetTrainingPartnersQuery } from '@services/invite';
import { useGetTrainingQuery } from '@services/trainings';
import { choiceFavoriteTrainType } from '@utils/join-trainings-healper';
import { Button, Card, List, Modal } from 'antd';

import { JoinMessage } from './join-message/join-message';
import { JoinUsers } from './join-users/join-users';
import { MyJoinUserCard } from './my-join-user-card/my-join-user-card';

import './join-training.css';

export const JoinTraining: React.FC = () => {
    const { data: trainingsPartner } = useGetTrainingPartnersQuery();
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList } = useGetTrainingListQuery();
    const { data: invitesList } = useGetInviteQuery();
    const [getUserJoinTrainList, { data: userJoinTrainList, isError }] =
        useLazyGetUserJoinTrainListQuery();
    const [isChoiceJoinUser, setIsChoiceJoinUser] = useState(false);
    const [favoriteTrainType, setFavoriteTrainType] = useState<string>();
    const [countMessage, setCountMessage] = useState(1);
    const [showAllMessage, setShowAllMessage] = useState(false);
    const { partners } = useAppSelector(partnersSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (showAllMessage && invitesList?.length) {
            setCountMessage(invitesList?.length);
        } else {
            setCountMessage(1);
        }
    }, [showAllMessage, invitesList]);

    useEffect(() => {
        if(trainingsPartner) dispatch(setPartners(trainingsPartner))
    },[dispatch, trainingsPartner])

    const modalError = useCallback(
        (isErrorList: boolean) => {
            Modal.error({
                className: 'error-list',
                centered: true,
                closable: true,
                maskClosable: true,
                closeIcon: (
                    <span data-test-id='modal-error-user-training-button-close'>
                        <CloseOutlined />
                    </span>
                ),
                maskStyle: { background: '#799CD41A', backdropFilter: 'blur(5px)' },
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        {isErrorList
                            ? 'При открытии данных произошла ошибка'
                            : 'При сохранении данных произошла ошибка '}
                    </span>
                ),
                content: (
                    <div>
                        <p data-test-id='modal-error-user-training-subtitle'>
                            {isErrorList ? 'Попробуйте ещё раз.' : 'Придётся попробовать ещё раз'}
                        </p>
                    </div>
                ),
                okText: (
                    <span data-test-id='modal-error-user-training-button'>
                        {isErrorList ? 'Обновить' : 'Закрыть'}
                    </span>
                ),
                onOk() {
                    getUserJoinTrainList();
                },
            });
        },
        [getUserJoinTrainList],
    );

    useEffect(() => {
        if (isError) modalError(true);
    }, [isError, modalError]);

    useEffect(() => {
        if (trainings && trainingList)
            setFavoriteTrainType(choiceFavoriteTrainType(trainings, trainingList));
    }, [trainings, trainingList]);
    console.log(favoriteTrainType)

    const randomChoiceUsers = async () => {
        await getUserJoinTrainList()
            .unwrap()
            .then(() => setIsChoiceJoinUser(true))
            .catch(() => {});
    };

    const choiceUsersForFavoriteType = async () => {
        await getUserJoinTrainList(favoriteTrainType)
            .unwrap()
            .then(() => setIsChoiceJoinUser(true))
            .catch(() => {});
    };

    return isChoiceJoinUser ? (
        <JoinUsers setIsChoiceJoinUser={setIsChoiceJoinUser} usersList={userJoinTrainList} />
    ) : (
        <React.Fragment>
            {invitesList?.length ? (
                <Card className='join-messages-wrapper'>
                    <p className='join-messages__text'>Новое сообщение ({invitesList.length})</p>
                    {invitesList.slice(0, countMessage).map((e) => (
                        <JoinMessage
                            key={e._id}
                            invite={e}
                            modallError={modalError}
                        />
                    ))}
                    {invitesList.length > 1 && (
                        <Button type='link' onClick={() => setShowAllMessage(!showAllMessage)}>
                            {showAllMessage ? (
                                <span>
                                    <UpOutlined /> Скрыть все сообщения
                                </span>
                            ) : (
                                <span>
                                    <DownOutlined /> Показать все сообщения
                                </span>
                            )}
                        </Button>
                    )}
                </Card>
            ) : null}
            <Card
                className='join-training-card'
                actions={[
                    <Button type='link' onClick={randomChoiceUsers}>
                        Случайный выбор
                    </Button>,
                    <Button type='text' onClick={choiceUsersForFavoriteType}>
                        Выбор друга по моим тренировкам
                    </Button>,
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
                {partners.length ? (
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={partners}
                        renderItem={(item, index) => (
                            <MyJoinUserCard
                                key={item.id}
                                partner={item}
                                index={index}
                                modallError={modalError}
                            />
                        )}
                        className='join-users'
                    />
                ) : (
                    <p className='join-trainings-eampty__text'>
                        У вас пока нет партнёров для совместных тренировок
                    </p>
                )}
            </div>
        </React.Fragment>
    );
};
