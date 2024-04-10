import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './custom-avatar.css';

type CustomAvatarProps = {
    name: string,
    imageSrc: string | null;
    isUserCard: boolean;
    searchValue?: string;
};

export const CustomAvatar: React.FC<CustomAvatarProps> = ({ name, imageSrc, isUserCard, searchValue }) => {
    const highlightSubStr = () => 
        searchValue
            ? name.replace(new RegExp(searchValue, 'gi'), (match) => `<span>${match}</span>`)
            : name;


    return (
        <div className='user-card-avatar-wrap'>
            <Avatar
                size={42}
                alt={name}
                src={imageSrc}
                icon={!imageSrc && <UserOutlined style={{ color: 'black' }} />}
            />
            {isUserCard ? (
                <p
                    className='join-users-item__name'
                    dangerouslySetInnerHTML={{ __html: highlightSubStr() }}
                />
            ) : (
                <p className='join-users-item__name'>{name}</p>
            )}
        </div>
    );
};
