require('dotenv').config();

const { app } = require('./app');


const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`server started at: ${port}`)
    console.log(`server started at: http://localhost:${port}`)
});

console.log('GITHUB_OAUTH_REDIRECT_URL', process.env.GITHUB_OAUTH_REDIRECT_URL)
console.log('GITHUB_OAUTH_SECRET_KEY', process.env.GITHUB_OAUTH_SECRET_KEY)
console.log('GITHUB_OAUTH_CLIENT_ID', process.env.GITHUB_OAUTH_CLIENT_ID)

// // docker ctrl+c does not kill this process in some cases.
// const kill = () => {
//     console.log('kill signal :)) ')
//     // process.exit(0);
// }
// process.on('SIGINT', kill);
// process.on('SIGTERM', kill);