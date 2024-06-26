import React from 'react';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { Feedbacks } from '@tstypes/feedbacks';
import { Avatar, Comment, Rate,Tooltip } from 'antd';

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
                avatar={
                    <React.Fragment>
                        <Avatar
                            src={imageSrc}
                            alt='Avatar'
                            size={42}
                            icon={<UserOutlined />}
                            className='comment-avatar'
                        />{' '}
                        <p className='comment-autor'>{fullName || 'Пользователь'}</p>
                    </React.Fragment>
                }
                content={<p className='comment-text'>{message}</p>}
                datetime={
                    <React.Fragment>
                        <Rate disabled={true} defaultValue={rating} character={<StarTwoTone />} />
                        <Tooltip>
                            <span>{new Date(createdAt).toLocaleDateString('ru')}</span>
                        </Tooltip>
                    </React.Fragment>
                }
            />
        </div>
    );

