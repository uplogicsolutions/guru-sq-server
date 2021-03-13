require('dotenv').config({path:__dirname + '/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const db = require("./app/models");
const routes = require('./app/routes');
const { initDatabase } = require('./app/services/init-database.service');
const { JWTMiddleware } = require('./app/middlewares/JWTMiddleware');

const app = express();

(async () => {
	app.use(cors());
	app.use(bodyParser.json({ limit: '100mb' }));
	app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
	app.use(JWTMiddleware);
	app.use('/', routes);
	try {
		db.sequelize.sync().then(async() => {
			console.log("Drop and re-sync db.");
			await initDatabase();
		});
		console.log('Successfully Connected to MySQL database.');
		await http.createServer(app).listen(8004, "0.0.0.0");
		console.log('Express server listening on port 8004');
	} catch (error) {
		console.log(error);
	}
})();
