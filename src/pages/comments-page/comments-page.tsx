import React, { useState } from 'react';
import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { CustomComment } from '@components/content-comments-page/comment/CustomComment';
import { useGetFeedbacksQuery } from '@services/feedbacks';

import './comments-page.css';

export const CommentsPage: React.FC = () => {
    const { data } = useGetFeedbacksQuery();
    const [showAllComments, setShowAllComments] = useState<boolean>(false);

    return (
        <>
            <Content style={{ margin: 24 }}>
                <div className='comments-list'>
                    {data
                        ? showAllComments
                            ? data.map((e) => (
                                  <CustomComment
                                      key={e.id}
                                      createdAt={e.createdAt}
                                      fullName={e.fullName}
                                      imageSrc={e.imageSrc}
                                      rating={e.rating}
                                      message={e.message}
                                  />
                              ))
                            : data
                                  .slice(0, 4)
                                  .map((e) => (
                                      <CustomComment
                                          key={e.id}
                                          createdAt={e.createdAt}
                                          fullName={e.fullName}
                                          imageSrc={e.imageSrc}
                                          rating={e.rating}
                                          message={e.message}
                                      />
                                  ))
                        : ''}
                </div>
                <div className='comments-btns'>
                    <Button type='primary'>Написать отзыв</Button>
                    <Button type='link' onClick={() => setShowAllComments(!showAllComments)}>
                        {showAllComments ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                    </Button>
                </div>
            </Content>
        </>
    );
};
