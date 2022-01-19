import React, { ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    children?: ReactNode
}

function Header({ children }: Props): ReactElement {
    return (
        <div className="absolute top-0 w-full">
            <div className="max-w-2xl mx-auto flex justify-between border-b-2 border-gray-100 px-4 py-3">
                <Link to={'/'}>
                    <img src="/logo.png" alt="Bombočuch zasahuje logo" />
                </Link>
                <div className="flex items-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Header
