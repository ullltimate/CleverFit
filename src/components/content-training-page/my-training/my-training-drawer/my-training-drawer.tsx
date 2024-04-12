import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from '@components/content-calendar-page/drawer-form/drawer-form';
import { TrainingsDataPicker } from '@components/content-training-page/training-datapicker/training-datapicker';
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
    trainingSelector,
} from '@redux/reducers/training-slice';
import { TrainingList } from '@services/catalogs';
import {
    Training,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '@services/trainings';
import { createPeriodString } from '@utils/my-trainings-healper';
import { Button, Checkbox, Drawer, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import './my-training-drawer.css'

type MyTrainingDrawerProps = {
    isEditTraining: boolean;
    isOpenDrawer: boolean;
    setIsOpenDrawer: Dispatch<SetStateAction<boolean>>;
    modalError: (isErrorList: boolean) => void;
    handleOpenAlert: () => void;
    valueEditTrain: string;
    setValueEditTrain: Dispatch<SetStateAction<string>>;
    setPeriodically: Dispatch<SetStateAction<number>>;
    setWithPeriodically: Dispatch<SetStateAction<boolean>>;
    withPeriodically: boolean;
    periodically: number;
    trainingList?: TrainingList[];
    trainings?: Training[];
};

export const MyTrainingDrawer: React.FC<MyTrainingDrawerProps> = ({
    isEditTraining,
    isOpenDrawer,
    setIsOpenDrawer,
    modalError,
    handleOpenAlert,
    valueEditTrain,
    setValueEditTrain,
    trainingList,
    trainings,
    setPeriodically,
    setWithPeriodically,
    withPeriodically,
    periodically,
}) => {
    const { windowSize } = useResize();
    const dispatch = useAppDispatch();
    const [createTraining] = useCreateTrainingMutation();
    const [updateTraining] = useUpdateTrainingMutation();
    const { date, name, exercises, isImplementation, id, parameters } =
        useAppSelector(trainingSelector);
    const [indexesForDelete, setIndexesForDelete] = useState<number[]>([]);
    const [isDisabledSave, setIsDisabledSave] = useState(true);

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

    const handleChangePeriodically = (value: number) => setPeriodically(value);
    const onChangeCheckbox = (e: CheckboxChangeEvent) => setWithPeriodically(e.target.checked);
    const handleChangeSelect = (value: string) => {
        if (trainingList)
            setValueEditTrain(trainingList.filter((train) => train.key === value)[0].name);
    };

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

    const createTrain = async () => {
        await createTraining({
            date,
            name,
            exercises: exercises.filter((e) => e.name !== ''),
            parameters,
        })
            .unwrap()
            .then(() => handleOpenAlert())
            .catch(() => modalError(false));
    };

    const updateTrain = async () => {
        await updateTraining({ date, name, exercises, isImplementation, id })
            .unwrap()
            .then(() => handleOpenAlert())
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

    return (
        <Drawer
            width={windowSize < 630 ? 360 : 408}
            style={{
                marginTop: `${windowSize < 630 ? '85px' : '0px'}`,
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
                padding: `var(--unit-16) var(--unit-${windowSize < 630 ? 16 : 32})`,
                border: 'none',
            }}
            bodyStyle={{ padding: `0px var(--unit-${windowSize < 630 ? 16 : 32})` }}
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
                padding: `12px var(--unit-${windowSize < 630 ? 16 : 32})`,
            }}
        >
            <div className='drawer-trainings'>
                <Select
                    value={valueEditTrain}
                    disabled={isEditTraining}
                    className='drawer-select'
                    data-test-id='modal-create-exercise-select'
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
                    onClick={() => dispatch(addExercises())}
                >
                    <PlusOutlined />
                    Добавить ещё
                </Button>
                <Button
                    type='text'
                    style={{
                        width: `${windowSize > 630 ? '170px' : '150px'}`,
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
    );
};
