import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Invite } from '@services/invite';
import { createTypeTrainString } from '@utils/join-trainings-healper';
import { Avatar, Button, Comment, Tooltip } from 'antd';

import { DetailTraining } from './detail-training/detail-training';

import './join-message.css';

type JoinMessageProps = {
    invite: Invite;
};

export const JoinMessage: React.FC<JoinMessageProps> = ({ invite }) => {
    console.log(invite);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openCard = () => setIsModalOpen(true)
    const closeCard = () => setIsModalOpen(false)

    return (
        <div className='join-message'>
            <Comment
                style={{ background: 'var(--color-bg-card)' }}
                avatar={
                    <React.Fragment>
                        <Avatar
                            src={invite.from.imageSrc}
                            alt='Avatar'
                            size={42}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                        />{' '}
                        <p className='message-autor'>{invite.from.firstName || 'Пользователь'}</p>
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
                            <Button type='link' onClick={openCard}>Посмотреть детали тренировки</Button>
                            <DetailTraining training={invite.training} isModalOpen={isModalOpen} closeCard={closeCard}/>
                        </div>
                        <div>
                            <Button type='primary'>Тренироваться вместе</Button>
                            <br />
                            <Button type='text'>Отклонить запрос</Button>
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
