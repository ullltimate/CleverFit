import React, { useCallback, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useGetTrainingListQuery } from '@services/catalogs';
import { useGetTrainingQuery } from '@services/trainings';
import { Modal } from 'antd';

import './my-training.css';

export const MyTraining: React.FC = () => {
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList, error: errorList, refetch } = useGetTrainingListQuery();
    console.log(trainings)
    console.log(trainingList)
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
                    refetch();
                },
            });
        },
        [refetch],
    );

    useEffect(() => {
        if (errorList) modalError(true);
    }, [errorList, modalError]);

    return (
        <React.Fragment>
            My training
        </React.Fragment>
    )
};
