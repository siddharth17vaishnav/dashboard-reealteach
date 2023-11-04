import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from '@/sections/auth/AuthWrapper';
import AuthLogin from '@/forms/auth/login';
import Link from 'next/link';
const Login = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Login</Typography>
                    <Link href="/auth/register">
                        Don&apos;t have an account?
                    </Link>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <AuthLogin />
            </Grid>
        </Grid>
    </AuthWrapper>
);


export default Login;
