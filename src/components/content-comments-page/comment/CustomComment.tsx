import React from 'react';
import { Comment, Avatar, Tooltip, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './CustomComment.css';

export const CustomComment: React.FC = () => {
    return (
        <>
            <div className='comment'>
                <Comment
                    style={{ background: '#FFF' }}
                    avatar={
                        <>
                            <Avatar
                                alt='Avatar'
                                size={42}
                                icon={<UserOutlined />}
                                style={{ backgroundColor: '#F5F5F5', color: '#262626' }}
                            />{' '}
                            <p className='comment-autor'>Вероника Киверова</p>
                        </>
                    }
                    content={
                        <p className='comment-text'>
                            Я очень довольна этим приложением! Оно помогает мне следить за своим
                            здоровьем и физической формой, предлагая разнообразные упражнения и
                            питание. Я люблю, что приложение адаптируется к моему уровню и целям, и
                            дает мне полезные советы и обратную связь. Я рекомендую это приложение
                            всем, кто хочет улучшить свою жизнь!
                        </p>
                    }
                    datetime={
                        <>
                            <Rate disabled defaultValue={3} />
                            <Tooltip>
                                <span>20.03.2022</span>
                            </Tooltip>
                        </>
                    }
                />
            </div>
        </>
    );
};
