import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarTwoTone } from '@ant-design/icons';
import { AllComments } from '@components/content-comments-page/all-reviews/all-reviews';
import { EmptyComments } from '@components/content-comments-page/empty/empty-comments';
import { Loader } from '@components/loader/loader';
import { PATHS } from '@constants/paths';
import { useCreateReviewMutation, useGetFeedbacksQuery } from '@services/feedbacks';
import { Feedbacks } from '@tstypes/feedbacks';
import { Button, Form, Modal, Rate, Result } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Content } from 'antd/lib/layout/layout';

import './comments-page.css';

export const CommentsPage: React.FC = () => {
    const navigate = useNavigate();
    const { data, isFetching, error } = useGetFeedbacksQuery();
    const [reviews, setReviews] = useState<Feedbacks[]>();
    const [showAllComments, setShowAllComments] = useState(false);
    const [isModalReview, setIsModalReview] = useState(false);
    const [isModalResult, setIsModalResult] = useState(false);
    const [isModalError, setIsModalError] = useState(false);
    const showModalError = (): void => setIsModalError(true);
    const handleCancelError = (): void => navigate(PATHS.MAIN);
    const showModalReview = (): void => setIsModalReview(true);
    const isShowAllComments = (): void => setShowAllComments(!showAllComments);
    const handleCancel = (): void => setIsModalReview(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [review, setReview] = useState({ message: '', rating: 0 });
    const [createReview, { isLoading }] = useCreateReviewMutation();
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

    const changeRate = (value: number): void => {
        if(value > 0) {
            setIsSubmitDisabled(false)
        } else {
            setIsSubmitDisabled(true)
        };
    };

    useEffect(() => {
        if(error) showModalError();
        if(data)
            setReviews(
                [...data].sort(
                    (a: Feedbacks, b: Feedbacks) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
                ),
            );
    }, [data, error]);

    return (
        <React.Fragment>
            <Content style={{ margin: 24 }}>
                {(isFetching || isLoading) && <Loader />}
                {reviews &&
                    (reviews.length === 0 ? (
                        <EmptyComments showModalReview={showModalReview} />
                    ) : (
                        <AllComments
                            showModalReview={showModalReview}
                            reviews={reviews}
                            showAllComments={showAllComments}
                            isShowAllComments={isShowAllComments}
                        />
                    ))}
            </Content>
            <Modal
                title='Ваш отзыв'
                centered={true}
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
                <div className='modal-form'>
                    <Form
                        onValuesChange={(_, allValues) => setReview(allValues)}
                        initialValues={review}
                    >
                        <Form.Item name='rating'>
                            <Rate
                                onChange={changeRate}
                                allowClear={true}
                                character={<StarTwoTone />}
                             />
                        </Form.Item>
                        <Form.Item name='message'>
                            <TextArea
                                placeholder='Autosize height with minimum and maximum number of lines'
                                autoSize={{ minRows: 2, maxRows: 10 }}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal
                open={isModalResult}
                footer={null}
                centered={true}
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
            <Modal
                open={isModalError}
                footer={null}
                centered={true}
                closable={false}
                maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
            >
                <div className='comments-modal'>
                    <Result
                        status='500'
                        title='Что-то пошло не так'
                        subTitle='Произошла ошибка, попробуйте ещё раз.'
                        extra={
                            <Button type='primary' onClick={handleCancelError}>
                                Назад
                            </Button>
                        }
                    />
                </div>
            </Modal>
        </React.Fragment>
    );
};
