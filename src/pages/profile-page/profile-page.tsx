import React, { useEffect, useState } from 'react';
import { CustomUpload } from '@components/constent-profile-page/upload/custom-upload';
import { Header } from '@components/header/header';
import { regPassword, rulesEmail, rulesRepeatPassword, validateMessage } from '@constants/validation';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { UserFull, userFullSelector } from '@redux/reducers/user-full-slice';
import { Button, Card, DatePicker, Form, Input, Layout, Modal } from 'antd';

import './profile-page.css';

const { Content } = Layout;

export const ProfilePage: React.FC = () => {
    const {email, firstName, lastName, birthday, imgSrc} = useAppSelector(userFullSelector);
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState<UserFull>({imgSrc, firstName, lastName, birthday, email});
    const [disabledSave, setDisabledSave] = useState(true);
    const [initFormValues, setInitFormValues] = useState<UserFull>();

    useEffect(() => {
        form.resetFields();
        if(initialValues) setInitFormValues(initialValues);
    },[initialValues, form])

    useEffect(() => {
        setInitialValues({imgSrc, firstName, lastName, birthday: birthday ? new Date(birthday) : '', email})
    },[email, firstName, lastName, birthday, imgSrc])

    const onFinish = (values: UserFull) => {
        console.log(values);
        
    }

    const onValuesChange = (_, allValues: UserFull) => {
        console.log(JSON.stringify(allValues))
        console.log(JSON.stringify(initFormValues))
        console.log(JSON.stringify(allValues) === JSON.stringify(initFormValues))
        if (JSON.stringify(allValues) === JSON.stringify(initFormValues)) {
            setDisabledSave(true)
        } else {
            setDisabledSave(false)
        }
    }

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
    };

    return (
        <React.Fragment>
            <Header />
            <Content style={{ margin: 24 }}>
                <Card className='profile' style={{ height: '100%' }}>
                    <Form name='profile' 
                        style={{maxWidth: 480}}
                        form={form}
                        initialValues={initialValues}
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                    >
                        <h5>Личная информация</h5>
                        <div className='info-wrapper'>
                            <CustomUpload modalError={modalError} setDisabledSave={setDisabledSave}/>
                            <div className='info'>
                                <Form.Item name='firstName'>
                                    <Input placeholder='Имя' data-test-id='profile-name'/>
                                </Form.Item>
                                <Form.Item name='lastName'>
                                    <Input placeholder='Фамилия' data-test-id='profile-surname'/>
                                </Form.Item>
                                <Form.Item name='birthday'>
                                    <DatePicker placeholder='Дата рождения' format='DD.MM.YYYY' style={{width: '100%'}} data-test-id='profile-birthday' allowClear={false}/>
                                </Form.Item>
                            </div>
                        </div>
                        <h5>Приватность и авторизация</h5>
                        <Form.Item name='email' rules={rulesEmail}>
                            <Input addonBefore='e-mail' data-test-id='profile-email' />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            help={validateMessage.password}
                            rules={[{ required: false, pattern: regPassword, message: validateMessage.password}]}
                        >
                            <Input.Password
                                type='password'
                                placeholder='Пароль'
                                data-test-id='profile-password'
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirmPassword'
                            dependencies={['password']}
                            rules={rulesRepeatPassword}
                        >
                            <Input.Password
                                type='password'
                                placeholder='Повторите пароль'
                                data-test-id='profile-repeat-password'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' disabled={disabledSave} htmlType='submit' data-test-id='profile-submit'>
                                Сохранить изменения
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </React.Fragment>
    );
};
