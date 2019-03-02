const http = require('http'),
    args = process.argv.slice(2),
    config = {
        interval: args[0] || 1000,
        duration: args[1] || 5000,
        port: 3000
    };

const server = http.createServer((req, res) => {
    console.log(`Метод: ${req.method}`);
    console.log(`URL: ${req.url}`);
    if (req.url === '/') {
        displayMessages().then((response) => {
            res.end(response);
        })
    }
});

server.listen(config.port, () => {
    console.log(`Server running on port: ${config.port}`);
});

const displayMessages = () => {
    return new Promise((resolve) => {
        let timerId = setInterval(() => {
            console.log(new Date().toISOString())
        }, config.interval);

        setTimeout(() => {
            clearInterval(timerId);
            resolve(new Date().toISOString())
        }, config.duration);
    })
};