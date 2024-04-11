import React, { useCallback, useEffect, useState } from 'react';
import {
    CheckCircleFilled,
    CloseOutlined,
    EditOutlined,
    MinusOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { DrawerForm } from '@components/content-calendar-page/drawer-form/drawer-form';
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
import { useGetTrainingListQuery } from '@services/catalogs';
import {
    Training,
    useCreateTrainingMutation,
    useGetTrainingQuery,
    useUpdateTrainingMutation,
} from '@services/trainings';
import { createPeriodString } from '@utils/my-trainings-healper';
import {
    Alert,
    Button,
    Checkbox,
    Drawer,
    Modal,
    Select,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { TrainingsDataPicker } from '../training-datapicker/training-datapicker';

import { AllTrainings } from './all-trainings/all-trainings';
import { EmptyTraining } from './my-training-empty/training-empty';

import './my-training.css';

export const MyTraining: React.FC = () => {
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList, error: errorList } = useGetTrainingListQuery();
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
                    ' '
                },
            });
        },
        [],
    );

    useEffect(() => {
        if (errorList) modalError(true);
    }, [errorList, modalError]);


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

    const handleChangeSelect = (value: string) => {
        if (trainingList)
            setValueEditTrain(trainingList.filter((train) => train.key === value)[0].name);
    };
    
    const onChangeCheckbox = (e: CheckboxChangeEvent) => setWithPeriodically(e.target.checked);


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

    const handleChangePeriodically = (value: number) => setPeriodically(value);

    useEffect(() => {
        if (withPeriodically) {
            dispatch(setParameters({ repeat: withPeriodically, period: periodically }));
        } else {
            dispatch(resetParameters());
        }
    }, [withPeriodically, periodically, dispatch]);

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
                <AllTrainings editTraining={editTraining} trainings={trainings} addTraining={addTraining} />
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
                    <TrainingsDataPicker trainings={trainings} dateTrain={date} />
                    <Checkbox
                        onChange={onChangeCheckbox}
                        data-test-id='modal-drawer-right-checkbox-period'
                        checked={withPeriodically}
                    >
                        С переодичостью
                    </Checkbox>
                    {withPeriodically && (
                        <Select
                            className='drawer-select-period'
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
