import React from 'react';
import { CustomUpload } from '@components/constent-profile-page/upload/custom-upload';
import { Header } from '@components/header/header';
import { Card, Layout, Modal } from 'antd';

import './profile-page.css';

const { Content } = Layout;

export const ProfilePage: React.FC = () => {
    const modalError = (isErrorSave: boolean) => {
        Modal.error({
            className: 'error-list',
            centered: true,
            maskClosable: true,
            maskStyle: { background: '#799CD41A', backdropFilter: 'blur(5px)' },
            title: (
                <span>
                    {isErrorSave
                        ? 'При сохранении данных произошла ошибка '
                        : 'Файл слишком большой'}
                </span>
            ),
            content: (
                <div>
                    <p>
                        {isErrorSave
                            ? 'Придётся попробовать ещё раз'
                            : 'Выберите файл размером до 5МБ.'}
                    </p>
                </div>
            ),
            okText: <span data-test-id='big-file-error-close'>Закрыть</span>,
            onOk() {
                ('');
            },
        });
    }

    return (
        <React.Fragment>
            <Header />
            <Content style={{ margin: 24 }}>
                <Card style={{ height: '100%' }}>
                    <h5>Личная информация</h5>
                    <div data-test-id='profile-avatar'>
                        <CustomUpload modalError={modalError}/>
                    </div>

                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Content>
        </React.Fragment>
    );
};
