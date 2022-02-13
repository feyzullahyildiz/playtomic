import React from 'react'
import { Link, LinkProps, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import './style.scss';

const CustomLink: React.FC<LinkProps & { alias: string }> = ({ to, alias }) => {

  let resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });


  return <Link to={`/${to}`} className={`item ${match ? 'active' : ''}`}>
    <img src={process.env.PUBLIC_URL + `assets/${to}.svg`} alt={`${to}`} />
    <span>{alias}</span>
  </Link>
}

export const Dashboard: React.FC = () => {
  const user = useAppSelector(state => state.user.user)!;
  return (
    <div className='Dashboard'>
      <div className="sidebar">
        <h4>dashboard</h4>
        <br />
        <CustomLink alias='Dashboard' to='dashboard' />
        <CustomLink alias='Settings' to='settings' />
        <div style={{ flex: 1 }} />
        <CustomLink alias='Logout' to='logout' />
      </div>
      <div className="header">
        <div className="user-info">
          <span className='display-name'>{user.name}</span>
          <span className='username'>{user.login}</span>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}
