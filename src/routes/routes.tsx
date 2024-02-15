import { MainPage } from '@pages/main-page';
import { Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path="/" element={<MainPage />}></Route>
    </Routes>
);