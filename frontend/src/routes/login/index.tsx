import React from 'react'
import './style.scss';
export const Login: React.FC = () => {

    const clientId = '5ae4481e7c115a936008';
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`
    return (
        <div className='Login'>
            <div style={{ minWidth: 420 }} className="card flex-column ">
                <h3>Sign In</h3>
                <div className="hr"></div>
                <br />
                <span className='label'>Email</span>
                <input type="email" />
                <span className='label'>Password</span>
                <input type="password" />
                <div className='button-container'>
                    <button type='submit' className='btn-orange'>Sign In</button>

                    <a className='btn-github' href={githubUrl}>
                        <img src={process.env.PUBLIC_URL + 'assets/github-icon.svg'} alt="Sign In with Icon" />
                        <span>Sign in with Github</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
