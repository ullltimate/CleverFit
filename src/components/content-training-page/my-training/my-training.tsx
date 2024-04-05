import React, { useCallback, useEffect, useState } from 'react';
import {
    CheckCircleFilled,
    CloseOutlined,
    DownOutlined,
    EditOutlined,
    MinusOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { DrawerForm } from '@components/content-calendar-page/drawer-form/drawer-form';
import { colorTrainings } from '@constants/calendar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useResize } from '@hooks/use-resize';
import {
    addExercises,
    Exercise,
    removeExercises,
    resetExercises,
    resetParameters,
    saveTrainingDate,
    saveTrainingId,
    saveTrainingName,
    setExercises,
    setParameters,
    trainingSelector,
} from '@redux/reducers/training-slice';
import { useLazyGetTrainingListQuery } from '@services/catalogs';
import {
    Training,
    useCreateTrainingMutation,
    useGetTrainingQuery,
    useUpdateTrainingMutation,
} from '@services/trainings';
import {
    Alert,
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
    const [getTrainingList, { data: trainingList, error: errorList }] =
        useLazyGetTrainingListQuery();
    const [error, setError] = useState(false);
    const windowSize = useResize();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isEditTraining, setIsEditTraining] = useState(false);
    const [valueEditTrain, setValueEditTrain] = useState('Выбор типа тренировки');
    const [withPeriodically, setWithPeriodically] = useState(false);
    const { date, name, exercises, isImplementation, id, parameters } =
        useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();
    const [indexesForDelete, setIndexesForDelete] = useState<number[]>([]);
    const [isDisabledSave, setIsDisabledSave] = useState(true);
    const [createTraining] = useCreateTrainingMutation();
    const [updateTraining] = useUpdateTrainingMutation();
    const [periodically, setPeriodically] = useState(1);
    const closeDrawer = () => {
        setIsOpenDrawer(false);
        setValueEditTrain('Выбор типа тренировки');
        dispatch(resetExercises());
        dispatch(saveTrainingDate(''));
        dispatch(resetParameters());
        setWithPeriodically(false);
        setPeriodically(1);
        dispatch(saveTrainingId(''));
    };
    const openDrawer = () => {
        dispatch(resetExercises());
        dispatch(addExercises());
        setIsOpenDrawer(true);
    };
    const [visible, setVisible] = useState(false);
    const handleCloseAlert = () => setVisible(false);
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
        getTrainingList();
    }, [getTrainingList]);

    useEffect(() => {
        setError(false);
        if (errorList) setError(true);
    }, [errorList]);

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
        await createTraining({
            date,
            name,
            exercises: exercises.filter((e) => e.name !== ''),
            parameters,
        })
            .unwrap()
            .then(() => setVisible(true))
            .catch(() => modalError(false));
    };

    const updateTrain = async () => {
        await updateTraining({ date, name, exercises, isImplementation, id })
            .unwrap()
            .then(() => setVisible(true))
            .catch(() => modalError(false));
    };
    const save = () => {
        if (id) {
            updateTrain();
        } else {
            createTrain();
        }
        closeDrawer();
    };

    const handleChangePeriodically = (value: number) => {
        setPeriodically(value);
    };

    useEffect(() => {
        if (withPeriodically) {
            dispatch(setParameters({ repeat: withPeriodically, period: periodically }));
        } else {
            dispatch(resetParameters());
        }
    }, [withPeriodically, periodically, dispatch]);

    const createPeriodString = (day: number | null): string => {
        let periodString = '';

        switch (day) {
            case 1:
                periodString = `Через ${day} день`;
                break;
            case 2:
            case 3:
            case 4:
                periodString = `Через ${day} дня`;
                break;
            case 5:
            case 6:
                periodString = `Через ${day} дней`;
                break;
            case 7:
                periodString = '1 раз в неделю';
                break;
        }

        return periodString;
    };

    type DataSourceType = {
        typeTrain: React.ReactElement;
        sorted: React.ReactElement;
        period: number;
        editBtn: React.ReactElement;
    };

    const addTraining = () => {
        setIsEditTraining(false);
        openDrawer();
    };

    const editTraining = (e: Training) => {
        setIsEditTraining(true);
        openDrawer();
        dispatch(saveTrainingName(e.name));
        dispatch(saveTrainingDate(e.date));
        setValueEditTrain(e.name);
        dispatch(setExercises(e.exercises));
        dispatch(setParameters(e.parameters));
        setWithPeriodically(e.parameters.repeat);
        if (e.parameters.period) setPeriodically(e.parameters.period);
        dispatch(saveTrainingId(e._id));
    };

    return (
        <React.Fragment>
            {trainings?.length ? (
                <React.Fragment>
                    <Table
                        data-test-id='my-trainings-table'
                        pagination={{
                            defaultPageSize: windowSize.windowSize < 370 ? 8 : 10,
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                            position: ['bottomLeft'],
                            size: 'small'
                        }}
                        style={{
                            paddingTop: `${
                                windowSize.windowSize < 370 ? 'var(--unit-16)' : 'var(--unit-24)'
                            }`,
                            maxWidth: 560,
                        }}
                        rowKey={() => uuidv4()}
                        dataSource={trainings.map((e, i) => ({
                            typeTrain: (
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Badge
                                        color={
                                            colorTrainings.find((el) => el.name === e.name)?.color
                                        }
                                        text={e.name}
                                    />
                                    <DownOutlined style={{maxWidth: 10}}/>
                                </div>
                            ),
                            sorted: createPeriodString(e.parameters.period),
                            period: e.parameters.period || 8,
                            editBtn: (
                                <Button
                                    type='link'
                                    onClick={() => editTraining(e)}
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
            ) : (
                <EmptyTraining openDrawer={addTraining} />
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
                        onClick={save}
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
                        disabled={isEditTraining}
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
                        value={date ? moment(date) : undefined}
                        disabledDate={(currDate) => currDate.isSameOrBefore(moment(), 'day')}
                        style={{ maxWidth: 156, marginRight: 30 }}
                    />
                    <Checkbox
                        onChange={onChangeCheckbox}
                        data-test-id='modal-drawer-right-checkbox-period'
                        checked={withPeriodically}
                    >
                        С переодичостью
                    </Checkbox>
                    {withPeriodically && (
                        <Select
                            data-test-id='modal-drawer-right-select-period'
                            value={periodically}
                            options={Array.from(Array(7), (_, i) => ({
                                value: i + 1,
                                label: createPeriodString(i + 1),
                            }))}
                            onChange={handleChangePeriodically}
                            style={{ marginTop: 8 }}
                        />
                    )}
                </div>
                {exercises.map((e: Exercise, i: number) => (
                    <DrawerForm
                        // eslint-disable-next-line react/no-array-index-key
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
            {visible ? (
                <Alert
                    message={
                        <span>
                            <CheckCircleFilled
                                style={{ color: 'var(--color-success)', marginRight: 10 }}
                            />
                            {isEditTraining
                                ? 'Тренировка успешно обновлена'
                                : 'Новая тренировка успешно добавлена'}
                        </span>
                    }
                    className='alert'
                    type='success'
                    closable={true}
                    onClose={handleCloseAlert}
                    data-test-id='create-training-success-alert'
                />
            ) : null}
        </React.Fragment>
    );
};
