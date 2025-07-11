// import {createStore, applyMiddleware, combineReducers} from 'redux';
// import {thunk} from 'redux-thunk';
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from './reducers/authReducer.ts';
import {usersReducer} from './reducers/usersReducer.ts';
import {profileReducer} from './reducers/profileReducer.ts';

// Устарело

// const rootReducer = combineReducers({
//     auth: authReducer,
// })
//
// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        profile: profileReducer,
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

