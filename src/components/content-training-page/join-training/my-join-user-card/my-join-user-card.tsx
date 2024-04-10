import React, { useState } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResize } from '@hooks/use-resize';
import { removePartner } from '@redux/reducers/partners-slice';
import { TrainingPals } from '@services/catalogs';
import { useCancelInviteMutation } from '@services/invite';
import { Button, Card, List, Modal } from 'antd';

import { CustomAvatar } from '../custom-avatar/custom-avatar';
import { UserCardDescript } from '../user-card-descript/user-card-descript';

import './my-join-user-card.css';

type MyJoinUserCardProps = {
    partner: TrainingPals;
    index: number;
    modallError: (isErrorList: boolean) => void;
};

export const MyJoinUserCard: React.FC<MyJoinUserCardProps> = ({ partner, index, modallError }) => {
    const [cancelInvite] = useCancelInviteMutation();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { windowSize } = useResize();

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const cancelTraining = async () => {
        await cancelInvite(partner.inviteId)
            .unwrap()
            .then(() => dispatch(removePartner(partner.id)))
            .catch(() => modallError(false));
        handleCancel();
    };

    return (
        <React.Fragment>
            <List.Item className='my-join-users-item' onClick={showModal}>
                <Card bordered={true} data-test-id={`joint-training-cards${index}`} style={{width: windowSize<370 ? 315 : 235, marginRight: windowSize<370 ? 0 : 16}}>
                    <CustomAvatar
                        name={partner.name}
                        imageSrc={partner.imageSrc}
                        isUserCard={false}
                    />
                    <UserCardDescript
                        trainingType={partner.trainingType}
                        avgWeightInWeek={partner.avgWeightInWeek}
                    />
                </Card>
            </List.Item>
            <Modal
                open={open}
                maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
                bodyStyle={{ padding: windowSize < 370 ? '16px 12px' : '40px 64px 40px 32px' }}
                centered={true}
                onCancel={handleCancel}
                footer={null}
                data-test-id='partner-modal'
            >
                <div className='partner-modal-wrap'>
                    <CustomAvatar
                        name={partner.name}
                        imageSrc={partner.imageSrc}
                        isUserCard={false}
                    />
                    <UserCardDescript
                        trainingType={partner.trainingType}
                        avgWeightInWeek={partner.avgWeightInWeek}
                    />
                </div>
                <div className='partner-modal-wrap'>
                    <p className='join-users-item__info'>
                        тренировка одобрена{' '}
                        <CheckCircleFilled style={{ color: 'var(--color-success)' }} />
                    </p>
                    <Button type='text' onClick={cancelTraining}>
                        Отменить тренировку
                    </Button>
                </div>
            </Modal>
        </React.Fragment>
    );
};
