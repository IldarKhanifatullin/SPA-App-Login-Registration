import React from 'react';
import {useNavigate, type NavigateFunction} from 'react-router-dom';
import {Button} from 'antd';
import {PATHS} from "../router/routes.tsx";
import {useTypedDispatch} from "../shared/hooks/useTypedDispatch.ts";
import {useTypedSelector} from "../shared/hooks/useTypedSelector.ts";
import type {RootState} from "../store/store.ts";
import type {AppDispatch} from "../store/store.ts";
import {logout} from "../shared/utils/logout.ts";
import Loading from "../shared/UI/Loading/Loading.tsx";

const Main: React.FC = () => {

    const navigate: NavigateFunction = useNavigate();

    const dispatch: AppDispatch = useTypedDispatch();

    const authIsChecked: boolean = useTypedSelector((state: RootState) => state.auth.authIsChecked)

    const setLogout = () => {
        dispatch(logout());
        navigate(PATHS.ROOT);
    }

    if (!authIsChecked) {
        return (
            <Loading/>
        )
    }

    return (
        <div>
            <h1>
                Вы на главной странице
            </h1>
            <Button onClick={() => {setLogout()}}>
                Выйти
            </Button>
        </div>
    );
};

export default Main;