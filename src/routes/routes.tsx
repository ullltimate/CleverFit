import { CustomTabs } from '@components/content-auth-page/tabs/Tabs';
import { CustomLayout } from '@components/layout/layout';
import { Error } from '@components/result/error';
import { ErrorLogin } from '@components/result/errorLogin';
import { ErrorUserExist } from '@components/result/errorUserExist';
import { Result } from '@components/result/result';
import { SuccessSignup } from '@components/result/successSignup';
import { PATHS } from '@constants/paths';
import { AuthPage } from '@pages/auth-page';
import { MainPage } from '@pages/main-page';
import { Navigate, Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path={PATHS.INITIAL} element={<CustomLayout />}>
            <Route path={PATHS.AUTH} element={<AuthPage><CustomTabs/></AuthPage>}>
                <Route path={PATHS.REGISTRATION} element={<AuthPage><CustomTabs/></AuthPage>}></Route>
            </Route>
            <Route path='/result' element={<AuthPage><Result/></AuthPage>}>
                <Route path={PATHS.RESULT.ERROR_LOGIN} element={<ErrorLogin/>}></Route>
                <Route path={PATHS.RESULT.SUCCESS} element={<SuccessSignup/>}></Route>
                <Route path={PATHS.RESULT.ERROR_USER_EXIST} element={<ErrorUserExist/>}></Route>
                <Route path={PATHS.RESULT.ERROR} element={<Error/>}></Route>
            </Route>
            <Route path={PATHS.MAIN} element={<MainPage />}></Route>
            <Route path={PATHS.INITIAL} element={<Navigate to={PATHS.AUTH} />} />
        </Route>
    </Routes>
);
