import { CustomTabs } from '@components/content-auth-page/tabs/Tabs';
import { CustomLayout } from '@components/layout/layout';
import { Result } from '@components/result/result';
import { PATHS } from '@constants/paths';
import { resultData } from '@constants/resultData';
import { AuthPage } from '@pages/auth-page';
import { MainPage } from '@pages/main-page';
import { Navigate, Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path={PATHS.INITIAL} element={<CustomLayout />}>
            <Route path={PATHS.AUTH} element={<AuthPage><CustomTabs/></AuthPage>}>
                <Route path={PATHS.REGISTRATION} element={<AuthPage><CustomTabs/></AuthPage>}></Route>
            </Route>
            <Route path={PATHS.RESULT.ERROR_LOGIN} 
                element={
                    <AuthPage>
                        <Result icon={resultData.error_login.icon} 
                            title={resultData.error_login.title}
                            text={resultData.error_login.text}
                            btnText={resultData.error_login.btnText}
                            btnPath={resultData.error_login.btnPath}
                            />
                    </AuthPage>
                }>
            </Route>
            <Route path={PATHS.RESULT.SUCCESS} 
                element={
                    <AuthPage>
                        <Result icon={resultData.success_signup.icon} 
                            title={resultData.success_signup.title}
                            text={resultData.success_signup.text}
                            btnText={resultData.success_signup.btnText}
                            btnPath={resultData.success_signup.btnPath}
                        />
                    </AuthPage>
                }>
            </Route>
            <Route path={PATHS.RESULT.ERROR_USER_EXIST}
                element={
                    <AuthPage>
                        <Result icon={resultData.error_user_exist.icon} 
                            title={resultData.error_user_exist.title}
                            text={resultData.error_user_exist.text}
                            btnText={resultData.error_user_exist.btnText}
                            btnPath={resultData.error_user_exist.btnPath}
                        />
                    </AuthPage>
                }>
            </Route>
            <Route path={PATHS.RESULT.ERROR} 
                element={
                    <AuthPage>
                        <Result icon={resultData.error.icon} 
                            title={resultData.error.title}
                             text={resultData.error.text}
                            btnText={resultData.error.btnText}
                            btnPath={resultData.error.btnPath}
                        />
                    </AuthPage>
                }>
            </Route>
            <Route path={PATHS.MAIN} element={<MainPage />}></Route>
            <Route path={PATHS.INITIAL} element={<Navigate to={PATHS.AUTH} />} />
        </Route>
    </Routes>
);
