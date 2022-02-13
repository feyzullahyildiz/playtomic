import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LoadingPage } from '../../components/loading-page';
import { setUser } from '../../redux/action/user';
import { useAppSelector } from '../../redux/hooks';
import { RequestService } from '../../util/request';

export const ProtectedPage: React.FC<any> = ({ children }) => {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useDispatch()
    const token = RequestService.getToken();
    useEffect(() => {
        if(token) {
            dispatch(setUser())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!token) {
        return <Navigate to="/login" />
    }
    if (!user) {
        return <LoadingPage text='Getting user data from github...'/>
    }
    return children;
}
