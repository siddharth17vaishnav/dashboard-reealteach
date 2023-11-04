// material-ui
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

const AuthCard = ({ children, }: Props) => (

    <Box sx={{
        p: { xs: 2, sm: 3, md: 4, xl: 5 }, maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%'
        },
        backgroundColor: "white",
        borderRadius: 4
    }}>{children}</Box>

);

export default AuthCard;
