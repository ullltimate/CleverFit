import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TrainingPals } from '@services/catalogs';
import { Avatar, Button, Card, List } from 'antd';

import './join-user-card.css';

type JoinUserCardProps = {
    partner: TrainingPals;
};

export const JoinUserCard: React.FC<JoinUserCardProps> = ({ partner }) => {
    console.log(partner);

    return (
        <List.Item className='join-users-item'>
            <Card bordered={false}>
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
                <Button type='primary'>Создать тренировку</Button>
            </Card>
        </List.Item>
    );
};
