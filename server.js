const express = require('express');
const YoutubeMusicApi = require('youtube-music-api');
const key = require('./key');
const { reponseData, errorData } = require('./responeData');

const app = express();
const PORT = process.env.PORT || 3000;

let available = false;
const Youtube = new YoutubeMusicApi();
Youtube.initalize().then(() => {
	available = true;
});

app.get('/', (req, res) => {
	res.status(200).send(reponseData);
});

app.get('/msc', (req, res) => {
	if (req.query.key !== key) {
		res.status(400).send(errorData.accessNotAllowed);
	} else if (!req.query.query) {
		res.status(404).send(errorData.invalidQuery);
	} else {
		if (available) {
			Youtube.search(req.query.query, 'video')
				.then(result => {
					res.status(200).send(result);
				})
				.catch(error => {
					res.status(203).send(error);
				});
		} else {
			Youtube.initalize().then(() => {
				available = true;

				Youtube.search(req.query.query, 'video')
					.then(result => {
						res.status(200).send(result);
					})
					.catch(error => {
						res.status(203).send(error);
					});
			});
		}
	}
});

app.get('/plt', (req, res) => {
	if (req.query.key !== key) {
		res.status(400).send(errorData.accessNotAllowed);
	} else if (!req.query.query) {
		res.status(404).send(errorData.invalidQuery);
	} else {
		if (available) {
			Youtube.search(req.query.query, 'playlist')
				.then(result => {
					res.status(200).send(result);
				})
				.catch(error => {
					res.status(403).send(error);
				});
		} else {
			Youtube.initalize().then(() => {
				available = true;

				Youtube.search(req.query.query, 'playlist')
					.then(result => {
						res.status(200).send(result);
					})
					.catch(error => {
						res.status(403).send(error);
					});
			});
		}
	}
});

app.listen(PORT, () => console.log('server has been started...'));
