import React from 'react';
import './result.css'
import { Outlet } from 'react-router-dom';


export const Result: React.FC = () => {

    return (
        <>
            <div className='result'>
                <Outlet/>
            </div>
        </>
    );
};