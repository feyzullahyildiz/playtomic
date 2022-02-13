import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoadingPage } from '../../components/loading-page'
import { RequestService } from '../../util/request';

export const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        RequestService.logout();
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <LoadingPage text='Loging out...' />
    )
}
