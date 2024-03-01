import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Rate, Result } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import { CustomComment } from '@components/content-comments-page/comment/CustomComment';
import { Loader } from '@components/loader/Loader';
import { EmptyComments } from '@components/content-comments-page/empty/EmptyComments';
import { useCreateReviewMutation, useGetFeedbacksQuery } from '@services/feedbacks';
import { IFeedbacks } from '@tstypes/feedbacks';

import './comments-page.css';

export const CommentsPage: React.FC = () => {
    const { data, isFetching } = useGetFeedbacksQuery();
    const [reviews, setReviews] = useState<IFeedbacks[]>();
    const [showAllComments, setShowAllComments] = useState<boolean>(false);
    const [isModalReview, setIsModalReview] = useState(false);
    const [isModalResult, setIsModalResult] = useState(false);
    const showModalReview = () => setIsModalReview(true);
    const handleCancel = () => setIsModalReview(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [review, setReview] = useState({ message: '', rating: 0 });
    const [createReview] = useCreateReviewMutation();
    const [isSuccess, setIsSuccess] = useState(false);

    const createComment = async () => {
        await createReview(review)
            .unwrap()
            .then(() => {
                setReview({ message: '', rating: 0 });
                setIsModalReview(false);
                setIsSuccess(true);
                setIsModalResult(true);
            })
            .catch(() => {
                setIsSuccess(false);
                setIsModalReview(false);
                setIsModalResult(true);
            });
    };

    const changeRate = (value: number) => {
        value > 0 ? setIsSubmitDisabled(false) : setIsSubmitDisabled(true);
    };

    useEffect(() => {
        data &&
            setReviews(
                [...data].sort(
                    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
                ),
            );
    }, [data]);

    return (
        <>
            <Content style={{ margin: 24 }}>
                {isFetching && <Loader />}
                <EmptyComments showModalReview={showModalReview}/>
                <div className='comments-list'>
                    {reviews &&
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
                open={isModalReview}
                onCancel={handleCancel}
                footer={[
                    <Button
                        type='primary'
                        key='submit'
                        htmlType='submit'
                        disabled={isSubmitDisabled}
                        onClick={createComment}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>,
                ]}
            >
                <Form
                    onValuesChange={(_, allValues) => setReview(allValues)}
                    initialValues={review}
                >
                    <Form.Item name='rating'>
                        <Rate onChange={changeRate} allowClear></Rate>
                    </Form.Item>
                    <Form.Item name='message'>
                        <TextArea
                            placeholder='Autosize height with minimum and maximum number of lines'
                            autoSize={{ minRows: 2, maxRows: 10 }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                open={isModalResult}
                footer={null}
                centered
                closable={false}
                maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
            >
                {isSuccess ? (
                    <div className='modal-success'>
                        <Result
                            status='success'
                            title='Отзыв успешно опубликован'
                            extra={
                                <Button type='primary' onClick={() => setIsModalResult(false)}>
                                    Отлично
                                </Button>
                            }
                        />
                    </div>
                ) : (
                    <div className='modal-error'>
                        <Result
                            status='error'
                            title='Данные не сохранились'
                            subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                            extra={[
                                <Button
                                    type='primary'
                                    key='newReview'
                                    onClick={() => {
                                        setIsModalResult(false);
                                        setIsModalReview(true);
                                    }}
                                    data-test-id='write-review-not-saved-modal'
                                >
                                    Написать отзыв
                                </Button>,
                                <Button
                                    type='text'
                                    key='close'
                                    onClick={() => setIsModalResult(false)}
                                >
                                    Закрыть
                                </Button>,
                            ]}
                        />
                    </div>
                )}
            </Modal>
        </>
    );
};
