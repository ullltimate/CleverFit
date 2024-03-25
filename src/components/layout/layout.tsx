import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PATHS } from '@constants/paths';
import { useAppDispatch} from '@hooks/typed-react-redux-hooks';
import { saveToken } from '@redux/reducers/token-slice';
import { useLazyGetUserQuery } from '@services/user';

export const CustomLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const dispatch = useAppDispatch();
    const [getUserFull] = useLazyGetUserQuery();

    useEffect(() => {
        if (location.pathname === PATHS.INITIAL) {
            const token = params.get('accessToken');

            if (token) {
                localStorage.setItem('token', token);
                dispatch(saveToken(token));
                navigate(PATHS.MAIN);
                getUserFull();
            } else {
                navigate(PATHS.AUTH);
            }
        }
    }, [dispatch, getUserFull, location.pathname, navigate, params]);

    return (
        <div>
            <Outlet />
        </div>
    );
};
