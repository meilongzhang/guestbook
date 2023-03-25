const express = require('express');
const bp = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

let db = new sqlite3.Database('./db/clients.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.error('error' + err.message);
	}
	console.log('Connected to the clients database.');
});

app.post('/client', (req, res) => {
	const { name, phone } = req.body;
	const phoneRegex = new RegExp('^[1-9]{1}(\\d{9}|\\d{10})$');
	const nameRegex = new RegExp('[A-Za-z]+\\s[A-Za-z]+');
	const successMessage = { result: 'Success', status: 201 };
	const badMessage = { result: 'Bad Request', status: 400 };
	if (phoneRegex.test(phone) && nameRegex.test(name)) {
		db.run('INSERT INTO clients(name, phone) VALUES("' + name + '", "' + phone + '")');
		return res.status(201).send(successMessage);
	} else {
		return res.status(400).send(badMessage);
	}
});

app.listen(3080, () => console.log('Guest Book app listening on port 3080!'));
