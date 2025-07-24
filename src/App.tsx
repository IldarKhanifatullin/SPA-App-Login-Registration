import React from 'react';
import {useEffect} from 'react';
import {useNavigate, type NavigateFunction} from 'react-router-dom';
import type {AppDispatch} from './store/store.ts'
import type { RootState } from './store/store.ts';
// import type {AuthState} from "./store/types/AuthTypes.ts";
import { setAuth, setChecking } from './store/reducers/authReducer.ts';
import {fetchUsers} from "./API/fetchUsers.ts";
import {type User} from './store/reducers/usersReducer.ts';
import {useTypedSelector} from "./shared/hooks/useTypedSelector.ts";
import Loading from "./shared/UI/Loading/Loading.tsx";
import {useTypedDispatch} from "./shared/hooks/useTypedDispatch.ts";
import AppRouter from './router/AppRouter.tsx';
import {PATHS} from "./router/routes.tsx";

const App: React.FC = () => {

    const navigate: NavigateFunction = useNavigate();

    const dispatch: AppDispatch = useTypedDispatch();

    const {users, loading}: { users: User[], loading: boolean } = useTypedSelector(state => state.users)

    const profile = useTypedSelector((state: RootState) => state.profile.profile)

    // const { isAuth, authIsChecked }: AuthState = useTypedSelector((state: RootState) => state.auth)

    useEffect((): void => {

        const init: () => Promise<void> = async () => {

            if ( users.length === 0 ) {
                await dispatch(fetchUsers());
            }

            if (localStorage.getItem('currentProfile')) {
                dispatch(setAuth(true));
            }

            dispatch(setChecking(true));

            if (window.location.pathname !== PATHS.ROOT) {
                navigate(PATHS.ROOT);
            }
        }

        void init();

    }, [])

    useEffect(() => {
        console.log(users);
        console.log(profile);
        console.log(localStorage.getItem('currentProfile'));
    }, [users, profile]);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <AppRouter/>
    );
};

export default App;