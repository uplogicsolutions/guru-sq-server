require('dotenv').config({path:__dirname + '/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const db = require("./app/models");
const routes = require('./app/routes');
const SocketMiddleware = require('./app/middlewares/SocketMiddleware');
const { initDatabase } = require('./app/services/init-database.service');

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

(async () => {
	app.use(cors());
	app.use(bodyParser.json({ limit: '100mb' }));
	app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

	app.use(SocketMiddleware(io));

	app.use('/', routes);
	try {
		db.sequelize.sync().then(async() => {
			console.log("Drop and re-sync db.");
			await initDatabase();
		});
		console.log('Successfully Connected to MySQL database.');
		await server.listen(8004);
		console.log('Express server listening on port 8004');
	} catch (error) {
		console.log(error);
	}
})();
