import React from 'react';
// import {useEffect, useState} from 'react';
import {Card, Form, Input, Button, Checkbox, Space} from 'antd';
import type {FormProps} from 'antd';
import {useTypedDispatch} from "../shared/hooks/useTypedDispatch.ts";
import {useTypedSelector} from "../shared/hooks/useTypedSelector.ts";
import type {RootState} from "../store/store.ts";
import type {AppDispatch} from "../store/store.ts";
import {userLogin} from "../API/userLogin.ts";
import {fetchProfile} from "../API/fetchProfile.ts";
// import {storeRef} from "../shared/utils/storeRef.ts";
import {useNavigate, type NavigateFunction} from "react-router-dom";
import {PATHS} from "../router/routes.tsx";
import {setAuth, setChecking} from "../store/reducers/authReducer.ts";
import Loading from "../shared/UI/Loading/Loading.tsx";

// interface SelectedStates {
//     loading: boolean;
// }

type FieldType = {
    name?: string;
    username?: string;
    remember?: boolean;
}

// type SubmitType = {
//     name: string;
//     username: string;
//     remember: boolean;
// }

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

const Login: React.FC = () => {

    const navigate: NavigateFunction = useNavigate();

    // const [saveRemember, setSaveRemember] = useState<{ name: string } | null>(null);

    const dispatch: AppDispatch = useTypedDispatch();

    // const currentProfile: { id: string; name: string; } | null = useTypedSelector((state: RootState): { id: string; name: string; } | null => state.profile.profile);

    const loading: boolean = useTypedSelector((state: RootState): boolean => state.profile.loading);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType): Promise<void> => {
        if (!values.name || !values.username || values.remember === undefined) {
            console.warn("Неверные данные формы");
            return;
        }

        const { name, username, remember } = values;

        const token: string | null = await dispatch(userLogin(name, username));

        // const token: string | null = storeRef?.getState().profile.token ?? null;

        if (token !== null) {
            const currentProfile = await dispatch(fetchProfile(token));

            if (currentProfile !== null && remember) {
                localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
            }

            if (currentProfile) {
                dispatch(setChecking(false));
                dispatch(setAuth(true))
                dispatch(setChecking(true));
                navigate(PATHS.ROOT);
            }
        }
    };

    // useEffect(() => {
    //
    //     if (currentProfile) {
    //         dispatch(setChecking(false));
    //         dispatch(setAuth(true))
    //         dispatch(setChecking(true));
    //         navigate(PATHS.ROOT);
    //     }
    //
    //     // console.log('isAuth');
    //
    // }, [currentProfile]);
    //
    // useEffect(() => {
    //
    //     if (saveRemember && currentProfile !== null && currentProfile?.id && currentProfile?.name === saveRemember.name) {
    //         localStorage.setItem('currentProfile', currentProfile.id);
    //         setSaveRemember(null);
    //         console.log('saveRemember');
    //     }
    //
    //     // console.log('saveRemember');
    //
    // }, [currentProfile, saveRemember]);

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <div style={containerStyle}>
            <Card title='Авторизация' style={cardStyle}>
                <Form
                    name="login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, width: '100%' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Имя"
                        name="name"
                        rules={[{ required: true, message: 'Введите имя!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Имя пользователя"
                        name="username"
                        rules={[{ required: true, message: 'Введите имя пользователя!' }]}
                    >
                        {/*<Input.Password />*/}
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Войти
                            </Button>
                            <Button onClick={() => navigate(PATHS.REGISTRATION) }>
                                Зарегистрироваться
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;