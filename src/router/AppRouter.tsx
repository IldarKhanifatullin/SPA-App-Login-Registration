import React from 'react';
import {Routes, Route} from 'react-router-dom';
import type {RootState} from "../store/store.ts";
import {useTypedSelector} from "../shared/hooks/useTypedSelector.ts";
import {privateRoutes, publicRoutes} from "./routes.tsx";
import type {AuthState} from "../store/types/AuthTypes.ts";
import Loading from '../shared/UI/Loading/Loading.tsx'

const AppRouter: React.FC = () => {

    // const isAuth: boolean = useTypedSelector((state: RootState): boolean => state.auth.isAuth);

    const { isAuth, authIsChecked }: AuthState = useTypedSelector((state: RootState): AuthState => state.auth)

    if (!authIsChecked) {
        return (
            <Loading/>
        )
    }

    return (
        <Routes>
            {( isAuth ? privateRoutes : publicRoutes ).map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
                ))}
        </Routes>
    );
};

export default AppRouter;