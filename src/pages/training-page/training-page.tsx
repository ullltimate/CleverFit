import React, { useCallback, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { CustomBreadcrumb } from '@components/breadcrumb/custom-breadcrumb';
import { Header } from '@components/header/header';
import { Loader } from '@components/loader/loader';
import { useResize } from '@hooks/use-resize';
import { useGetTrainingListQuery } from '@services/catalogs';
import { useGetTrainingQuery } from '@services/trainings';
import { Card, Layout, Modal } from 'antd';

import './training-page.css';

const { Content } = Layout;

export const TrainingPage: React.FC = () => {
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList, error: errorList, isLoading, refetch } = useGetTrainingListQuery();
    const windowSize = useResize();
    console.log(trainings, trainingList)

    const modalError = useCallback((isErrorList: boolean) => {
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
                    {   
                        isErrorList 
                        ? 'При открытии данных произошла ошибка'
                        : 'При сохранении данных произошла ошибка '
                    }
                </span>
            ),
            content: (
                <div>
                    <p data-test-id='modal-error-user-training-subtitle'>
                       {
                            isErrorList
                            ? 'Попробуйте ещё раз.'
                            : 'Придётся попробовать ещё раз'
                       }
                    </p>
                </div>
            ),
            okText: <span data-test-id='modal-error-user-training-button'>
                        {
                            isErrorList
                            ? 'Обновить'
                            : 'Закрыть'
                       }
                    </span>,
            onOk() {
                refetch();
            },
        });
    }, [refetch]);

    useEffect(() => {
        if(errorList) modalError(true);
    }, [errorList, modalError]);

    return (
        <React.Fragment>
            {isLoading && <Loader/>}
            <CustomBreadcrumb />
            <Header />
            <Content style={{ padding: windowSize.windowSize < 370 ? '24px 0px' : 24 }}>
                <Card className='profile' style={{ height: '100%' }}>
                    Trainings page
                </Card>
            </Content>
        </React.Fragment>
    );
};
