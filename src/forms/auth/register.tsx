import React from 'react';


import {
    Box,
    Button,
    FormHelperText,
    FormControl,
    Grid,
    Link,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    IconButton
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { StringColorProps, strengthColor, strengthIndicator } from '@/utils/password-strength';
import { RemoveRedEyeOutlined, RemoveRedEyeRounded } from '@mui/icons-material';
import { supabase } from '@/utils/supabase';
import Router from 'next/router';
import { addCookie } from '@/utils/cookies';

const AuthRegister = () => {

    const [level, setLevel] = React.useState<StringColorProps>();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    React.useEffect(() => {
        changePassword('');
    }, []);

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Name is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values) => {
                await supabase.auth.signUp({ email: values.email, password: values.password }).then(async ({ data, error }) => {
                    if (data) {
                        await supabase.from('sellers').insert({ name: values.name, email: values.email }).select('*').then(() => {
                            addCookie('auth_token', data.session?.access_token as string)
                            Router.push('/')
                        })
                    }
                    else if (error) throw error.message
                })
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="name-login">Name</InputLabel>
                                <OutlinedInput
                                    id="name-login"
                                    type="text"
                                    value={values.name}
                                    name="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    fullWidth
                                    error={Boolean(touched.name && errors.name)}
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error id="standard-weight-helper-text-name-login">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                <OutlinedInput
                                    id="email-login"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="password-login">Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    id="-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                color="secondary"
                                            >
                                                {showPassword ? <RemoveRedEyeOutlined /> : <RemoveRedEyeRounded />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="Enter password"
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Stack>
                            {values.password.length > 0 &&
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            }
                        </Grid>

                        <Grid item xs={12} sx={{ mt: -1 }}>
                            <Typography variant="body2">
                                By Signing up, you agree to our &nbsp;
                                <Link variant="subtitle2">Terms of Service</Link>
                                &nbsp; and &nbsp;
                                <Link variant="subtitle2">Privacy Policy</Link>
                            </Typography>
                        </Grid>
                        {errors.submit && (
                            <Grid item xs={12}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                Create Account
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik >



    );
};

export default AuthRegister;
