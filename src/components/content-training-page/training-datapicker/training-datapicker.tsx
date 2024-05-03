import React from 'react';
import { formatDate } from '@constants/calendar';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { saveTrainingDate } from '@redux/reducers/training-slice';
import { Training } from '@services/trainings';
import { DatePicker, DatePickerProps } from 'antd';
import moment from 'moment';

type TrainingsDataPickerProps = {
    dateTrain: string;
    trainings?: Training[];
};

export const TrainingsDataPicker: React.FC<TrainingsDataPickerProps> = ({ trainings, dateTrain }) => {
    const dispatch = useAppDispatch();

    const onChangeDatePicker: DatePickerProps['onChange'] = (date) => {
        if (date) {
            dispatch(saveTrainingDate(date.toJSON()));
        } else {
            dispatch(saveTrainingDate(''));
        }
    };

    const dateRender = (currDate: moment.Moment) => {
        const hasTrain = trainings?.some((e) => moment(e.date).isSame(currDate, 'day'));
        const background = hasTrain ? 'var(--color-bg-blue)' : 'transparent';

        return (
            <div className='ant-picker-cell-inner' style={{ background }}>
                {currDate.date()}
            </div>
        );
    };

    return (
        <DatePicker
            data-test-id='modal-drawer-right-date-picker'
            onChange={onChangeDatePicker}
            format={formatDate}
            value={dateTrain ? moment(dateTrain) : undefined}
            disabledDate={(currDate) => currDate.isSameOrBefore(moment(), 'day')}
            dateRender={dateRender}
        />
    );
};
