import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { inviteStatus } from '@constants/invites';
import { Invite, useReplyInviteMutation } from '@services/invite';
import { createTypeTrainString } from '@utils/join-trainings-healper';
import { Avatar, Button, Comment, Tooltip } from 'antd';

import { DetailTraining } from './detail-training/detail-training';

import './join-message.css';

type JoinMessageProps = {
    invite: Invite;
    modallError: (isErrorList: boolean) => void;
};

export const JoinMessage: React.FC<JoinMessageProps> = ({ invite, modallError }) => {
    const [replyInvate] = useReplyInviteMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openCard = () => setIsModalOpen(true)
    const closeCard = () => setIsModalOpen(false)
    const acceptInvite = async() => {
        await replyInvate({
            id: invite._id,
            status: inviteStatus.accepted
        }).unwrap().then(() => {}).catch(() => modallError(false))
    }
    const rejectInvite = async() => {
        await replyInvate({
            id: invite._id,
            status: inviteStatus.rejected
        }).unwrap()
    }

    return (
        <div className='join-message'>
            <Comment
                avatar={
                    <React.Fragment>
                        <Avatar
                            src={invite.from.imageSrc}
                            alt='Avatar'
                            size={42}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                        />{' '}
                        <p className='message-autor'>{invite.from.firstName} {invite.from.lastName}</p>
                    </React.Fragment>
                }
                content={
                    <React.Fragment>
                        <div>
                            <p className='comment-text'>
                                Привет, я ищу партнёра для совместных [
                                {createTypeTrainString(invite.training.name)}]. Ты хочешь
                                присоединиться ко мне на следующих тренировках?
                            </p>
                            <div className='wrapper-btn-detail-message'>
                                <Button type='link' onClick={openCard}>Посмотреть детали тренировки</Button>
                                <DetailTraining training={invite.training} isModalOpen={isModalOpen} closeCard={closeCard}/>
                            </div>
                        </div>
                        <div className='message-btns-wrapper'>
                            <Button type='primary' onClick={acceptInvite}>Тренироваться вместе</Button>
                            <br />
                            <Button type='text' onClick={rejectInvite}>Отклонить запрос</Button>
                        </div>
                    </React.Fragment>
                }
                datetime={
                    <Tooltip>
                        <span>{new Date(invite.training.date).toLocaleDateString('ru')}</span>
                    </Tooltip>
                }
            />
        </div>
    );
};
