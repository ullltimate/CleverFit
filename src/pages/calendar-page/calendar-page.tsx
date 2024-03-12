import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Calendar, Drawer, Empty, Modal, Select } from 'antd';
import { ArrowLeftOutlined, CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import { Content } from 'antd/lib/layout/layout';
import ru_Ru from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { Header } from '@components/header/header';
import { Loader } from '@components/loader/Loader';
import { DrawerForm } from '@components/content-calendar-page/drawer-form/drawer-form';
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
    const [trainingsForDay, setTrainingsForDay] = useState<Training[]>([]);
    const [isCreateExercise, setIsCreateExercise] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [valueEditTrain, setValueEditTrain] = useState("Выбор типа тренировки");

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
        setIsCreateExercise(false)
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
       trainingList && setValueEditTrain(trainingList.filter(train => train.key === value)[0].name)
    };

    const showDrawer = () => {
      setOpenDrawer(true);
    };

    const closeDrawer = () => {
      setOpenDrawer(false);
    };

    const editTraining = (nameTrain: string) => {
        setIsCreateExercise(true);
        setValueEditTrain(nameTrain);
    }

    const addTrain = () => {
        setIsCreateExercise(true);
        setValueEditTrain("Выбор типа тренировки");
    }


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
                            <ul className='modal-events' style={{ listStyleType: 'none' }}>
                                {trainingsForDay.length != 0 ? (
                                    trainingsForDay.map((e) => (
                                        <li key={e._id} className='list-item'>
                                            <Badge
                                                color={
                                                    colorTrainings.find((el) => el.name === e.name)
                                                        ?.color
                                                }
                                                text={e.name}
                                            />
                                            <EditOutlined style={{color: 'var(--color-primary)'}} onClick={() => editTraining(e.name)}/>
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
                            onClick={() => addTrain()}
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
                                defaultValue={valueEditTrain}
                                style={{ width: 228 }}
                                onChange={handleChange}
                                options={trainingList?.map((e) => ({value: e.key, label: e.name})).filter(name => trainingsForDay.every(train => !name.label.includes(train.name) ))}
                            />
                        </div>
                        <div className='modal-content'>
                            {
                                valueEditTrain != 'Выбор типа тренировки' 
                                ? 
                                <ul>
                                    {
                                        trainingsForDay
                                            .find(train => train.name ===valueEditTrain)?.exercises
                                            .map(e => 
                                                <li key={e._id} className='list-item'>
                                                    <p>{e.name}</p>
                                                    <EditOutlined style={{color: 'var(--color-primary)'}}/>
                                                </li>
                                            )
                                    }
                                </ul>
                                : 
                                <Empty
                                    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                                    imageStyle={{ height: 32}}
                                    description={false}
                                />
                            }
                        </div>
                        <Button type='text' className='modal-btn' onClick={showDrawer}>Добавить утпражнения</Button>
                        <Button type='link' className='modal-btn'>Сохранить</Button>
                    </>
                )}
            </div>
            <Drawer width={408} 
                    title={<><PlusOutlined style={{marginRight: 6}} /><h4 style={{display: 'inline-block', margin: 0, fontSize: 20, fontWeight: 500}}>Добавление упражнений</h4></>} 
                    placement="right" 
                    onClose={closeDrawer} 
                    open={openDrawer} 
                    maskStyle={{background: 'transparent'}}
                    headerStyle={{padding: 'var(--unit-16) var(--unit-32)', border: 'none'}}
                    bodyStyle={{padding: '0px var(--unit-32)'}}
            >
                <div className='drawer-name'>
                    <Badge
                        color={
                            colorTrainings.find((el) => el.name === valueEditTrain)?.color
                        }
                        text={valueEditTrain}
                    />
                    <p className='date-training'>{selectedDate}</p>
                </div>
                <DrawerForm />
                <div className='drawer-buttons'>
                    <Button type='link' style={{width: 170}}><PlusOutlined />Добавить ещё</Button>
                    <Button type='text' style={{width: 170, display: 'none'}} disabled ><MinusOutlined />Удалить</Button>
                </div>
            </Drawer>
        </>
    );
};
