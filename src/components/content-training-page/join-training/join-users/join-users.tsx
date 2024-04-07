import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TrainingPals } from '@services/catalogs';
import { sortAndFilterUserList } from '@utils/join-trainings-healper';
import { Button, Input, List } from 'antd';

import { JoinUserCard } from '../join-user-card/join-user-card';

import './join-users.css';

const { Search } = Input;

type JoinUsersProps = {
    setIsChoiceJoinUser: React.Dispatch<React.SetStateAction<boolean>>;
    usersList: TrainingPals[] | undefined;
};

export const JoinUsers: React.FC<JoinUsersProps> = ({ setIsChoiceJoinUser, usersList }) => {
    const [searchValue, setSearchValue] = useState('');
    const onSearch = (value: string) => setSearchValue(value);
    const [filteredUsersList, setFilteredUsersList] = useState<TrainingPals[]>();

    useEffect(() => {
        if(usersList) setFilteredUsersList(sortAndFilterUserList(usersList, searchValue))
    },[usersList, searchValue])


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
            <List
                pagination={{ pageSize: 12, size: 'small'}}
                grid={{ gutter: 16, column: 4 }}
                dataSource={filteredUsersList}
                renderItem={(item) => <JoinUserCard key={item.id} partner={item} />}
                className='join-users'
            />
        </React.Fragment>
    );
};
