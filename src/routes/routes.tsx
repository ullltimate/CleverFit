import { ChangePassword } from '@components/content-auth-page/change-password/change-password';
import { ConfirmEmail } from '@components/content-auth-page/confirm-email/confirm-email';
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
            <Route
                path={PATHS.AUTH}
                element={
                    <AuthPage>
                        <CustomTabs />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.REGISTRATION}
                element={
                    <AuthPage>
                        <CustomTabs />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.CONFIRM_EMAIL}
                element={
                    <AuthPage>
                        <ConfirmEmail />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.CHANGE_PASSWORD}
                element={
                    <AuthPage>
                        <ChangePassword />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.ERROR_LOGIN}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.error_login.icon}
                            title={resultData.error_login.title}
                            text={resultData.error_login.text}
                            btnText={resultData.error_login.btnText}
                            btnPath={resultData.error_login.btnPath}
                            dataAtribute={resultData.error_login.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.SUCCESS}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.success_signup.icon}
                            title={resultData.success_signup.title}
                            text={resultData.success_signup.text}
                            btnText={resultData.success_signup.btnText}
                            btnPath={resultData.success_signup.btnPath}
                            dataAtribute={resultData.success_signup.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.ERROR_USER_EXIST}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.error_user_exist.icon}
                            title={resultData.error_user_exist.title}
                            text={resultData.error_user_exist.text}
                            btnText={resultData.error_user_exist.btnText}
                            btnPath={resultData.error_user_exist.btnPath}
                            dataAtribute={resultData.error_user_exist.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.ERROR}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.error.icon}
                            title={resultData.error.title}
                            text={resultData.error.text}
                            btnText={resultData.error.btnText}
                            btnPath={resultData.error.btnPath}
                            dataAtribute={resultData.error.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.ERROR_CHANGE_PASSWORD}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.error_change_password.icon}
                            title={resultData.error_change_password.title}
                            text={resultData.error_change_password.text}
                            btnText={resultData.error_change_password.btnText}
                            btnPath={resultData.error_change_password.btnPath}
                            dataAtribute={resultData.error_change_password.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.SUCCESS_CHANGE_PASSWORD}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.success_change_password.icon}
                            title={resultData.success_change_password.title}
                            text={resultData.success_change_password.text}
                            btnText={resultData.success_change_password.btnText}
                            btnPath={resultData.success_change_password.btnPath}
                            dataAtribute={resultData.success_change_password.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.ERROR_EMAIL_NO_EXIST}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.error_email_no_exist.icon}
                            title={resultData.error_email_no_exist.title}
                            text={resultData.error_email_no_exist.text}
                            btnText={resultData.error_email_no_exist.btnText}
                            btnPath={resultData.error_email_no_exist.btnPath}
                            dataAtribute={resultData.error_email_no_exist.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route
                path={PATHS.RESULT.ERROR_CHECK_EMAIL}
                element={
                    <AuthPage>
                        <Result
                            icon={resultData.error_check_email.icon}
                            title={resultData.error_check_email.title}
                            text={resultData.error_check_email.text}
                            btnText={resultData.error_check_email.btnText}
                            btnPath={resultData.error_check_email.btnPath}
                            dataAtribute={resultData.error_check_email.dataAtribute}
                        />
                    </AuthPage>
                }
            />
            <Route path={PATHS.MAIN} element={<MainPage />} />
            <Route path={PATHS.INITIAL} element={<Navigate to={PATHS.AUTH} />} />
        </Route>
    </Routes>
);
