import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from '@components/content-calendar-page/drawer-form/drawer-form';
import { TrainingsDataPicker } from '@components/content-training-page/training-datapicker/training-datapicker';
import { colorTrainings } from '@constants/calendar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useResize } from '@hooks/use-resize';
import { addExercises, Exercise, removeExercises, resetExercises, resetParameters, saveTrainingDate, saveTrainingName, setParameters, trainingSelector } from '@redux/reducers/training-slice';
import { TrainingPals } from '@services/catalogs';
import { useSendInviteMutation } from '@services/invite';
import { Training, useCreateTrainingMutation } from '@services/trainings';
import { sortAndFilterUserList } from '@utils/join-trainings-healper';
import { createPeriodString } from '@utils/my-trainings-healper';
import { Badge, Button, Checkbox, Drawer, Input, List, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { CustomAvatar } from '../custom-avatar/custom-avatar';
import { JoinUserCard } from '../join-user-card/join-user-card';

import './join-users.css';

const { Search } = Input;

type JoinUsersProps = {
    setIsChoiceJoinUser: React.Dispatch<React.SetStateAction<boolean>>;
    usersList: TrainingPals[] | undefined;
    trainings: Training[] | undefined;
};

export const JoinUsers: React.FC<JoinUsersProps> = ({ setIsChoiceJoinUser, usersList, trainings }) => {
    const [searchValue, setSearchValue] = useState('');
    const onSearch = (value: string) => setSearchValue(value);
    const [filteredUsersList, setFilteredUsersList] = useState<TrainingPals[]>();
    const {windowSize} = useResize();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [withPeriodically, setWithPeriodically] = useState(false);
    const [periodically, setPeriodically] = useState(1);
    const [indexesForDelete, setIndexesForDelete] = useState<number[]>([]);
    const [userNameForTrain, setUserNameForTrain] = useState<string>('');
    const [userImgForTrain, setUserImgForTrain] = useState<string | null>(null);
    const [userIdForTrain, setUserIdForTrain] = useState<string>();
    const [isDisabledSave, setIsDisabledSave] = useState(true);
    const [createTraining] = useCreateTrainingMutation();
    const [sendInvite] = useSendInviteMutation();
    const [isAccessSend, setIsAccessSend] = useState(false);
    const { date, name, exercises, parameters } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();
    const closeDrawer = () => {
        setIsOpenDrawer(false);
        setIsOpenDrawer(false);
        dispatch(resetExercises());
        dispatch(saveTrainingDate(''));
        dispatch(resetParameters());
        setWithPeriodically(false);
        setPeriodically(1);
    };
    const openDrawer = (trainName: string, userName: string, userImg: string | null, id: string) => {
        setIsOpenDrawer(true);
        dispatch(saveTrainingName(trainName));
        setUserNameForTrain(userName);
        setUserImgForTrain(userImg);
        setUserIdForTrain(id)
        dispatch(resetExercises());
        dispatch(addExercises());
        setIsAccessSend(false)
    };

    const onChangeCheckbox = (e: CheckboxChangeEvent) => setWithPeriodically(e.target.checked);
    const handleChangePeriodically = (value: number) => setPeriodically(value);

    const sendInviteToUser = async() => {
        const {_id} = await createTraining({
                                date,
                                name,
                                exercises: exercises.filter((e) => e.name !== ''),
                                parameters,
                            }).unwrap();

        sendInvite({
            to: userIdForTrain,
            trainingId: _id
        }).unwrap().then(() => setIsAccessSend(true)).catch(() => {})
        closeDrawer();
    }

    useEffect(() => {
        if (usersList) setFilteredUsersList(sortAndFilterUserList(usersList, searchValue));
    }, [usersList, searchValue]);

    useEffect(() => {
        if (withPeriodically) {
            dispatch(setParameters({ repeat: withPeriodically, period: periodically }));
        } else {
            dispatch(resetParameters());
        }
    }, [withPeriodically, periodically, dispatch]);

    useEffect(() => {
        if (date && exercises.some((e) => e.name)) {
            setIsDisabledSave(false);
        } else {
            setIsDisabledSave(true);
        }
    }, [date, exercises]);

    return (
        <React.Fragment>
            <div className='join-users-header'>
                <Button type='text' onClick={() => setIsChoiceJoinUser(false)}>
                    <ArrowLeftOutlined />
                    Назад
                </Button>
                <Search
                    placeholder='Поиск по имени'
                    data-test-id='search-input'
                    onSearch={onSearch}
                />
            </div>
            <List
                pagination={{ pageSize: 12, size: 'small', showSizeChanger: false }}
                dataSource={filteredUsersList}
                renderItem={(item, index) => <JoinUserCard key={item.id} partner={item} openDrawer={openDrawer} index={index} isAccessSend={isAccessSend} userIdForTrain={userIdForTrain} searchValue={searchValue}/>}
                className='join-users'
            />
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
                        <PlusOutlined style={{ marginRight: 6 }} />
                        <h4
                            style={{
                                display: 'inline-block',
                                margin: 0,
                                fontSize: 20,
                                fontWeight: 500,
                            }}
                        >
                            Совместная тренировка
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
                        style={{ width: '100%' }}
                        disabled={isDisabledSave}
                        onClick={sendInviteToUser}
                    >
                        Отправить приглашение
                    </Button>
                }
                footerStyle={{
                    padding: `12px var(--unit-${windowSize < 630 ? 16 : 32})`,
                }}
            >
                <div className='drawer-trainings'>
                    <div className='drawer-users-info-wrap'>
                    <CustomAvatar name={userNameForTrain} imageSrc={userImgForTrain} isUserCard={false}/>
                        <Badge
                            color={
                                colorTrainings.find((el) => el.name === name)?.color
                            }
                            text={name}
                        />
                    </div>
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
                        isEditTraining={true}
                        index={i}
                        indexes={indexesForDelete}
                        setIndexes={setIndexesForDelete}
                    />
                ))}
                <div className='drawer-buttons'>
                    <Button
                        type='link'
                        style={{ width: `${windowSize > 630 ? '170px' : '165px'}` }}
                        onClick={() => dispatch(addExercises())}
                    >
                        <PlusOutlined />
                        Добавить ещё
                    </Button>
                    <Button
                        type='text'
                        style={{
                            width: `${windowSize > 630 ? '170px' : '150px'}`,
                            display: 'inline',
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
