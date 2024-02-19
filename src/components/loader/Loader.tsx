import React from 'react';
import Lottie from 'lottie-react';
import animationData from './lottie.json';

export const Loader: React.FC = () => {
    
    return (
        <>
            <Lottie animationData={animationData} loop={true} style={{width: '150px'}} />
        </>
    );
};
