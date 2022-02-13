import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingPage } from '../../components/loading-page';
import { RequestService } from '../../util/request';
export const GithubAuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = searchParams.get('githubtoken');
    if (!token) {
      return () => { }
    }
    RequestService.setToken(token)
    setTimeout(() => {
      // make sure to replace true. User can not get back login page with back button without logout
      navigate('/dashboard', { replace: true })
    }, 1000)
  }, [searchParams, navigate]);
  return (
    <LoadingPage text='Login Succeed with Github' />
  )
}
