require('dotenv').config();

const { app } = require('./app');


const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`server started at: ${port}`)
    console.log(`server started at: http://localhost:${port}`)
})