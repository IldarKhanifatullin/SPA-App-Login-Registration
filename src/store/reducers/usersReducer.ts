import {createSlice, type PayloadAction, type Reducer} from '@reduxjs/toolkit'

export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    // hash: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    usersError: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    usersError: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUsers: (state: UsersState, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addUser: (state: UsersState, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        removeUser: (state: UsersState, action: PayloadAction<User>) => {
            state.users = state.users.filter(user => user.id !== action.payload.id)
        },
        setLoading: (state: UsersState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUsersError: (state: UsersState, action: PayloadAction<string | null>) => {
            state.usersError = action.payload;
        }
    }
})

export const usersReducer: Reducer<UsersState> = usersSlice.reducer;
export const {addUsers, addUser, removeUser, setLoading, setUsersError} = usersSlice.actions;
