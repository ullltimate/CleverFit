import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { formatDateDDMM } from '@constants/calendar';
import { TrainingList } from '@services/catalogs';
import { Training } from '@services/trainings';
import {
    createDataForList,
    createDataForPieDiagram,
    createDataForPlot,
    DataForPieDiagram,
    DataForPlot,
    filteredTrainings,
    getTrainingForPeriod,
} from '@utils/achievements-week-healper';
import { Badge, List } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

import { CardsAchievements } from '../cards-achievements/cards-achievements';
import { ExerciseListAchievements } from '../exercise-list-achievements/exercise-list-achievements';
import { FilterPanelAchievements } from '../filters-panel-achievements/filters-panel-achievements';
import { MostReapetedBlock } from '../most-reapeted-block/most-reapeted-block';

import { NotFoundTrain } from './not-found-train-in-week/not-found-train';
import { PieDiagram } from './pie-diagram/pie-diagram';

import './week-achievements.css';

type WeekAchievementsProps = {
    trainings?: Training[];
    trainingList?: TrainingList[];
};

export const WeekAchievements: React.FC<WeekAchievementsProps> = ({ trainings, trainingList }) => {
    const [filterValue, setFilterValue] = useState('Все');
    const [filteredTrainForWeek, setFilteredTrainForWeek] = useState<Training[]>([]);
    const [dataForPlot, setDataForPlot] = useState<DataForPlot[]>([]);
    const [dataForList, setDataForList] = useState<DataForPlot[]>([]);
    const [dataForPieDiagram, setDataForPieDiagram] = useState<DataForPieDiagram[]>([]);
    const [dataForListExerc, setDataForListExerc] = useState<DataForPieDiagram[]>([]);

    useEffect(() => {
        const startDate = moment().subtract(6, 'days');
        const endDate = moment();

        if (trainings) {
            const trainForWeek = getTrainingForPeriod(trainings, startDate, endDate);

            if (trainForWeek) {
                const filteredTrain = filteredTrainings(trainForWeek, filterValue);

                setFilteredTrainForWeek(filteredTrain);
                setDataForPlot(createDataForPlot(startDate, endDate, filteredTrain));
               
            }
        }
    }, [trainings, filterValue]);

    useEffect(() => {
        const startDate = moment().subtract(6, 'days');
        const endDate = moment();

        setDataForPieDiagram(createDataForPieDiagram(startDate, endDate, filteredTrainForWeek));
    },[filteredTrainForWeek])

    useEffect(() => {
        setDataForList(createDataForList(dataForPlot));
    }, [dataForPlot]);

    useEffect(() => {
        setDataForListExerc(createDataForList(dataForPieDiagram))
    },[dataForPieDiagram])


    const data = dataForPlot.map((e) => ({
        date: moment(e.date).format(formatDateDDMM),
        load: e.load,
    }));

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
            <FilterPanelAchievements trainingList={trainingList} filterValue={filterValue} setFilterValue={setFilterValue}/>
            {filteredTrainForWeek?.length ? (
                <React.Fragment>
                    <div className='graphics-wrapper'>
                        <Column {...config} />
                        <div className='graphic-list-wrapper'>
                            <p className='graphic-list__title'>Средняя нагрузка по дням недели</p>
                            <List
                                dataSource={dataForList}
                                renderItem={(item, index) => (
                                    <List.Item className='graphic-list-item'>
                                        <Badge
                                            count={index + 1}
                                            className={classNames({
                                                'has-load': item.load,
                                                'hasnt-load': !item.load,
                                            })}
                                        />
                                        <span className=''>{item.date}</span>
                                        <span>{item.load ? `${item.load} кг` : ''}</span>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <CardsAchievements filteredTrain={filteredTrainForWeek} />
                    <div>
                        <MostReapetedBlock filteredTrain={filteredTrainForWeek} filterValue={filterValue} />
                        <div style={{display: 'flex'}}>
                            <PieDiagram dataForPieDiagram={dataForPieDiagram}/>
                            <ExerciseListAchievements dataForListExerc={dataForListExerc} />
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <NotFoundTrain />
            )}
        </React.Fragment>
    );
};
