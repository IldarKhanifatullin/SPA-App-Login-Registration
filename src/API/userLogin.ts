import axios, {type AxiosResponse} from 'axios'
import './mockAPI.ts'
import {errorHandler} from "../shared/utils/errorHandler.ts";
import type {AppDispatch} from "../store/store.ts";
import {setProfileLoading, setToken, setLoginError} from "../store/reducers/profileReducer.ts";

interface LoginResponse {
    token: string;
}

export const userLogin: (name: string, username: string) => (dispatch: AppDispatch) => Promise<string | null> = ( name: string, username: string ) => {
    return async (dispatch: AppDispatch): Promise<string | null> => {
        dispatch(setProfileLoading(true));
        dispatch(setLoginError(null));
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post('/api/login', { name, username });
            if (response.status === 200) {
                const token = response?.data.token;
                localStorage.setItem('token', token);
                dispatch(setToken(token));
                return token;
            }
        } catch (error: unknown) {
            dispatch(setLoginError(errorHandler(error)));
        } finally {
            dispatch(setProfileLoading(false));
        }
        return null;
    }
}
