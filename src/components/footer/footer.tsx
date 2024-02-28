import React from 'react';
import { Row, Col, Button, Card } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import './footer.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths';

const { Meta } = Card;

export const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <footer className='footer'>
                <Row justify={'space-between'} wrap={true} style={{ flexWrap: 'wrap-reverse' }}>
                    <Col flex='none'>
                        <Button type='link' onClick={() => navigate(PATHS.FEEDBACKS)} data-test-id='see-reviews'>Смотреть отзывы</Button>
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
            </footer>
        </>
    );
};
