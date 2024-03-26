import React, { useState } from 'react';
import { CheckOutlined, ExclamationCircleOutlined,} from '@ant-design/icons';
import { ButtonsComment } from '@components/content-comments-page/buttons-comment/buttons-comment';
import { ModalCreateComment } from '@components/content-comments-page/modal-create-comment/modal-create-comment';
import { Header } from '@components/header/header';
import { useGetTariffListQuery } from '@services/catalogs';
import { Button, Card, Col, Layout, List, Row, Switch, Tooltip } from 'antd';

import './settings-page.css';

const { Content } = Layout;

export const SettingsPage: React.FC = () => {
    const { data: tariffList } = useGetTariffListQuery();
    const [isModalReview, setIsModalReview] = useState(false);
    const showModalReview = (): void => setIsModalReview(true);
    const handleCancel = (): void => setIsModalReview(false);

    console.log(tariffList);

    const onChangeJointTraining = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };
    const onChangesendNotification = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };
    const onChangeTheme = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <React.Fragment>
            <Header />
            <Content style={{ padding: 24, background: 'var(--color-bg-grey)' }}>
                <Card className='settings' style={{ height: '100%' }}>
                    <h4 className='settings-title'>Мой тариф</h4>
                    <div className='site-card-wrapper'>
                        <Row gutter={16}>
                            <Col>
                                <Card
                                    className='settings-card'
                                    title='FREE tarif'
                                    extra={<Button type='link'>Подробнее</Button>}
                                    bordered={true}
                                >
                                    <img src='./free-tariff.jpg' alt='free-tariff' />
                                    <Button type='text' className='setting-card__btn'>
                                        активен <CheckOutlined />
                                    </Button>
                                </Card>
                            </Col>
                            <Col>
                                <Card
                                    className='settings-card'
                                    title='PRO tarif'
                                    extra={<Button type='link'>Подробнее</Button>}
                                    bordered={true}
                                >
                                    <img src='./pro-tariff-disable.jpg' alt='free-tariff' />
                                    <Button type='primary' className='setting-card__btn'>
                                        Активировать
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <List className='settings-list'>
                        <List.Item className='settings-item'>
                            <p className='settings-item__text'>
                                Открыт для совместных тренировок
                                <Tooltip
                                    placement='bottomLeft'
                                    title={
                                        <span>
                                            включеная функция позволит участвовать в совместных
                                            тренировках
                                        </span>
                                    }
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </p>
                            <Switch defaultChecked={true} onChange={onChangeJointTraining} />
                        </List.Item>
                        <List.Item className='settings-item'>
                            <p className='settings-item__text'>
                                Уведомления
                                <Tooltip
                                    placement='bottomLeft'
                                    title={
                                        <span>
                                            включеная функция позволит получать уведомления об
                                            активностях
                                        </span>
                                    }
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </p>
                            <Switch onChange={onChangesendNotification} />
                        </List.Item>
                        <List.Item className='settings-item'>
                            <p className='settings-item__text'>
                                Тёмная тема
                                <Tooltip
                                    placement='bottomLeft'
                                    title={<span>темная тема доступна для PRO tariff</span>}
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </p>
                            <Switch disabled={true} onChange={onChangeTheme} />
                        </List.Item>
                    </List>
                    <ButtonsComment showModalReview={showModalReview}/>
                    <ModalCreateComment isModalReview={isModalReview} handleCancel={handleCancel} showModalReview={showModalReview}/>
                </Card>
            </Content>
        </React.Fragment>
    );
};
