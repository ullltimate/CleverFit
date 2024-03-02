import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { saveToken } from '@redux/reducers/tokenSlice';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { PATHS } from '@constants/paths';

export const CustomLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (location.pathname === PATHS.INITIAL) {
            const token = params.get('accessToken');
            if (token) {
                localStorage.setItem('token', token);
                dispatch(saveToken(token));
                navigate(PATHS.MAIN);
            } else {
                navigate(PATHS.AUTH);
            }
        }
    }, [dispatch, location.pathname, navigate, params]);

    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};
