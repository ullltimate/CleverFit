import { CustomTabs } from '@components/content-auth-page/tabs/Tabs';
import { CustomLayout } from '@components/layout/layout';
import { ErrorLogin } from '@components/result/errorLogin';
import { Result } from '@components/result/result';
import { SuccessSignup } from '@components/result/successSignup';
import { AuthPage } from '@pages/auth-page';
import { MainPage } from '@pages/main-page';
import { Navigate, Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path='/' element={<CustomLayout />}>
            <Route path='/auth' element={<AuthPage><CustomTabs/></AuthPage>}>
                <Route path='/auth/registration' element={<AuthPage><CustomTabs/></AuthPage>}></Route>
            </Route>
            <Route path='/result' element={<AuthPage><Result/></AuthPage>}>
                <Route path='/result/error-login' element={<ErrorLogin/>}></Route>
                <Route path='/result/success' element={<SuccessSignup/>}></Route>
            </Route>
            <Route path='/main' element={<MainPage />}></Route>
            <Route path='/' element={<Navigate to='/auth' />} />
        </Route>
    </Routes>
);
