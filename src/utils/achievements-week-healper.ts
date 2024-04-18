import { formatDateDDMM } from '@constants/calendar';
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
    trainings.filter((e) => moment(e.date).format(formatDateDDMM) === day);


export const averageLoad = (trainings: Training[]) => {
   let totalLoadAlltrain = 0;
   let averLoad = 0;

   if(trainings.length){
       totalLoadAlltrain = trainings.reduce((accum, e) => {
           const totalLoad = accum +
               e.exercises.reduce((acc, exer) => 
                   acc + ((exer.approaches || 0) * (exer.weight || 0) * (exer.replays || 0)),0);

           return totalLoad
       },0);

       averLoad = totalLoadAlltrain / trainings.length
   }

   return averLoad;
};

export const createDataForPlot = (startDate: Moment, endDate: Moment, trainings: Training[]) => {
    const data = [];

    while (startDate.isSameOrBefore(endDate, 'day')) {
        const date = startDate.format(formatDateDDMM);

        data.push({ date, load: averageLoad(filteredTrainingsForDay(date, trainings)) });

        startDate.add(1, 'day');
    }

    return data;
};
