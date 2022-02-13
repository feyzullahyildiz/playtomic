import React from 'react'

import './style.scss';
interface Props {
    text: string
}
export const LoadingPage: React.FC<Props> = ({ text }) => {
    return (
        <div className='LoadingPage'>
            <div>{text}</div>
        </div>
    )
}
