import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { removePartner } from '@redux/reducers/partners-slice';
import { TrainingPals } from '@services/catalogs';
import { useCancelInviteMutation } from '@services/invite';
import { Avatar, Button, Card, List, Modal } from 'antd';

import './my-join-user-card.css';

type MyJoinUserCardProps = {
    partner: TrainingPals;
    index: number;
    modallError: (isErrorList: boolean) => void;
};

export const MyJoinUserCard: React.FC<MyJoinUserCardProps> = ({ partner, index, modallError }) => {
    console.log(partner);
    const [cancelInvite] = useCancelInviteMutation();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const cancelTraining = async() => {
        await cancelInvite(partner.inviteId).unwrap().then(() => dispatch(removePartner(partner.id))).catch(() => modallError(false))
        handleCancel();
    }

    return (
        <React.Fragment>
            <List.Item className='my-join-users-item' onClick={showModal}>
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
                </Card>
            </List.Item>
            <Modal open={open} onCancel={handleCancel} footer={null} data-test-id='partner-modal'>
                <div>
                    <Avatar
                        size={42}
                        alt={partner.name}
                        src={partner.imageSrc}
                        icon={!partner.imageSrc && <UserOutlined />}
                    />

                    <h6>{partner.name}</h6>
                </div>
                <p>тренировка одобрена</p>
                <p>Тип тренировки: {partner.trainingType}</p>
                <p>Средняя нагрузка: {partner.avgWeightInWeek}</p>
                <Button type='text' onClick={cancelTraining}>Отменить тренировку</Button>
            </Modal>
        </React.Fragment>
    );
};
