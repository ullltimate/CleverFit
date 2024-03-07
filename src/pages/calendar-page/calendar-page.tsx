import React from 'react';
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import { Content } from 'antd/lib/layout/layout';
import ru_Ru from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';

import './calendar-page.css';

moment.locale('ru');
moment.updateLocale('ru', {
    weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthsShort : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'], 
  })

export const CalendarPage: React.FC = () => {
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
      console.log(ru_Ru)
    return (
        <>
            <Content style={{ margin: 24 }}>
                <Calendar onPanelChange={onPanelChange} locale={ru_Ru}/>;
            </Content>
        </>
    );
};