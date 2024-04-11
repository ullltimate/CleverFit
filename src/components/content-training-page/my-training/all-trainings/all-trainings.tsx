import React, { useState } from 'react';
import {
    DownOutlined,
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { colorTrainings } from '@constants/calendar';
import { useResize } from '@hooks/use-resize';
import { Training } from '@services/trainings';
import { createPeriodString } from '@utils/my-trainings-healper';
import {  Badge, Button, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { v4 as uuidv4 } from 'uuid';

import { MyTrainingCard } from '../my-training-card/my-training-card';

import './all-trainings.css';

type AllTrainingsProps = {
    editTraining: (e: Training) => void,
    addTraining: () => void,
    trainings?: Training[],
}

type DataSourceType = {
    typeTrain: React.ReactElement;
    sorted: React.ReactElement;
    period: number;
    editBtn: React.ReactElement;
};

export const AllTrainings: React.FC<AllTrainingsProps> = ({editTraining, addTraining, trainings}) => {
    const {windowSize} = useResize();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedTrain, setClickedTrain] = useState<Training | null>(null);

    const openCard = (e: Training) => {
        setClickedTrain(e);
        setIsModalOpen(true);
    }
    const closeCard = () => {
        setClickedTrain(null);
        setIsModalOpen(false)
    }


    return (
        <React.Fragment>
            <Table
                data-test-id='my-trainings-table'
                pagination={{
                    defaultPageSize: windowSize < 370 ? 8 : 10,
                    hideOnSinglePage: true,
                    showSizeChanger: false,
                    position: ['bottomLeft'],
                    size: 'small',
                }}
                rowKey={() => uuidv4()}
                dataSource={trainings?.map((e, i) => ({
                    typeTrain: (
                        <div className='table-type-train-wrap'>
                            <Badge
                                color={colorTrainings.find((el) => el.name === e.name)?.color}
                                text={e.name}
                            />
                            <DownOutlined className='type-train-arrow-down' onClick={() => openCard(e)} />
                            {clickedTrain && (
                                <MyTrainingCard
                                    id={e._id}
                                    train={clickedTrain}
                                    isModalOpen={isModalOpen}
                                    closeCard={closeCard}
                                    editTraining={editTraining}
                                />
                            )}
                        </div>
                    ),
                    sorted: createPeriodString(e.parameters.period),
                    period: e.parameters.period || 8,
                    editBtn: (
                        <Button
                            type='link'
                            onClick={() => editTraining(e)}
                            disabled={e.isImplementation}
                            data-test-id={`update-my-training-table-icon${i}`}
                        >
                            <EditOutlined />
                        </Button>
                    ),
                }))}
            >
                <Column title='Тип тренировки' dataIndex='typeTrain' key='typeTrain' />
                <Column
                    title='Периодичность'
                    dataIndex='sorted'
                    key='sorted'
                    sorter={(a: DataSourceType, b) => a.period - b.period}
                    sortDirections={['descend', 'ascend']}
                />
                <Column dataIndex='editBtn' key='editBtn' />
            </Table>
            <Button
                className='my-traning-empty__btn'
                data-test-id='create-new-training-button'
                type='primary'
                onClick={addTraining}
            >
                <PlusOutlined /> Новая тренировка
            </Button>
        </React.Fragment>
    );
};
