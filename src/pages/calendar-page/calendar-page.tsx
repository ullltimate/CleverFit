import React from 'react';

import './calendar-page.css';
import { Calendar, ConfigProvider } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import { Content } from 'antd/lib/layout/layout';
import ru_Ru from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

export const CalendarPage: React.FC = () => {
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
      console.log(ru_Ru)
    return (
        <>
            <Content style={{ margin: 24 }}>
            <ConfigProvider locale={ru_Ru}>
                <Calendar onPanelChange={onPanelChange} />;
            </ConfigProvider>
            </Content>
        </>
    );
};