import { invalideFormatDate } from '@constants/calendar';
import { Training } from '@services/trainings';
import moment, { Moment } from 'moment';

export const getTrainingForPeriod = (trainings: Training[], startDate: Moment, endDate: Moment) =>
    trainings?.filter(
        (e) =>
            moment(e.date).isSameOrBefore(endDate, 'day') &&
            moment(e.date).isSameOrAfter(startDate, 'day'),
    );

export const filteredTrainings = (trainings: Training[], filter: string) => {
    if (filter !== 'Все' && trainings) {
        return trainings.filter((e) => e.name === filter);
    }

    return trainings;
};

export const filteredTrainingsForDay = (day: string, trainings: Training[]) =>
    trainings.filter((e) => moment(e.date).format(invalideFormatDate) === day);

export const averageLoad = (trainings: Training[]) => {
    const allExercicesForDay = trainings.map((e) => e.exercises).flat();
    let totalLoad = 0;
    let averLoad = 0;

    if (trainings.length) {
        totalLoad = allExercicesForDay.reduce(
            (acc, curr) => acc + (curr.approaches || 0) * (curr.weight || 0) * (curr.replays || 0),
            0,
        );
        averLoad = totalLoad / allExercicesForDay.length;
    }

    return averLoad;
};

export const createDataForPlot = (startDate: Moment, endDate: Moment, trainings: Training[]) => {
    const data = [];

    while (startDate.isSameOrBefore(endDate, 'day')) {
        const date = startDate.format(invalideFormatDate);

        data.push({ date, load: averageLoad(filteredTrainingsForDay(date, trainings)) });

        startDate.add(1, 'day');
    }

    return data;
};
