import { HeartFilled, CalendarTwoTone, IdcardOutlined } from '@ant-design/icons';
import { CardInfo } from '@tstypes/types';

export const contentCards: CardInfo[] = [
    {
        title: 'Расписать тренировки',
        btnText: 'Тренировки',
        btnIcon: <HeartFilled />,
    },
    {
        title: 'Назначить календарь',
        btnText: 'Календарь',
        btnIcon: <CalendarTwoTone twoToneColor='#2F54EB' />,
    },
    {
        title: 'Заполнить профиль',
        btnText: 'Профиль',
        btnIcon: <IdcardOutlined />,
    },
];
