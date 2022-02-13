const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const { noteRouter } = require('./note');
const axios = require('axios').default;

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.json({});
        return;
    }
    next();
})

app.get('/', (req, res, next) => {
    res.send('WELCOME TO API')
})


app.get('/connect/github/callback', async (req, res, next) => {
    try {
        const { code } = req.query;
        const secretKey = process.env.GITHUB_OAUTH_SECRET_KEY;
        const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
        const { data: githubData } = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: clientId,
            client_secret: secretKey,
            code: code,
        }, {
            headers: { accept: 'application/json' }
        })
        const redirectUrl = process.env.GITHUB_OAUTH_REDIRECT_URL;
        res.redirect(`${redirectUrl}?githubtoken=${githubData.access_token}`);
        // res.json(githubResponse.data);
    } catch (error) {
        next(error);
    }
});
// GITHUB TOKEN CHECKER
const authChecker = async (req, res, next) => {
    try {
        if (typeof req.headers.authorization !== 'string') {
            throw new Error('Not Authenticated, Authorization header is needed');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token.length < 2) {
            throw new Error('Token not found');
        }

        const { data, status } = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${token}` }
        });
        if (typeof data.id !== 'number') {
            throw new Error('Not Authenticated, because of github')
        }
        res.locals.user = data;
        res.locals.token = token;
        next();

    } catch (error) {
        next(error);
    }
};
app.get('/api/me', authChecker, async (req, res, next) => {
    try {
        res.json(res.locals.user)
    } catch (error) {
        next(error);
    }
})
app.use('/api/note', authChecker, noteRouter);

app.get('*', async (req, res, next) => {
    try {
        const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html');
        const fileExists = await fs.pathExists(indexHtmlPath);
        if (fileExists) {
            res.sendFile(indexHtmlPath)
            return;
        }
        throw new Error(`index.html not found at: ${indexHtmlPath}`)
    } catch (error) {
        next(error);
    }
})
app.use((err, req, res, next) => {
    const { message, stack } = err;
    res.status(500).json({
        message, stack
    })
})

module.exports = {
    app
}