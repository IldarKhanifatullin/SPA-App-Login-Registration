import axios, {type AxiosResponse} from "axios";
import './mockAPI.ts'
import type {AppDispatch} from "../store/store.ts";
import {setProfileLoading, setProfile, setProfileError} from "../store/reducers/profileReducer.ts";
import {errorHandler} from "../shared/utils/errorHandler.ts";

interface ProfileResponse {
    id: string;
    name: string;
}

export const fetchProfile: (token: string) => (dispatch: AppDispatch) => Promise<ProfileResponse | null> = (token: string) => {
    return async (dispatch: AppDispatch): Promise<ProfileResponse | null> => {
        dispatch(setProfileLoading(true));
        dispatch(setProfileError(null));
        try {
            const response: AxiosResponse<ProfileResponse> = await axios.get('/api/profile', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const data: ProfileResponse = response?.data
                dispatch(setProfile(data));
                // localStorage.setItem('currentProfile', response?.data.id);
                return data
            }
        } catch (error: unknown) {
            dispatch(setProfileError(errorHandler(error)))
        } finally {
            dispatch(setProfileLoading(false));
        }
        return null;
    }
}