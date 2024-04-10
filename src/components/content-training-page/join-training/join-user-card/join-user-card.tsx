import React, { useEffect, useState } from 'react';
import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { removePartner } from '@redux/reducers/partners-slice';
import { TrainingPals } from '@services/catalogs';
import { useCancelInviteMutation } from '@services/invite';
import {  Button, Card, List, Tooltip } from 'antd';

import { CustomAvatar } from '../custom-avatar/custom-avatar';

import './join-user-card.css';
import { UserCardDescript } from '../user-card-descript/user-card-descript';

type JoinUserCardProps = {
    partner: TrainingPals;
    openDrawer: (trainName: string, userName: string, userImg: string | null, id: string) => void;
    index: number;
    isAccessSend: boolean;
    userIdForTrain: string | undefined;
    searchValue: string;
};

export const JoinUserCard: React.FC<JoinUserCardProps> = ({
    partner,
    openDrawer,
    index,
    isAccessSend,
    userIdForTrain,
    searchValue,
}) => {
    const [awaitConfirm, setAwaitConfirm] = useState(false);
    const [rejectedConfirm, setRejectedConfirm] = useState(false);
    const [acceptedConfirm, setAcceptedConfirm] = useState(false);
    const [cancelInvite] = useCancelInviteMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (partner.status === 'pending') setAwaitConfirm(true);
        if (partner.status === 'rejected') setRejectedConfirm(true);
        if (partner.status === 'accepted') setAcceptedConfirm(true);
    }, [partner]);

    useEffect(() => {
        if (isAccessSend && partner.id === userIdForTrain) setAwaitConfirm(true);
    }, [partner, isAccessSend, userIdForTrain]);

    const cancelTraining = async () => {
        await cancelInvite(partner.inviteId)
            .unwrap()
            .then(() => dispatch(removePartner(partner.id)))
            .catch(() => {});
    };

    return (
        <List.Item className='join-users-item'>
            <Card
                bordered={false}
                data-test-id={`joint-training-cards${index}`}
                className='item-user-card'
                style={{background: rejectedConfirm ? 'var(--color-bg-grey-light)' : ' var(--color-bg-blue)'}}
            >
                <CustomAvatar name={partner.name} imageSrc={partner.imageSrc} isUserCard={true} searchValue={searchValue}/>
                <UserCardDescript trainingType={partner.trainingType} avgWeightInWeek={partner.avgWeightInWeek}/>
                {acceptedConfirm ? (
                    <Button type='text' onClick={cancelTraining}>
                        Отменить тренировку
                    </Button>
                ) : (
                    <Button
                        type='primary'
                        disabled={awaitConfirm || rejectedConfirm}
                        onClick={() =>
                            openDrawer(
                                partner.trainingType,
                                partner.name,
                                partner.imageSrc,
                                partner.id,
                            )
                        }
                    >
                        Создать тренировку
                    </Button>
                )}
                {awaitConfirm && <p className='join-users-item__info'>ожидает подтверждения</p>}
                {rejectedConfirm && (
                    <Tooltip
                        title='повторный запрос будет доступнен через 2 недели'
                    >
                        <p className='join-users-item__info'>
                            тренировка отклонена <ExclamationCircleOutlined style={{color: 'var(--color-disabled)'}}/>
                        </p>
                    </Tooltip>
                )}
                {acceptedConfirm && (
                    <p className='join-users-item__info'>
                        тренировка одобрена <CheckCircleFilled style={{color: 'var(--color-success)'}}/>
                    </p>
                )}
            </Card>
        </List.Item>
    );
};
