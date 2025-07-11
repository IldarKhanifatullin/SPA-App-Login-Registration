import type {AppDispatch} from "../../store/store.ts";
import {setToken, setProfile} from "../../store/reducers/profileReducer.ts";
import {setAuth, setChecking} from "../../store/reducers/authReducer.ts";

export const logout: () => (dispatch: AppDispatch) => void = () => {
    return (dispatch: AppDispatch): void => {
        // localStorage.clear()
        localStorage.removeItem('token');
        localStorage.removeItem('currentProfile');
        dispatch(setToken(null));
        dispatch(setProfile(null));
        dispatch(setChecking(false));
        dispatch(setAuth(false));
        dispatch(setChecking(true));
    }
}

