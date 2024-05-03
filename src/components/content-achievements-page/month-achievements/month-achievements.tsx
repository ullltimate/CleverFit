import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { axisConfigPlot, styleConfigPlot } from '@constants/achievements';
import { formatDate, formatDateDDMM } from '@constants/calendar';
import { useResize } from '@hooks/use-resize';
import { TrainingList } from '@services/catalogs';
import { Training } from '@services/trainings';
import {
    createDataForListMonthExerc,
    splitMonthIntoWeeks,
} from '@utils/achievements-month-healper';
import {
    createData,
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
import { v4 as uuidv4 } from 'uuid';

import { CardsAchievements } from '../cards-achievements/cards-achievements';
import { ExerciseListAchievements } from '../exercise-list-achievements/exercise-list-achievements';
import { FilterPanelAchievements } from '../filters-panel-achievements/filters-panel-achievements';
import { MostReapetedBlock } from '../most-reapeted-block/most-reapeted-block';
import { NotFoundTrain } from '../week-achievements/not-found-train-in-week/not-found-train';
import { PieDiagram } from '../week-achievements/pie-diagram/pie-diagram';

import { CollapsedLoadList } from './collapsed-load-list/collapsed-load-list';

import './month-achievements.css';

type WeekAchievementsProps = {
    trainings?: Training[];
    trainingList?: TrainingList[];
};

export const MonthAchievements: React.FC<WeekAchievementsProps> = ({ trainings, trainingList }) => {
    const [filterValue, setFilterValue] = useState('Все');
    const [filteredTrainForMonth, setFilteredTrainForWeek] = useState<Training[]>([]);
    const [dataForPlot, setDataForPlot] = useState<DataForPlot[]>([]);
    const [dataForList, setDataForList] = useState<DataForPlot[][]>([]);
    const daysInWeek = 7;
    const [dataForPieDiagram, setDataForPieDiagram] = useState<DataForPieDiagram[]>([]);
    const [dataExercForDayOfWeek, setDataExercForDayOfWeek] = useState<DataForPieDiagram[]>([]);
    const [dataForListExerc, setDataForListExerc] = useState<DataForPieDiagram[]>([]);
    const { windowSize } = useResize();

    useEffect(() => {
        const endDate = moment().endOf('isoWeek');
        const startDate = moment(endDate).subtract(27, 'days');

        if (trainings) {
            const trainForMonth = getTrainingForPeriod(trainings, startDate, endDate);

            if (trainForMonth) {
                const filteredTrain = filteredTrainings(trainForMonth, filterValue);

                setFilteredTrainForWeek(filteredTrain);
                setDataForPlot(createDataForPlot(startDate, endDate, filteredTrain));
            }
        }
    }, [trainings, filterValue]);

    useEffect(() => {
        setDataForList(splitMonthIntoWeeks(dataForPlot, daysInWeek));
    }, [dataForPlot]);

    useEffect(() => {
        const endDate = moment().endOf('isoWeek');
        const startDate = moment(endDate).subtract(27, 'days');

        setDataForPieDiagram(createDataForPieDiagram(startDate, endDate, filteredTrainForMonth));
    }, [filteredTrainForMonth]);

    useEffect(() => {
        setDataExercForDayOfWeek(createDataForList(dataForPieDiagram));
    }, [dataForPieDiagram]);

    useEffect(() => {
        setDataForListExerc(createDataForListMonthExerc(dataExercForDayOfWeek));
    }, [dataExercForDayOfWeek]);

    const data = createData(dataForPlot);

    const config = {
        data,
        xField: 'date',
        yField: 'load',
        axis: axisConfigPlot,
        style: styleConfigPlot,
        sizeField: 25,
        scrollbar: { x: { ratio: windowSize<830 ? 0.2 : 0.5, value: 1 } },
        width: windowSize<830 ? 320 : undefined,
        height: windowSize<830 ? 240 : 375
    };

    return (
        <React.Fragment>
            <FilterPanelAchievements
                trainingList={trainingList}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
            />
            {filteredTrainForMonth?.length ? (
                <React.Fragment>
                    <div>
                        <Column {...config} />
                    </div>
                    {windowSize > 370 ? (
                        <div className='graphic-lists-wrapper'>
                            {dataForList.map((e) => (
                                <div key={uuidv4()} className='graphic-list-wrapper'>
                                    <p className='graphic-list__title'>
                                        Неделя {moment(e[0].date).format(formatDateDDMM)}-
                                        {moment(e[e.length - 1].date).format(formatDateDDMM)}
                                    </p>
                                    <List
                                        dataSource={e}
                                        renderItem={(item, index) => (
                                            <List.Item className='graphic-list-item'>
                                                <Badge
                                                    count={index + 1}
                                                    className={classNames({
                                                        'has-load': item.load,
                                                        'hasnt-load': !item.load,
                                                    })}
                                                />
                                                <span className=''>
                                                    {moment(item.date).format(formatDate)}
                                                </span>
                                                <span>{item.load ? `${item.load} кг` : ''}</span>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <CollapsedLoadList dataForList={dataForList} />
                    )}
                    <CardsAchievements filteredTrain={filteredTrainForMonth} />
                    <MostReapetedBlock
                        filteredTrain={filteredTrainForMonth}
                        filterValue={filterValue}
                    />
                    <div className='pie-graphics-wrapper'>
                        <PieDiagram dataForPieDiagram={dataForListExerc} />
                        <ExerciseListAchievements
                            dataForListExerc={dataForListExerc}
                            isMonth={true}
                        />
                    </div>
                </React.Fragment>
            ) : (
                <NotFoundTrain isMonth={true} />
            )}
        </React.Fragment>
    );
};
