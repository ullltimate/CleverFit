import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { PATHS } from '@constants/paths';
import { routes } from '@constants/breadcrumbs';

import './breadcrumb.css';

type ICurrentRoutes = {
    path?: string;
    name: string;
};

export const CustomBreadcrumb: React.FC = () => {
    const [currentRoutes, setCurrentRoutes] = useState<ICurrentRoutes[]>();
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case PATHS.MAIN:
                setCurrentRoutes(routes.main);
                break;
            case PATHS.FEEDBACKS:
                setCurrentRoutes(routes.feedbacks);
                break;
        }
    }, [location.pathname]);

    return (
        <>
            <div className='breadcrumb'>
                <Breadcrumb>
                    {currentRoutes &&
                        currentRoutes.map((e, i) => (
                            <Breadcrumb.Item key={i}>
                                {e.path ? <Link to={e.path}>{e.name}</Link> : e.name}
                            </Breadcrumb.Item>
                        ))}
                </Breadcrumb>
            </div>
        </>
    );
};
