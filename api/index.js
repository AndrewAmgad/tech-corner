const http = require('http');
const app = require ('./v1/setup/app');

const port = process.env.PORT || 4000;
console.log(process.env.PORT)

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server is running on port 4000")
})