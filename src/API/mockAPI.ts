import axios from 'axios'
import type {AxiosRequestConfig} from 'axios'
import MockAdapter from 'axios-mock-adapter'
import type {User} from '../store/reducers/usersReducer.ts'
import {storeRef} from "../shared/utils/storeRef.ts";
import {usersData} from "./usersData.ts";

const mock = new MockAdapter(axios, { delayResponse: 1000});

interface RequestData {
    name: string;
    username: string;
}

interface TokenPayload {
    id: string;
    name: string;
    exp: number;
}

// simple token generate:
const createFakeJWT: (user: User) => string = (user: User): string => {
   return btoa(JSON.stringify({
        id: user.id,
        name: user.name,
        exp: Date.now() + 1000 * 60 * 60, // + 1 час
    }))
}

// Мок авторизации
mock.onPost('/api/login').reply((config: AxiosRequestConfig) => {
    if ( typeof config.data !== 'string') {
        return [400, { message: 'Неверный формат данных'}]
    }

    try {
        const { name, username }: RequestData = JSON.parse(config.data);

        const users: User[] = storeRef?.getState().users?.users || usersData;

        const user: User | undefined = users.find((user: User): boolean => user.name === name && user.username === username);

        if (!user) {
            return [401, { message: 'Invalid name or username' }];
        }

        const token: string = createFakeJWT(user);

        return [200, { token: token }];
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка Axios:', error.response?.data?.error || error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
            console.error('Ошибка:', error.message);
        } else {
            console.error('Неизвестная ошибка:', String(error));
        }
        return [500, { message: 'Ошибка при обработке запроса'}];
    }
});

// Мок входа пользователя
mock.onGet('/api/profile').reply((config: AxiosRequestConfig) => {
    const auth = (config.headers?.authorization || config.headers?.Authorization) as string | undefined;

    if (!auth || !auth.startsWith('Bearer ')) {
        return [401, { message: 'Отсутствует токен'}];
    }

    try {
        // const payload: Payload = JSON.parse(atob(auth.replace('Bearer ', ''))); // Небезопасный синтаксис
        const token: string = auth.replace('Bearer ', '');
        const payloadString: string = atob(token);
        const payload: TokenPayload = JSON.parse(payloadString);

        if (payload.exp < Date.now()) {
            return [401, { message: 'Истек срок действия токена' }];
        }

        return [200, { id: payload.id, name: payload.name }];
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка Axios:', error.response?.data?.error || error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
            console.error('Ошибка:', error.message);
        } else {
            console.error('Неизвестная ошибка:', String(error));
        }
        return [401, { message: 'Недействительный токен' }];
    }
});

// Мок запроса пользователей
mock.onGet('/api/users').reply(() => {
    try {
        return [200, { users: usersData }]
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка Axios:', error.response?.data?.error || error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
            console.error('Ошибка:', error.message);
        } else {
            console.error('Неизвестная ошибка:', String(error));
        }
        return [401, {message: 'Ошибка при запросе пользователей'}];
    }
})