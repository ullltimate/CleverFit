import React, { useCallback, useEffect } from 'react';
import { Badge, Calendar, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import { Content } from 'antd/lib/layout/layout';
import ru_Ru from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { Header } from '@components/header/header';
import { Loader } from '@components/loader/Loader';
import { useGetTrainingListQuery } from '@services/catalogs';
import { useGetTrainingQuery } from '@services/trainings';
import { colorTrainings } from '@constants/calendar';

import './calendar-page.css';

moment.locale('ru');
moment.updateLocale('ru', {
    weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'], 
    week: {dow: 1}
  })

export const CalendarPage: React.FC = () => {
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList, error: errorList, isLoading, refetch } = useGetTrainingListQuery();
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    //console.log(ru_Ru)
    console.log(trainings, trainingList);
    const onSelect = (date: Moment) => console.log(date.format('YYYY.MM.DD'));

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
        (trainings && trainingList) &&
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

    return (
        <>
            {isLoading && <Loader />}
            <Header />
            <Content style={{ padding: 24, background: 'var(--color-bg-blue)', marginBottom: 42 }}>
                <Calendar onPanelChange={onPanelChange} onSelect={onSelect} locale={ru_Ru} dateCellRender={dateCellRender}/>
            </Content>
        </>
    );
};
