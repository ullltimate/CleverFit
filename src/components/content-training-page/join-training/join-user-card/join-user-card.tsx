import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TrainingPals } from '@services/catalogs';
import { Avatar, Button, Card, List } from 'antd';

import './join-user-card.css';

type JoinUserCardProps = {
    partner: TrainingPals;
    openDrawer: (trainName: string, userName: string, userImg: string | null, id: string) => void;
    index: number;
    isAccessSend: boolean;
    userIdForTrain: string | undefined;
    searchValue: string,
};

export const JoinUserCard: React.FC<JoinUserCardProps> = ({
    partner,
    openDrawer,
    index,
    isAccessSend,
    userIdForTrain,
    searchValue
}) => {
    const [awaitConfirm, setAwaitConfirm] = useState(false);
    const [rejectedConfirm, setRejectedConfirm] = useState(false);
    const [acceptedConfirm, setAcceptedConfirm] = useState(false);

    useEffect(() => {
        if (partner.status === 'pending') setAwaitConfirm(true);
        if (partner.status === 'rejected') setRejectedConfirm(true);
        if (partner.status === 'accepted') setAcceptedConfirm(true);
    }, [partner]);

    useEffect(() => {
        if (isAccessSend && partner.id === userIdForTrain) setAwaitConfirm(true);
    }, [partner, isAccessSend, userIdForTrain]);

    const highlightSubStr = () => {
        const reg = new RegExp(searchValue, 'gi');

        return searchValue ? partner.name.replace(reg, (match) => `<span>${match}</span>`) : partner.name
    }
    console.log(highlightSubStr())

    return (
        <List.Item className='join-users-item'>
            <Card bordered={false} data-test-id={`joint-training-cards${index}`}>
                <div>
                    <Avatar
                        size={42}
                        alt={partner.name}
                        src={partner.imageSrc}
                        icon={!partner.imageSrc && <UserOutlined />}
                    />
                    <h6 className='join-users-item__name' dangerouslySetInnerHTML={{__html: highlightSubStr()}}/>
                </div>
                <p>Тип тренировки: {partner.trainingType}</p>
                <p>Средняя нагрузка: {partner.avgWeightInWeek}</p>
                {acceptedConfirm ? (
                    <Button type='text'>Отменить тренировку</Button>
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
                {awaitConfirm && <p>ожидает подтверждения</p>}
                {rejectedConfirm && <p>тренировка отклонена</p>}
                {acceptedConfirm && <p>тренировка одобрена</p>}
            </Card>
        </List.Item>
    );
};
