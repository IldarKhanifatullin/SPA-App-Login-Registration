import axios, {type AxiosResponse} from "axios";
import './mockAPI.ts'
import type {AppDispatch} from "../store/store.ts";
import {setProfileLoading, setProfile, setProfileError} from "../store/reducers/profileReducer.ts";
import {errorHandler} from "../shared/utils/errorHandler.ts";

interface ProfileResponse {
    id: string;
    name: string;
}

export const fetchProfile: (token: string) => (dispatch: AppDispatch) => Promise<void> = (token: string) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(setProfileLoading(true));
        dispatch(setProfileError(null));
        try {
            const response: AxiosResponse<ProfileResponse> = await axios.get('/api/profile', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                dispatch(setProfile(response?.data))
                localStorage.setItem('token', token);
            }
        } catch (error: unknown) {
            dispatch(setProfileError(errorHandler(error)))
        } finally {
            dispatch(setProfileLoading(false));
        }
    }
}