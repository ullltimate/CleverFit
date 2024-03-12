import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Calendar, Drawer, Empty, Form,  InputNumber,  Modal, Select, Space } from 'antd';
import { ArrowLeftOutlined, CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import { Content } from 'antd/lib/layout/layout';
import ru_Ru from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { Header } from '@components/header/header';
import { Loader } from '@components/loader/Loader';
import { useGetTrainingListQuery } from '@services/catalogs';
import { Training, useGetTrainingQuery } from '@services/trainings';
import { colorTrainings } from '@constants/calendar';

import './calendar-page.css';
import './modal-training.css';

moment.locale('ru');
moment.updateLocale('ru', {
    weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'], 
    week: {dow: 1}
  })

export const CalendarPage: React.FC = () => {
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList, error: errorList, isLoading, refetch } = useGetTrainingListQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coordinates, setCoordinates] = useState<DOMRect>();
    const [selectedDate, setSelectedDate] = useState('');
    const widthCreateTraining = 264;
    const [selectedWeekDay, setSelectedWeekDay] = useState(moment().day());
    const [trainingsForDay, setTrainingsForDay] = useState<Training[]>();
    const [isCreateExercise, setIsCreateExercise] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log('panel', value.format('DD.MM.YYYY'), mode);
        setIsModalOpen(false)
    };   

    useEffect(() => {
        trainings &&
            setTrainingsForDay(
                trainings.filter(
                    (e) => new Date(e.date).toLocaleString('ru').split(',')[0] === selectedDate,
                ),
            );
    }, [trainings, selectedDate]);

    const modalError = useCallback(() => {
        Modal.error({
            className: 'error-list',
            centered: true,
            closable: true,
            maskClosable: true,
            closeIcon: (
                <span data-test-id='modal-error-user-training-button-close'>
                    <CloseOutlined />
                </span>
            ),
            maskStyle: { background: '#799CD41A', backdropFilter: 'blur(5px)' },
            title: (
                <span data-test-id='modal-error-user-training-title'>
                    При открытии данных произошла ошибка
                </span>
            ),
            content: (
                <div>
                    <p data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз.</p>
                </div>
            ),
            okText: <span data-test-id='modal-error-user-training-button'>Обновить</span>,
            onOk() {
                refetch();
            },
        });
    }, [refetch]);

    useEffect(() => {
        errorList && modalError();
    }, [errorList, modalError]);

    type ListData = {
        color: string;
        content: string;
    };

    const getListData = (value: Moment) => {
        const listData: ListData[] = [];
        trainings &&
            trainingList &&
            trainings.map((el) => {
                if (
                    value.format('DD.MM.YYYY') ===
                    new Date(el.date).toLocaleString('ru').split(',')[0]
                ) {
                    listData.push({
                        color: `${colorTrainings.find((train) => train.name === el.name)?.color}`,
                        content: `${el.name}`,
                    });
                }
            });

        return listData || [];
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <ul className='events' style={{ listStyleType: 'none' }}>
                {listData.map((item: ListData, i: number) => (
                    <li key={i}>
                        <Badge color={item.color} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const showModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, date:Moment) => {
        e.stopPropagation();
        setSelectedDate(date.format('DD.MM.YYYY'));
        setSelectedWeekDay(date.day());
        const elem = e.target as Element;
        if(elem.tagName === 'SPAN'){
            setCoordinates((((((elem.parentNode as Element).parentNode as Element).parentNode as Element).parentNode as Element).parentNode as Element).getBoundingClientRect());
        } else if (elem.tagName === 'LI'){
            setCoordinates(((((elem.parentNode as Element).parentNode as Element).parentNode as Element).parentNode as Element).getBoundingClientRect());
        }else {
            setCoordinates(((elem.parentNode as Element).parentNode as Element).getBoundingClientRect());
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsCreateExercise(false);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };    
    const showDrawer = () => {
      setOpenDrawer(true);
    };

    const closeDrawer = () => {
      setOpenDrawer(false);
    };

    return (
        <>
            {isLoading && <Loader />}
            <Header />
            <Content style={{ padding: 24, background: 'var(--color-bg-blue)', marginBottom: 42 }}>
                <Calendar
                    onPanelChange={onPanelChange}
                    locale={ru_Ru}
                    dateFullCellRender={(date) => (
                        <div className='date-cell' style={{ zIndex: 0 }} onClick={(e) => showModal(e, date)}>
                            <div className='ant-picker-calendar-date-value'>
                                {moment(date).format('DD')}
                            </div>
                            <div className='ant-picker-calendar-date-content'>
                                {dateCellRender(date)}
                            </div>
                        </div>
                    )}
                />
            </Content>
            <div
                className='modal-training'
                data-test-id={`${
                    !isCreateExercise ? 'modal-create-training' : 'modal-create-exercise'
                }`}
                style={{
                    display: `${isModalOpen ? 'block' : 'none'}`,
                    top: `${coordinates?.top}px`,
                    left: `${
                        coordinates &&
                        (selectedWeekDay === 0
                            ? coordinates.right - widthCreateTraining
                            : coordinates.left)
                    }px`,
                    width: 264,
                }}
            >
                {!isCreateExercise ? (
                    <>
                        <div className='modal-title'>
                            <h4 className='title'>Тренировки на {selectedDate}</h4>
                            <CloseOutlined onClick={handleCancel} />
                        </div>
                        <p
                            className='modal-subtitle'
                            style={{
                                display: `${trainingsForDay?.length === 0 ? 'block' : 'none'}`,
                            }}
                        >
                            Нет активных тренировок
                        </p>
                        <div className='modal-content'>
                            <ul className='events' style={{ listStyleType: 'none' }}>
                                {trainingsForDay && trainingsForDay.length != 0 ? (
                                    trainingsForDay.map((e) => (
                                        <li key={e._id} className='list-item'>
                                            <Badge
                                                color={
                                                    colorTrainings.find((el) => el.name === e.name)
                                                        ?.color
                                                }
                                                text={e.name}
                                            />
                                            <EditOutlined style={{color: 'var(--color-primary)'}} onClick={() => setIsCreateExercise(true)}/>
                                        </li>
                                    ))
                                ) : (
                                    <Empty
                                        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                        imageStyle={{
                                            height: 32,
                                        }}
                                        description={false}
                                    />
                                )}
                            </ul>
                        </div>
                        <Button
                            type='primary'
                            className='modal-btn'
                            onClick={() => setIsCreateExercise(true)}
                        >
                            {trainingsForDay?.length != 0
                                ? 'Добавить тренировку'
                                : 'Создать тренировку'}
                        </Button>
                    </>
                ) : (
                    <>
                        <div className='create-exercise' >
                            <ArrowLeftOutlined style={{width: 16}} onClick={() => setIsCreateExercise(false)}/>
                            <Select
                                defaultValue="Выбор типа тренировки"
                                style={{ width: 228 }}
                                onChange={handleChange}
                                options={trainingList?.map((e) => ({value: e.key, label: e.name}))}
                            />
                        </div>
                        <div className='modal-content'>
                            <Empty
                                image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                imageStyle={{
                                    height: 32,
                                }}
                                description={false}
                            />
                        </div>
                        <Button type='text' className='modal-btn' onClick={showDrawer}>Добавить утпражнения</Button>
                        <Button type='link' className='modal-btn'>Сохранить</Button>
                    </>
                )}
            </div>
            <Drawer title={<><PlusOutlined /><h4 style={{display: 'inline-block'}}>Добавление упражнений</h4></>} placement="right" onClose={closeDrawer} open={openDrawer} maskStyle={{background: 'transparent'}}>
                <div className='drawer-name'>
                    <p className='name-training'>силовая</p>
                    <p className='date-training'>дата</p>
                </div>
                <Form>
                    <Space direction='horizontal'>
                        <Form.Item>
                            <div>Подходы</div>
                            <InputNumber addonBefore="+" />
                        </Form.Item>
                        <Form.Item>
                            <div>Вес, кг</div>
                            <InputNumber />
                        </Form.Item>x
                        <Form.Item>
                            <div>Количество</div>
                            <InputNumber />
                        </Form.Item>
                    </Space>
                </Form>
                <Button type='link'><PlusOutlined />Добавить ещё</Button>
            </Drawer>
        </>
    );
};
