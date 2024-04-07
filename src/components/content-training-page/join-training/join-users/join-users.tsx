import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TrainingPals } from '@services/catalogs';
import { Button, Input, List } from 'antd';

import './join-users.css';
import { JoinUserCard } from '../join-user-card/join-user-card';

const { Search } = Input;

type JoinUsersProps = {
    setIsChoiceJoinUser: React.Dispatch<React.SetStateAction<boolean>>;
    usersList: TrainingPals[] | undefined;
};

export const JoinUsers: React.FC<JoinUsersProps> = ({ setIsChoiceJoinUser, usersList }) => {
    const onSearch = (value: string) => console.log(value);
    console.log(usersList);

    return (
        <React.Fragment>
            <div className='join-users-header'>
                <Button type='text' onClick={() => setIsChoiceJoinUser(false)}>
                    <ArrowLeftOutlined />
                    Назад
                </Button>
                <Search
                    placeholder='input search text'
                    onSearch={onSearch}
                    style={{ width: 200 }}
                />
            </div>
            {usersList && (
                <List
                    pagination={{ pageSize: 12, size: 'small'}}
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={usersList}
                    renderItem={(item) => <JoinUserCard key={item.id} partner={item} />}
                    className='join-users'
                />
            )}
        </React.Fragment>
    );
};
