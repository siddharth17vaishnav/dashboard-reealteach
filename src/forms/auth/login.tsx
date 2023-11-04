import React from 'react';


import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    IconButton
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { RemoveRedEyeOutlined } from '@mui/icons-material';


const AuthLogin = () => {
    const [checked, setChecked] = React.useState(false);
    const [capsWarning, setCapsWarning] = React.useState(false);


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const onKeyDown = (keyEvent: any) => {
        if (keyEvent.getModifierState('CapsLock')) {
            setCapsWarning(true);
        } else {
            setCapsWarning(false);
        }
    };

    return (
        <Formik
            initialValues={{
                email: 'info@codedthemes.com',
                password: '123456',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {

            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
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
                                    color={capsWarning ? 'warning' : 'primary'}
                                    error={Boolean(touched.password && errors.password)}
                                    id="-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={(event: React.FocusEvent<any, Element>) => {
                                        setCapsWarning(false);
                                        handleBlur(event);
                                    }}
                                    onKeyDown={onKeyDown}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                color="secondary"
                                            >
                                                {showPassword ? <RemoveRedEyeOutlined /> : <RemoveRedEyeOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="Enter password"
                                />
                                {capsWarning && (
                                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                                        Caps lock on!
                                    </Typography>
                                )}
                                {touched.password && errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: -1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label={<Typography variant="h6">Keep me sign in</Typography>}
                                />
                                Forgot Password?
                            </Stack>
                        </Grid>
                        {errors.submit && (
                            <Grid item xs={12}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default AuthLogin;
