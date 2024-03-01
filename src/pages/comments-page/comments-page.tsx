import React, { useState } from 'react';
import { Button, Modal, Rate } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import { CustomComment } from '@components/content-comments-page/comment/CustomComment';
import { useGetFeedbacksQuery } from '@services/feedbacks';

import './comments-page.css';

export const CommentsPage: React.FC = () => {
    const { data } = useGetFeedbacksQuery();
    const [showAllComments, setShowAllComments] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const changeRate = (e: number) => {
        e > 0 ? setIsSubmitDisabled(false) : setIsSubmitDisabled(true)
    }

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
                    <Button type='primary' onClick={showModal} data-test-id='write-review'>
                        Написать отзыв
                    </Button>
                    <Button
                        type='link'
                        onClick={() => setShowAllComments(!showAllComments)}
                        data-test-id='all-reviews-button'
                    >
                        {showAllComments ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                    </Button>
                </div>
            </Content>
            <Modal
                title='Ваш отзыв'
                centered
                maskStyle={{ background: '#799CD41A', backdropFilter: 'blur(5px)' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button
                        type='primary'
                        key='submit'
                        htmlType='submit'
                        disabled={isSubmitDisabled}
                        onClick={handleOk}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>,
                ]}
            >
                <Rate
                    onChange={changeRate}
                    allowClear
                ></Rate>
                <TextArea
                    placeholder='Autosize height with minimum and maximum number of lines'
                    autoSize={{ minRows: 2, maxRows: 10 }}
                />
            </Modal>
        </>
    );
};
