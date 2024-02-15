import { LogIn } from '@components/content-auth-page/logIn';
import { AuthPage } from '@pages/auth-page';
//import { MainPage } from '@pages/main-page';
import { Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path="/" element={<AuthPage />}>
            <Route path='/' element={<LogIn />}>
                
            </Route>
        </Route>
    </Routes>
);