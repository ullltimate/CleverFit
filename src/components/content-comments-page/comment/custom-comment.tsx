import React from 'react';
import { Comment, Avatar, Tooltip, Rate } from 'antd';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { Feedbacks } from '@tstypes/feedbacks';

import './custom-comment.css';

export const CustomComment: React.FC<Feedbacks> = ({
    fullName,
    imageSrc,
    message,
    rating,
    createdAt,
}) => (
        <div className='comment'>
            <Comment
                style={{ background: 'var(--color-bg-card)' }}
                avatar={
                    <>
                        <Avatar
                            src={imageSrc}
                            alt='Avatar'
                            size={42}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                        />{' '}
                        <p className='comment-autor'>{fullName || 'Пользователь'}</p>
                    </>
                }
                content={<p className='comment-text'>{message}</p>}
                datetime={
                    <>
                        <Rate disabled defaultValue={rating} character={<StarTwoTone />} />
                        <Tooltip>
                            <span>{new Date(createdAt).toLocaleDateString('ru')}</span>
                        </Tooltip>
                    </>
                }
            />
        </div>
    );

