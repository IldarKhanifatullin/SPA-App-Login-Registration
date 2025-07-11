import {v4 as uuidv4} from 'uuid';
import React, {useState} from 'react';
import {type FormProps} from 'antd';
import { Button, Form, Input, Space, Card, Progress } from 'antd';
import type {RuleObject} from 'antd/lib/form';
import {useNavigate, type NavigateFunction} from "react-router-dom";
import {PATHS} from "../router/routes.tsx";
import {useTypedDispatch} from "../shared/hooks/useTypedDispatch.ts";
import {useTypedSelector} from "../shared/hooks/useTypedSelector.ts";
import type {RootState} from "../store/store.ts";
import {addUser, type User} from "../store/reducers/usersReducer.ts";

type FieldType = {
    email?: string;
    name?: string;
    username?: string;
    confirmUsername?: string;
};

type GetFieldType = {
    name: string;
    username: string;
    confirmUsername: string;
    email: string;
};

const containerStyle: React.CSSProperties = {
    height: '100vh', // высота на весь экран
    display: 'flex', // включаем flex-контейнер
    justifyContent: 'center', // по горизонтали
    alignItems: 'center', // по вертикали
}

const cardStyle: React.CSSProperties = {
    width: 800,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const getStrength: (username: string) => {percent: number, status: 'exception' | 'normal' | 'success', text: string, color: string} = (username) => {
    let score: number = 0;
    if (username.length >= 8) score++;
    if (/[a-z]/.test(username)) score++;
    if (/[A-Z]/.test(username)) score++;
    if (/\d/.test(username)) score++;
    if (/[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]/.test(username)) score++;
    if (score <= 2) return { percent: 33, status: 'exception', text: 'Слабый', color: '#FF0000' };
    if (score >= 3 && score <= 4) return { percent: 66, status: 'normal', text: 'Средний', color: '#FFFF00' };
    return { percent: 100, status: 'success', text: 'Сильный', color: '#00FF00' };
}

const App: React.FC = () => {

    const [username, setUsername] = useState('');

    const navigate: NavigateFunction = useNavigate();

    const dispatch = useTypedDispatch();

    const users: User[] = useTypedSelector((state: RootState): User[] => state.users.users)

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if (!values.email || !values.name || !values.username || !values.confirmUsername) {
            console.warn("Неверные данные формы");
            return;
        }
        const newUser: User = {
            id: uuidv4(),
            email: values.email,
            name: values.name,
            username: values.username,
        }
        dispatch(addUser(newUser));
        navigate(PATHS.ROOT);
    };

    const strength = getStrength(username);

    console.log(users);

    return (
        <div style={containerStyle}>
            <Card title='Регистрация' style={cardStyle}>
                <Form
                    name="registration"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800, width: '100%' }}
                    initialValues={{  }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Введите email"
                        name="email"
                        rules={[
                            { required: true, message: 'Введите email!' },
                            { type: 'email', message: 'Введите корректный email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Введите свое имя"
                        name="name"
                        rules={[{ required: true, message: 'Введите свое имя!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Введите имя пользователя"
                        name="username"
                        hasFeedback={true}
                        rules={[
                            { required: true, message: 'Введите имя пользователя!' },
                            // { min: 8, message: 'Имя пользователя должно содержать не менее 8 символов' },
                            {
                                pattern: /^[^\u0400-\u04FF]+$/,
                                message: 'Имя пользователя не должно содержать кириллицу!'
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/,
                                message: 'Имя пользователя должно содержать минимум 8 символов, заглавную и строчную буквы, цифру и спецсимвол',
                            },
                            {
                                validator: (_: RuleObject, value: string): Promise<void> => {
                                    if (!value) return Promise.resolve();
                                    const userNames: string[] = users.map((user: User): string => user.username)
                                    if (userNames.includes(value)) return Promise.reject(new Error('Имя пользователя уже занято!'));
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        {/*<Input.Password />*/}
                        <Input
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                        />
                    </Form.Item>

                    {username && (
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <span>{strength.text}</span>
                            <Progress
                                percent={strength.percent}
                                status={strength.status}
                                strokeColor={strength.color}
                                showInfo={false}
                                type="line"
                            />
                        </Form.Item>
                    )}

                    <Form.Item<FieldType>
                        label="Подтвердите имя пользователя"
                        name="confirmUsername"
                        dependencies={['username']}
                        hasFeedback={true}
                        rules={[
                            { required: true, message: 'Подтвердите имя пользователя!' },
                            // ({ getFieldValue }: { getFieldValue: (name: string) => string })
                            ({ getFieldValue }: { getFieldValue: (name: keyof GetFieldType ) => GetFieldType[keyof GetFieldType] }) => ({
                                validator(_: RuleObject, value: string): Promise<void> {
                                    if (getFieldValue('username') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('Имена пользователей не совпадают!'))
                                }
                            })
                        ]}
                    >
                        {/*<Input.Password />*/}
                        <Input />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Зарегистрироваться
                            </Button>
                            <Button onClick={() => navigate(PATHS.LOGIN)}>
                                У меня уже есть профиль
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default App;
