import React, { ReactNode } from 'react'
import Drawer from './Drawer'
import { Box } from '@mui/material'

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Drawer >
                {children}
            </Drawer>
        </div>
    )
}

export default Layout
