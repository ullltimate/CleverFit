import React, { useCallback, useEffect, useState } from 'react';
import {
    CheckCircleFilled,
    CloseOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    addExercises,
    resetExercises,
    resetParameters,
    saveTrainingDate,
    saveTrainingId,
    saveTrainingName,
    setExercises,
    setParameters,
} from '@redux/reducers/training-slice';
import { useGetTrainingListQuery } from '@services/catalogs';
import {
    Training,
    useGetTrainingQuery,
} from '@services/trainings';
import { Alert, Modal } from 'antd';

import { AllTrainings } from './all-trainings/all-trainings';
import { MyTrainingDrawer } from './my-training-drawer/my-training-drawer';
import { EmptyTraining } from './my-training-empty/training-empty';

import './my-training.css';

export const MyTraining: React.FC = () => {
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList, error: errorList } = useGetTrainingListQuery();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isEditTraining, setIsEditTraining] = useState(false);
    const [valueEditTrain, setValueEditTrain] = useState('Выбор типа тренировки');
    const [withPeriodically, setWithPeriodically] = useState(false);
    const dispatch = useAppDispatch();
    const [periodically, setPeriodically] = useState(1);
    
    const openDrawer = () => {
        dispatch(resetExercises());
        dispatch(addExercises());
        setIsOpenDrawer(true);
    };
    const [visible, setVisible] = useState(false);
    const handleCloseAlert = () => setVisible(false);
    const handleOpenAlert = () => setVisible(true);

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
            <MyTrainingDrawer 
                    isEditTraining={isEditTraining} 
                    isOpenDrawer={isOpenDrawer} 
                    setIsOpenDrawer={setIsOpenDrawer} 
                    modalError={modalError} 
                    handleOpenAlert={handleOpenAlert}
                    trainingList={trainingList}
                    setValueEditTrain={setValueEditTrain}
                    trainings={trainings}
                    valueEditTrain={valueEditTrain}
                    setPeriodically={setPeriodically}
                    setWithPeriodically={setWithPeriodically}
                    withPeriodically={withPeriodically}
                    periodically={periodically}/>
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
