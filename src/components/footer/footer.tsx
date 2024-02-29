import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card, Modal, Result } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Loader } from '@components/loader/Loader';
import { useLazyGetFeedbacksQuery } from '@services/feedbacks';
import { PATHS } from '@constants/paths';

import './footer.css';

const { Meta } = Card;

export const Footer: React.FC = () => {
    const navigate = useNavigate();
    const [getFeedbacks, { isLoading }] = useLazyGetFeedbacksQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const showReviews = () => {
        getFeedbacks()
            .unwrap()
            .then(() => navigate(PATHS.FEEDBACKS))
            .catch((error) => {
                if (error.status === 403) {
                    localStorage.removeItem('token');
                    navigate(PATHS.AUTH);
                } else {
                    showModal();
                }
            });
    };

    return (
        <>
            {isLoading && <Loader />}
            <footer className='footer'>
                <Row justify={'space-between'} wrap={true} style={{ flexWrap: 'wrap-reverse' }}>
                    <Col flex='none'>
                        <Button type='link' onClick={showReviews} data-test-id='see-reviews'>
                            Смотреть отзывы
                        </Button>
                    </Col>
                    <Col flex='none' className='footer-card'>
                        <Card
                            bordered={false}
                            actions={[
                                <Button type='text'>
                                    <AndroidFilled />
                                    Android OS
                                </Button>,
                                <Button type='text'>
                                    <AppleFilled />
                                    Apple iOS
                                </Button>,
                            ]}
                        >
                            <Meta
                                title={<a>Скачать на телефон </a>}
                                description='Доступно в PRO-тарифе'
                            />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    open={isModalOpen}
                    footer={null}
                    centered
                    closable={false}
                    maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
                >
                    <div className='footer-modal'>
                        <Result
                            status='500'
                            title='Что-то пошло не так'
                            subTitle='Произошла ошибка, попробуйте ещё раз.'
                            extra={
                                <Button type='primary' onClick={handleCancel}>
                                    Назад
                                </Button>
                            }
                        />
                    </div>
                </Modal>
            </footer>
        </>
    );
};
