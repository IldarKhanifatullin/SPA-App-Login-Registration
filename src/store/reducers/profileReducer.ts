import {createSlice, type PayloadAction, type Reducer} from "@reduxjs/toolkit";


interface ProfileState {
    profile: {
        id: string;
        name: string;
    } | null;
    token: string | null;
    loading: boolean;
    loginError: string | null;
    profileError: string | null;
}

const initialState: ProfileState = {
    profile: null,
    token: null,
    loading: false,
    loginError: null,
    profileError: null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setProfileLoading: (state: ProfileState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setProfileError: (state: ProfileState, action: PayloadAction<string | null>) => {
            state.profileError = action.payload;
        },
        setLoginError: (state: ProfileState, action: PayloadAction<string | null>) => {
            state.loginError = action.payload;
        },
        setToken: (state: ProfileState, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setProfile: (state: ProfileState, action: PayloadAction<{id: string; name: string} | null>) => {
            state.profile = action.payload;
        }

    }
})

export const profileReducer: Reducer<ProfileState> = profileSlice.reducer;
export const {setProfileLoading, setProfileError, setLoginError, setToken, setProfile} = profileSlice.actions;
