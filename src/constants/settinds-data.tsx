import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';

export type DescriptionTariffs = {
    description: string;
    free: React.ReactNode;
    pro: React.ReactNode;
};

export const descriptionTariffs: DescriptionTariffs[] = [
    {
        description: 'Статистика за месяц',
        free: <CheckCircleFilled />,
        pro: <CheckCircleFilled />,
    },
    {
        description: 'Статистика за всё время',
        free: <CloseCircleOutlined className='icon-disabled'/>,
        pro: <CheckCircleFilled />,
    },
    {
        description: 'Совместные тренировки',
        free: <CheckCircleFilled />,
        pro: <CheckCircleFilled />,
    },
    {
        description: 'Участие в марафонах',
        free: <CloseCircleOutlined className='icon-disabled'/>,
        pro: <CheckCircleFilled />,
    },
    {
        description: 'Приложение iOS',
        free: <CloseCircleOutlined className='icon-disabled'/>,
        pro: <CheckCircleFilled />,
    },
    {
        description: 'Приложение Android',
        free: <CloseCircleOutlined className='icon-disabled'/>,
        pro: <CheckCircleFilled />,
    },
    {
        description: 'Индивидуальный Chat GPT',
        free: <CloseCircleOutlined className='icon-disabled'/>,
        pro: <CheckCircleFilled />,
    },
];