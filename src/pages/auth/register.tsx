
import AuthRegister from '@/forms/auth/register';
import AuthWrapper from '@/sections/auth/AuthWrapper';
import { Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const Register = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Sign up</Typography>
                    <Link href="/auth/login">
                        Already have an account?
                    </Link>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <AuthRegister />
            </Grid>
        </Grid>
    </AuthWrapper >
);

export default Register;
