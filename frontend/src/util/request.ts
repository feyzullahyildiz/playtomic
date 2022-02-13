import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const setToken = (token: string) => {
    localStorage.setItem('GITHUB_TOKEN', token);
}
const logout = () => {
    localStorage.clear();
}
const getToken = () => {
    return localStorage.getItem('GITHUB_TOKEN');
}
const me = async () => {
    const meUrl = `${API_URL}/api/me`;
    const token = getToken();
    const res = await axios.get<GithubUser>(meUrl, { headers: { Authorization: `token ${token}` } })
    return res.data;
}

export const RequestService = {
    setToken,
    getToken,
    me,
    logout,
}
