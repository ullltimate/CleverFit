import React from 'react';
import { Button } from 'antd';
import { CustomComment } from '../comment/CustomComment';
import { IFeedbacks } from '@tstypes/feedbacks';

import './AllReviews.css';


type IAllCommentsProps = {
    showModalReview: () => void;
    reviews: IFeedbacks[];
    showAllComments: boolean;
    isShowAllComments: () => void;
};

export const AllComments: React.FC<IAllCommentsProps> = ({ showModalReview, reviews, showAllComments, isShowAllComments}) => {
    return (
        <>
            <div className='comments-list'>
                {
                    (showAllComments
                        ? reviews.map((e: IFeedbacks) => (
                              <CustomComment
                                  key={e.id}
                                  createdAt={e.createdAt}
                                  fullName={e.fullName}
                                  imageSrc={e.imageSrc}
                                  rating={e.rating}
                                  message={e.message}
                              />
                          ))
                        : reviews
                              .slice(0, 4)
                              .map((e: IFeedbacks) => (
                                  <CustomComment
                                      key={e.id}
                                      createdAt={e.createdAt}
                                      fullName={e.fullName}
                                      imageSrc={e.imageSrc}
                                      rating={e.rating}
                                      message={e.message}
                                  />
                              )))
                }
            </div>
            <div className='comments-btns'>
                <Button type='primary' onClick={showModalReview} data-test-id='write-review'>
                    Написать отзыв
                </Button>
                <Button
                    type='link'
                    onClick={isShowAllComments}
                    data-test-id='all-reviews-button'
                >
                    {showAllComments ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </>
    );
};
