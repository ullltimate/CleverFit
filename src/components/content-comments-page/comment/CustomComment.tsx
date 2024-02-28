import React from 'react';
import { Comment, Avatar, Tooltip, Rate } from 'antd';

import './CustomComment.css';

export const CustomComment: React.FC = () => {
    return (
        <>
            <div className='comment'>
                <Comment
                    style={{ background: '#FFF' }}
                    avatar={
                        <>
                            <Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />{' '}
                            <p className='comment-autor'>Вероника Киверова</p>
                        </>
                    }
                    content={
                        <p>
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
                            <Tooltip title='2016-11-22 11:22:33'>
                                <span>8 hours ago</span>
                            </Tooltip>
                        </>
                    }
                />
            </div>
        </>
    );
};
