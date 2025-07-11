import axios, {type AxiosResponse} from 'axios';
import {setLoading, setUsersError, addUsers, type User} from "../store/reducers/usersReducer.ts";
import type {AppDispatch} from "../store/store.ts";
import {errorHandler} from "../shared/utils/errorHandler.ts";

// interface RawUser {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: {
//         street: string;
//         suite: string;
//         city: string;
//         zipcode: string;
//         geo: {
//             lat: string;
//             lng: string;
//         };
//     };
//     phone: string;
//     website: string;
//     company: {
//         name: string;
//         catchPhrase: string;
//         bs: string;
//     };
// }
//
// export const fetchUsers = () => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(setLoading(true));
//         try{
//             const response = await axios.get<RawUser[]>('https://jsonplaceholder.typicode.com/users');
//             const filteredUsers: User[] = response.data.map((user: RawUser) => ({
//                 id: String(user.id),
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//             }))
//             dispatch(addUsers(filteredUsers));
//         } catch(error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 console.error('Ошибка Axios', {
//                     status: error.response?.status,
//                     data: error.response?.data,
//                     message: error.message,
//                 });
//             } else {
//                 console.error('Неизвестная ошибка', error)
//             }
//         } finally {
//             dispatch(setLoading(false));
//         }
//     }
// }

interface UsersResponse {
    users: User[];
}

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setUsersError(null));
    try {
        const response: AxiosResponse<UsersResponse> = await axios.get('/api/users');
        if (response.status === 200 ) {
            dispatch(addUsers(response?.data.users))
        }
    } catch (error: unknown) {
        dispatch(setUsersError(errorHandler(error)));
    } finally {
        dispatch(setLoading(false));
    }
}