import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TrainingPals } from '@services/catalogs';
import { Avatar, Button, Card, List } from 'antd';

import './join-user-card.css';

type JoinUserCardProps = {
    partner: TrainingPals;
    openDrawer: (trainName: string, userName: string, userImg: string | null, id: string) => void;
    index: number;
    isAccessSend:boolean;
    userIdForTrain: string | undefined;
};

export const JoinUserCard: React.FC<JoinUserCardProps> = ({ partner, openDrawer, index, isAccessSend, userIdForTrain }) => {
    const [awaitConfirm, setAwaitConfirm] = useState(false);

    useEffect(() => {
        if(partner.status === 'pending') setAwaitConfirm(true);
    }, [partner])

    useEffect(() => {
        if(isAccessSend && partner.id === userIdForTrain) setAwaitConfirm(true);
    },[partner, isAccessSend, userIdForTrain])

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

                    <h6>{partner.name}</h6>
                </div>
                <p>Тип тренировки: {partner.trainingType}</p>
                <p>Средняя нагрузка: {partner.avgWeightInWeek}</p>
                <Button type='primary' disabled={awaitConfirm} onClick={() => openDrawer(partner.trainingType, partner.name, partner.imageSrc, partner.id)}>Создать тренировку</Button>
                {awaitConfirm && <p>ожидает подтверждения</p>}
            </Card>
        </List.Item>
    );
};
