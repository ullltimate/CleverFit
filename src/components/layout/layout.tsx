import React from 'react';
import { Outlet } from 'react-router-dom';

export const CustomLayout: React.FC = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};