import React from 'react'
import './style.scss';

interface Props {
    title: string
}
export const DashboardContent: React.FC<Props> = ({ title, children }) => {
    return (
        <div className='DashboardContent'>
            <div className="title">{title}</div>
            <div className="body">{children}</div>
        </div>
    )
}
