import React from 'react';
import { Comment, Avatar, Tooltip, Rate } from 'antd';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import { IFeedbacks } from '@tstypes/feedbacks';

import './CustomComment.css';

export const CustomComment: React.FC<IFeedbacks> = ({fullName, imageSrc, message, rating, createdAt}) => {
    return (
        <>
            <div className='comment'>
                <Comment
                    style={{ background: '#FFF' }}
                    avatar={
                        <>
                            <Avatar
                                src={imageSrc}
                                alt='Avatar'
                                size={42}
                                icon={<UserOutlined />}
                                style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                            />{' '}
                            <p className='comment-autor'>
                                {fullName ? `${fullName}` : 'Пользователь'}
                            </p>
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
        </>
    );
};
