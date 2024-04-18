import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { formatDateDDMM } from '@constants/calendar';
import { TrainingList } from '@services/catalogs';
import { Training } from '@services/trainings';
import { createDataForPlot, filteredTrainings, getTrainingForPeriod } from '@utils/achievements-week-healper';
import { List, Tag } from 'antd';
import moment from 'moment';

import { NotFoundTrain } from './not-found-train-in-week/not-found-train';

import './week-achievements.css';

type WeekAchievementsProps = {
    trainings?: Training[];
    trainingList?: TrainingList[];
};

type DataForPlot = {
	date: string,
	load: number
}
export const WeekAchievements: React.FC<WeekAchievementsProps> = ({ trainings, trainingList }) => {
    const [filterValue, setFilterValue] = useState('Все');
    const [filterOptions, setFilterOptions] = useState([filterValue]);
    const [filteredTrainForWeek, setFilteredTrainForWeek] = useState<Training[]>([]);
	const [dataForPlot, setDataForPlot] = useState<DataForPlot[]>([]);


    useEffect(() => {
        if (trainingList)
            setFilterOptions((options) =>
                options.length > 1 ? [...options] : options.concat(trainingList.map((e) => e.name)),
            );
    }, [trainingList]);

    useEffect(() => {
		const startDate = moment().subtract(6, 'days');
		const endDate = moment();

		if (trainings){
            const trainForWeek = getTrainingForPeriod(trainings, startDate, endDate);

			if(trainForWeek) {
                const filteredTrain = filteredTrainings(trainForWeek, filterValue);

			    setFilteredTrainForWeek(filteredTrain);
			    setDataForPlot(createDataForPlot(startDate, endDate, filteredTrain));
            }
		}
    }, [trainings, filterValue]);
    console.log(dataForPlot)
    console.log()

    const data = dataForPlot.map(e => ({date: moment(e.date).format(formatDateDDMM), load: e.load}));
    console.log(data)

    const config = {
        data,
        xField: 'date',
        yField: 'load',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: 16,
                titlePosition: 'bottom',
                titleFontSize: 14,
                tick: false,
                labelSpacing: 16,
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: 16,
            },
        },
        style: {
            fill: '#85A5FFFF',
        },
        sizeField: 25,
        width: 520,
        height: 375,
    };

    return (
        <React.Fragment>
            <div>
                <span className='achiev-filter-title'>Тип тренировки :</span>
                {filterOptions && filterOptions?.map((e) => (
                    <Tag
                        key={e}
                        color={e === filterValue ? 'blue' : 'default'}
                        onClick={() => setFilterValue(e)}
                    >
                        {e}
                    </Tag>
                ))}
            </div>
            {(filteredTrainForWeek?.length)? (
                <div>
                    <Column {...config} />
                    <List />
                </div>
            ) : (
                <NotFoundTrain />
            )}
        </React.Fragment>
    );
};
