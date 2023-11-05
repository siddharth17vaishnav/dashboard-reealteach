import React, { ReactNode } from 'react'
import Drawer from './Drawer'
import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'

interface Props {
    children: ReactNode
}

const AuthLayout = ({ children }: Props) => <>{children}</>

const Layout = ({ children }: Props) => {
    const pathName = usePathname()
    if (pathName.includes('auth')) return <AuthLayout>{children}</AuthLayout>
    return (
        <div>
            <Drawer >
                {children}
            </Drawer>
        </div>
    )
}

export default Layout
