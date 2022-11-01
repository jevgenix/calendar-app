// const express = require('express')
// const app = express()

// // Heroku dynamically sets a port
// const PORT = process.env.PORT || 5000

// app.use(express.static('.next'))

// // healthcheck
// app.get('/health', (req, res) => {
//     res.send('ok')
// })

// // listen
// app.listen(PORT, () => {
//     console.log(`server started on port ${PORT}`)
// })

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();
        server.all("*", (req, res) => {
            return handle(req, res);
        });
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();







