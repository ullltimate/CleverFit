import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { ButtonsComment } from '@components/content-comments-page/buttons-comment/buttons-comment';
import { ModalCreateComment } from '@components/content-comments-page/modal-create-comment/modal-create-comment';
import { Header } from '@components/header/header';
import { PATHS } from '@constants/paths';
import { descriptionTariffs } from '@constants/settinds-data';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useResize } from '@hooks/use-resize';
import { saveToken } from '@redux/reducers/token-slice';
import { resetUser, saveJoinTrainings, userFullSelector } from '@redux/reducers/user-full-slice';
import { increment } from '@redux/reducers/user-slice';
import { useGetTariffListQuery } from '@services/catalogs';
import { useBuyTariffMutation } from '@services/tariff';
import { useUpdateUserMutation } from '@services/user';
import { Button, Card, Col, Drawer, Layout, List, Modal, Radio, RadioChangeEvent, Result, Row, Space, Switch, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import { v4 as uuidv4 } from 'uuid';

import './settings-page.css';

const { Content } = Layout;

export const SettingsPage: React.FC = () => {
    const { data: tariffList } = useGetTariffListQuery();
    const [isModalReview, setIsModalReview] = useState(false);
    const showModalReview = (): void => setIsModalReview(true);
    const handleCancel = (): void => setIsModalReview(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const windowSize = useResize();
    const [valueRadio, setValueRadio] = useState<number>();
    const [isDisabledPay, setIsDisabledPay] = useState(true);
    const showDrawer = () => setOpenDrawer(true);
    const onCloseDrawer = () => setOpenDrawer(false);
    const [isModalResult, setIsModalResult] = useState(false);
    const {email, readyForJointTraining, sendNotification} = useAppSelector(userFullSelector);
    const [upgateUser] = useUpdateUserMutation();
    const dispatch = useAppDispatch();
    const [buyTariff] = useBuyTariffMutation();
    const navigate = useNavigate();

    console.log(tariffList);
    console.log(readyForJointTraining, sendNotification);

    const onChangeJointTraining = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        dispatch(saveJoinTrainings(checked));
        upgateUser({email, readyForJointTraining: checked})
            .unwrap()
            .then(() => {})
            .catch(() => {});
    };
    const onChangesendNotification = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        dispatch(saveJoinTrainings(checked));
        upgateUser({email, readyForJointTraining: checked})
            .unwrap()
            .then(() => {})
            .catch(() => {});
    };
    const onChangeTheme = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log(e.target.value)
        setValueRadio(e.target.value);
        setIsDisabledPay(false)
    };

    const payTariff = () => {
        // eslint-disable-next-line no-underscore-dangle
        if(tariffList) buyTariff({tariffId: tariffList[0]._id, days: valueRadio})
                            .unwrap()
                            .then(() => {
                                setIsModalResult(true);
                                onCloseDrawer();
                            })
                            .catch(() => {});
    }

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(increment({ email: '', password: '' }));
        dispatch(saveToken(''));
        navigate(PATHS.AUTH);
        dispatch(resetUser());
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
                                    extra={
                                        <Button type='link' onClick={showDrawer}>
                                            Подробнее
                                        </Button>
                                    }
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
                                    data-test-id='pro-tariff-card'
                                    title='PRO tarif'
                                    extra={
                                        <Button type='link' onClick={showDrawer}>
                                            Подробнее
                                        </Button>
                                    }
                                    bordered={true}
                                >
                                    <img src='./pro-tariff-disable.jpg' alt='free-tariff' />
                                    <Button
                                        type='primary'
                                        className='setting-card__btn'
                                        data-test-id='activate-tariff-btn'
                                        onClick={showDrawer}
                                    >
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
                                    <ExclamationCircleOutlined data-test-id='tariff-trainings-icon' style={{marginLeft: 5, color: 'var(--color-disabled)'}}/>
                                </Tooltip>
                            </p>
                            <Switch
                                data-test-id='tariff-trainings'
                                defaultChecked={readyForJointTraining}
                                onChange={onChangeJointTraining}
                            />
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
                                    <ExclamationCircleOutlined data-test-id='tariff-notifications-icon' style={{marginLeft: 5, color: 'var(--color-disabled)'}}/>
                                </Tooltip>
                            </p>
                            <Switch
                                data-test-id='tariff-notifications'
                                defaultChecked={sendNotification}
                                onChange={onChangesendNotification}
                            />
                        </List.Item>
                        <List.Item className='settings-item'>
                            <p className='settings-item__text'>
                                Тёмная тема
                                <Tooltip
                                    placement='bottomLeft'
                                    title={<span>темная тема доступна для PRO tariff</span>}
                                >
                                    <ExclamationCircleOutlined data-test-id='tariff-theme-icon' style={{marginLeft: 5, color: 'var(--color-disabled)'}}/>
                                </Tooltip>
                            </p>
                            <Switch
                                disabled={true}
                                data-test-id='tariff-theme'
                                onChange={onChangeTheme}
                            />
                        </List.Item>
                    </List>
                    <ButtonsComment showModalReview={showModalReview} />
                    <ModalCreateComment
                        isModalReview={isModalReview}
                        handleCancel={handleCancel}
                        showModalReview={showModalReview}
                    />
                </Card>
                <Drawer
                    width={windowSize.windowSize < 630 ? 360 : 408}
                    style={{marginTop: `${windowSize.windowSize<630 ? '85px': '0px'}`}}
                    closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
                    title='Сравнить тарифы'
                    data-test-id='tariff-sider'
                    placement='right'
                    onClose={onCloseDrawer}
                    open={openDrawer}
                    destroyOnClose={true}
                    maskStyle={{ background: 'transparent' }}
                    headerStyle={{
                        padding: `var(--unit-16) var(--unit-${
                            windowSize.windowSize < 630 ? 16 : 32
                        })`,
                        border: 'none',
                    }}
                    bodyStyle={{
                        padding: `0px var(--unit-${windowSize.windowSize < 630 ? 16 : 32})`,
                    }}
                    footer={
                        <Button type='primary' data-test-id='tariff-submit' onClick={payTariff} disabled={isDisabledPay} style={{ width: '100%' }}>
                            Выбрать и оплатить
                        </Button>
                    }
                    footerStyle={{
                        border: 'none',
                        padding: `12px var(--unit-${windowSize.windowSize < 630 ? 16 : 32})`,
                    }}
                >
                    <div className='description-tariffs'>
                        <Table
                            pagination={false}
                            rowKey={() => uuidv4()}
                            dataSource={descriptionTariffs}
                        >
                            <Column dataIndex='description' key='description' />
                            <Column title='FREE' dataIndex='free' key='free' />
                            <Column title='PRO' dataIndex='pro' key='pro' />
                        </Table>
                    </div>
                    <div className='costs-tariff'>
                        <p className="costs-tariff-title">
                            Стоимость тарифа
                        </p>
                        <Radio.Group onChange={onChangeRadio} value={valueRadio} data-test-id='tariff-cost'>
                            <Space direction='vertical' style={{ width: '100%' }}>
                                {tariffList && 
                                    tariffList[0].periods
                                        .map((e) => (
                                            <Radio
                                                key={e.cost}
                                                value={e.days}
                                                className='tariff-radio'
                                                data-test-id={`tariff-${e.cost}`}
                                            >
                                                <span className='tariff-title'>{e.text}</span>
                                                <span className='tariff-cost'>
                                                    {String(e.cost).replace('.', ',')} $
                                                </span>
                                            </Radio>
                                        ))}
                            </Space>
                        </Radio.Group>
                    </div>
                </Drawer>
                <Modal
                    open={isModalResult}
                    footer={null}
                    centered={true}
                    closable={true}
                    onCancel={logOut}
                    data-test-id='tariff-modal-success'
                    closeIcon={<CloseOutlined />}
                    maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
                >
                    <div className='modal-tariff-result'>
                        <Result
                            status='success'
                            title='Чек для оплаты у вас на почте'
                            subTitle={
                                <span>
                                    Мы отправили инструкцию для оплаты вам на e-mail 
                                    <span style={{fontWeight: 'var(--font-weight-700)'}}> {email} </span>. 
                                    После подтверждения оплаты войдите в приложение заново. 
                                    <p style={{margin: 'var(--unit-24)'}}>Не пришло письмо? Проверьте папку Спам.</p>
                                </span>}
                        />
                    </div>
                </Modal>
            </Content>
        </React.Fragment>
    );
};
