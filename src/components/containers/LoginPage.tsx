import React, {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {loginFormStyle, loginPageSectionStyle, pageContainerStyle} from "../styles/LoginPage.styles";
import User from "../../models/user/User";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import userSignInScheme from "../../schemas/UserSignInScheme";
import Password from "../ui/Password";
import Email from "../ui/Email";
import {authErrors} from "../../models/auth/AuthErrors";
import { type FirebaseError } from 'firebase/app';
import CurrentUser from "../../models/user/CurrentUser";
import {useSelector} from "react-redux";
import {useAuth} from "../../services/providers/auth/AuthProvider";
import Loader from "../ui/Loader";

const LoginPage: React.FC = () => {
    const {
        handleSubmit,
        setError,
        control,
        formState: { errors }
    } = useForm<User>({
        resolver: yupResolver(userSignInScheme)
    });

    const { signIn, isLoading } = useAuth();
    const [doRedirect, setDoRedirect] = useState<boolean>(false);
    const isAuthenticated: boolean = useSelector(
        (user: CurrentUser) => user.isAuthenticated
    );

    useEffect(() => {
        if (isAuthenticated) {
            setDoRedirect(true);
        }
    }, [isAuthenticated]);

    const onSubmit = async (data: User): Promise<void> => {
        try {
            await signIn(data.email, data.password);
        } catch (_error: any) {
            const error: FirebaseError = _error;
            switch (error.code) {
                case authErrors.USER_NOT_FOUND:
                case authErrors.WRONG_PASSWORD:
                    setError('email', { message: '' });
                    setError('password', { message: 'Email or password is incorrect' });
                    break;
                default:
                    setError('password', { message: 'Bad request error' });
            }
        }
    };

    return(
        <Loader isLoading={isLoading}>
            <Box sx={pageContainerStyle}>
                <Box sx={loginPageSectionStyle}>
                    <Typography variant='h3' sx={{
                        color: 'white',
                        textAlign: 'center'
                    }}>Welcome at skill-assessor</Typography>
                </Box>
                <Box sx={loginPageSectionStyle}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={loginFormStyle}>
                        <Controller
                            render={({ field }) => <Email field={field} errors={errors} />}
                            name="email"
                            defaultValue=""
                            control={control}
                        />
                        <Controller
                            render={({ field }) => (
                                <Password label="Password" field={field} errors={errors} />
                            )}
                            name="password"
                            defaultValue=""
                            control={control}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                marginTop: '25px'
                            }}
                        >
                            Log in
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Loader>
    );
}

export default LoginPage;