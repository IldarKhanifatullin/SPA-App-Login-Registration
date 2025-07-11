
export interface AuthState {
    isAuth: boolean;
    authIsChecked: boolean;
    // loading?: boolean;
}

// Устарело

// export enum AuthActionTypes {
//     LOGIN = 'LOGIN',
//     LOGOUT = 'LOGOUT',
//     LOGIN_CONFIRM = 'LOGIN_CONFIRM'
// }

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGIN_CONFIRM = 'LOGIN_CONFIRM'

// Избыточно

// export type AuthActionType = 'LOGIN' | 'LOGOUT' | 'LOGIN_CONFIRM';

export interface LoginAuthAction {
    type: typeof LOGIN;
    payload?: boolean;
}

export interface LogoutAuthAction {
    type: typeof LOGOUT;
    payload?: boolean;
}

export interface CheckAuthAction {
    type: typeof LOGIN_CONFIRM;
    payload?: boolean;
}

export type AuthAction = LoginAuthAction | LogoutAuthAction | CheckAuthAction;
