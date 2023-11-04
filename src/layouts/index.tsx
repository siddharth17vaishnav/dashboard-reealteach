import React, { ReactNode } from 'react'
import Drawer from './Drawer'

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Drawer />
            {children}
        </div>
    )
}

export default Layout
