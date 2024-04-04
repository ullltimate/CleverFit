import React, { useCallback, useEffect, useState } from 'react';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from '@components/content-calendar-page/drawer-form/drawer-form';
import { colorTrainings } from '@constants/calendar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useResize } from '@hooks/use-resize';
import {
    addExercises,
    Exercise,
    removeExercises,
    resetParameters,
    saveTrainingDate,
    saveTrainingName,
    setParameters,
    trainingSelector,
} from '@redux/reducers/training-slice';
import { useGetTrainingListQuery, useLazyGetTrainingListQuery } from '@services/catalogs';
import { useCreateTrainingMutation, useGetTrainingQuery } from '@services/trainings';
import {
    Badge,
    Button,
    Checkbox,
    DatePicker,
    DatePickerProps,
    Drawer,
    Modal,
    Select,
    Table,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { EmptyTraining } from './my-training-empty/training-empty';

import './my-training.css';

export const MyTraining: React.FC = () => {
    const { data: trainings } = useGetTrainingQuery();
    const [getTrainingList, { data: trainingList, error: errorList }] = useLazyGetTrainingListQuery();
    const [error, setError] = useState(false);
    const windowSize = useResize();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isEditTraining, setIsEditTraining] = useState(false);
    const [valueEditTrain, setValueEditTrain] = useState('Выбор типа тренировки');
    const [withPeriodically, setWithPeriodically] = useState(false);
    const { date, name, exercises, isImplementation, id, parameters } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();
    const [indexesForDelete, setIndexesForDelete] = useState<number[]>([]);
    const [isDisabledSave, setIsDisabledSave] = useState(true);
    const [createTraining] = useCreateTrainingMutation();
    const [periodically, setPeriodically] = useState(1);
    const closeDrawer = () => {
        setIsOpenDrawer(false);
        setValueEditTrain('Выбор типа тренировки');

    };
    const openDrawer = () => setIsOpenDrawer(true);
    console.log(trainings);
    console.log(trainingList);
    console.log({ date, name, exercises, isImplementation, id, parameters });

    useEffect(() => {
        if (date && valueEditTrain !== 'Выбор типа тренировки' && exercises.some((e) => e.name)) {
            setIsDisabledSave(false);
        } else {
            setIsDisabledSave(true);
        }
    }, [date, exercises, valueEditTrain]);

    useEffect(() => {
        dispatch(saveTrainingName(valueEditTrain));
    }, [valueEditTrain, dispatch]);



    const modalError = useCallback(
        (isErrorList: boolean) => {
            Modal.error({
                className: 'error-list',
                centered: true,
                closable: true,
                maskClosable: true,
                closeIcon: (
                    <span data-test-id='modal-error-user-training-button-close'>
                        <CloseOutlined />
                    </span>
                ),
                maskStyle: { background: '#799CD41A', backdropFilter: 'blur(5px)' },
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        {isErrorList
                            ? 'При открытии данных произошла ошибка'
                            : 'При сохранении данных произошла ошибка '}
                    </span>
                ),
                content: (
                    <div>
                        <p data-test-id='modal-error-user-training-subtitle'>
                            {isErrorList ? 'Попробуйте ещё раз.' : 'Придётся попробовать ещё раз'}
                        </p>
                    </div>
                ),
                okText: (
                    <span data-test-id='modal-error-user-training-button'>
                        {isErrorList ? 'Обновить' : 'Закрыть'}
                    </span>
                ),
                onOk() {
                    getTrainingList();
                },
            });
        },
        [getTrainingList],
    );

    useEffect(() => {
        getTrainingList()
    },[getTrainingList])

    useEffect(() => {
        setError(false);
        if(errorList) setError(true)
    },[errorList])

    useEffect(() => {
        if (error) modalError(true);
    }, [error, modalError]);

    const handleChangeSelect = (value: string) => {
        if (trainingList)
            setValueEditTrain(trainingList.filter((train) => train.key === value)[0].name);
    };
    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date?.toJSON(), dateString);
        if (date) {
            dispatch(saveTrainingDate(date.toJSON()));
        } else {
            dispatch(saveTrainingDate(''));
        }
    };
    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
        setWithPeriodically(e.target.checked);
    };

    const createTrain = async () => {
        await createTraining({ date, name, exercises: exercises.filter(e => e.name !== ''), parameters })
            .unwrap()
            .then(() => {})
            .catch(() => modalError(false));
        closeDrawer();
    };

    const handleChangePeriodically = (value: number) => {
        setPeriodically(value)
    }

    useEffect(() => {
        if(withPeriodically){
            dispatch(setParameters({repeat: withPeriodically, period: periodically}))
        } else {
            dispatch(resetParameters())
        }
    },[withPeriodically, periodically, dispatch])

    return (
        <React.Fragment>
            {trainings?.length ? (
                <React.Fragment>
                    <Table
                        data-test-id='my-trainings-table'
                        pagination={{defaultPageSize: 14, hideOnSinglePage: true}}
                        style={{
                            paddingTop: `${
                                windowSize.windowSize < 370 ? 'var(--unit-16)' : 'var(--unit-24)'
                            }`,
                            maxWidth: 560,
                        }}
                        rowKey={() => uuidv4()}
                        dataSource={trainings.map((e) => ({
                            typeTrain: (
                                <Badge
                                    color={colorTrainings.find((el) => el.name === e.name)?.color}
                                    text={e.name}
                                />
                            ),
                            sorted: e.parameters.period,
                            editBtn: (
                                <Button type='link'>
                                    <EditOutlined />
                                </Button>
                            ),
                        }))}
                    >
                        <Column title='Тип тренировки' dataIndex='typeTrain' key='typeTrain' />
                        <Column title='Периодичность' dataIndex='sorted' key='sorted' />
                        <Column dataIndex='editBtn' key='editBtn' />
                    </Table>
                    <Button
                        className='my-traning-empty__btn'
                        data-test-id='create-new-training-button'
                        type='primary'
                        onClick={openDrawer}
                    >
                        <PlusOutlined /> Новая тренировка
                    </Button>
                </React.Fragment>
            ) : (
                <EmptyTraining openDrawer={openDrawer} />
            )}
            <Drawer
                width={windowSize.windowSize < 630 ? 360 : 408}
                style={{
                    marginTop: `${windowSize.windowSize < 630 ? '85px' : '0px'}`,
                    borderRadius: 15,
                }}
                data-test-id='modal-drawer-right'
                closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
                title={
                    <React.Fragment>
                        {isEditTraining ? (
                            <EditOutlined style={{ marginRight: 6 }} />
                        ) : (
                            <PlusOutlined style={{ marginRight: 6 }} />
                        )}
                        <h4
                            style={{
                                display: 'inline-block',
                                margin: 0,
                                fontSize: 20,
                                fontWeight: 500,
                            }}
                        >
                            {isEditTraining ? 'Редактирование' : 'Добавление упражнений'}
                        </h4>
                    </React.Fragment>
                }
                placement='right'
                onClose={closeDrawer}
                open={isOpenDrawer}
                maskStyle={{ background: 'transparent' }}
                headerStyle={{
                    padding: `var(--unit-16) var(--unit-${windowSize.windowSize < 630 ? 16 : 32})`,
                    border: 'none',
                }}
                bodyStyle={{ padding: `0px var(--unit-${windowSize.windowSize < 630 ? 16 : 32})` }}
                footer={
                    <Button
                        type='primary'
                        disabled={isDisabledSave}
                        style={{ width: '100%' }}
                        onClick={createTrain}
                    >
                        Сохранить
                    </Button>
                }
                footerStyle={{
                    padding: `12px var(--unit-${windowSize.windowSize < 630 ? 16 : 32})`,
                }}
            >
                <div className='drawer-trainings'>
                    <Select
                        value={valueEditTrain}
                        className='drawer-select'
                        data-test-id='modal-create-exercise-select'
                        style={{ width: '100%', margin: '24px 0px' }}
                        onChange={handleChangeSelect}
                        options={trainingList?.map((e) => ({ value: e.key, label: e.name }))}
                    />
                    <DatePicker
                        data-test-id='modal-drawer-right-date-picker'
                        onChange={onChangeDatePicker}
                        format='DD.MM.YYYY'
                        disabledDate={(currDate) => currDate.isSameOrBefore(moment(), 'day')}
                        style={{ maxWidth: 156, marginRight: 30 }}
                    />
                    <Checkbox onChange={onChangeCheckbox} data-test-id='modal-drawer-right-checkbox-period'>С переодичостью</Checkbox>
                    {withPeriodically && (
                        <Select
                            data-test-id='modal-drawer-right-select-period'
                            value={periodically}
                            options={Array.from(Array(6), (_, i) => ({
                                value: i + 1,
                                label: `Через ${i + 1} день`,
                            }))}
                            onChange={handleChangePeriodically}
                            style={{ marginTop: 8 }}
                        />
                    )}
                </div>
                {exercises.map((e: Exercise, i: number) => (
                    <DrawerForm
                        // eslint-disable-next-line react/no-array-index-key, no-underscore-dangle
                        key={`${e._id}${i}`}
                        name={e.name}
                        approaches={e.approaches}
                        replays={e.replays}
                        weight={e.weight}
                        isEditTraining={isEditTraining}
                        index={i}
                        indexes={indexesForDelete}
                        setIndexes={setIndexesForDelete}
                    />
                ))}
                <div className='drawer-buttons'>
                    <Button
                        type='link'
                        style={{ width: `${windowSize.windowSize > 630 ? '170px' : '165px'}` }}
                        onClick={() => dispatch(addExercises())}
                    >
                        <PlusOutlined />
                        Добавить ещё
                    </Button>
                    <Button
                        type='text'
                        style={{
                            width: `${windowSize.windowSize > 630 ? '170px' : '150px'}`,
                            display: `${isEditTraining ? 'inline' : 'none'}`,
                        }}
                        disabled={indexesForDelete.length === 0}
                        onClick={() => {
                            dispatch(removeExercises(indexesForDelete));
                            setIndexesForDelete([]);
                        }}
                    >
                        <MinusOutlined />
                        Удалить
                    </Button>
                </div>
            </Drawer>
        </React.Fragment>
    );
};
