import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, Rate, Result } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import { StarTwoTone } from '@ant-design/icons';
import { Loader } from '@components/loader/Loader';
import { AllComments } from '@components/content-comments-page/allReviews/AllReviews';
import { EmptyComments } from '@components/content-comments-page/empty/EmptyComments';
import { useCreateReviewMutation, useGetFeedbacksQuery } from '@services/feedbacks';
import { PATHS } from '@constants/paths';
import { IFeedbacks } from '@tstypes/feedbacks';

import './comments-page.css';

export const CommentsPage: React.FC = () => {
    const navigate = useNavigate();
    const { data, isFetching, error } = useGetFeedbacksQuery();
    const [reviews, setReviews] = useState<IFeedbacks[]>();
    const [showAllComments, setShowAllComments] = useState<boolean>(false);
    const [isModalReview, setIsModalReview] = useState(false);
    const [isModalResult, setIsModalResult] = useState(false);
    const [isModalError, setIsModalError] = useState(false);
    const showModalError = () => setIsModalError(true);
    const handleCancelError = () => navigate(PATHS.MAIN);
    const showModalReview = () => setIsModalReview(true);
    const isShowAllComments = () => setShowAllComments(!showAllComments);
    const handleCancel = () => setIsModalReview(false);
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

    const changeRate = (value: number) => {
        value > 0 ? setIsSubmitDisabled(false) : setIsSubmitDisabled(true);
    };

    useEffect(() => {
        error && showModalError();
        data &&
            setReviews(
                [...data].sort(
                    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
                ),
            );
    }, [data, error]);

    return (
        <>
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
                <div className='modal-form'>
                    <Form
                        onValuesChange={(_, allValues) => setReview(allValues)}
                        initialValues={review}
                    >
                        <Form.Item name='rating'>
                            <Rate
                                onChange={changeRate}
                                allowClear
                                character={<StarTwoTone />}
                            ></Rate>
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
            <Modal
                open={isModalError}
                footer={null}
                centered
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
        </>
    );
};
