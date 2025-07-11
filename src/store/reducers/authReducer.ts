// import { LOGIN, LOGOUT, LOGIN_CONFIRM } from "../types/AuthTypes.ts";
// import type { AuthAction, LoginAuthAction, LogoutAuthAction, CheckAuthAction } from '../types/AuthTypes.ts'
import type { AuthState } from "../types/AuthTypes.ts";
import { createSlice, type PayloadAction, type Reducer } from "@reduxjs/toolkit";

const initialState: AuthState = {
    isAuth: false,
    authIsChecked: false,
}

// Устарело

// export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
//     switch (action.type) {
//         case LOGIN:
//             return { ...state, isAuth: true }
//         case LOGOUT:
//             return { ...state, isAuth: false }
//         case LOGIN_CONFIRM:
//             return { ...state, loading: false }
//         default:
//             return state
//     }
// }
//
// export const loginActionCreator = (): LoginAuthAction => ({ type: LOGIN })
// export const logoutActionCreator = (): LogoutAuthAction => ({ type: LOGOUT })
// export const checkActionCreator = (): CheckAuthAction => ({ type: LOGIN_CONFIRM })

const authSlice  = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state: AuthState, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setChecking: (state: AuthState, action: PayloadAction<boolean>) => {
            state.authIsChecked = action.payload;
        }
    }
})

export const { setAuth, setChecking } = authSlice.actions;
export const authReducer: Reducer<AuthState> = authSlice.reducer;
