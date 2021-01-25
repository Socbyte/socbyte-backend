const express = require('express');
const YoutubeMusicApi = require('youtube-music-api');
const key = require('./key');
const { reponseData, errorData } = require('./responeData');

const app = express();
const PORT = process.env.PORT || 3000;

let available = false;
const Youtube = new YoutubeMusicApi();
Youtube.initalize().then(() => {
	console.log(available, 'READY TO SERVE');
	available = true;
});

app.get('/', (req, res) => {
	res.status(200).send(reponseData);
});

app.get('/video', (req, res) => {
	if (req.query.key !== key) {
		res.status(400).send(errorData.accessNotAllowed);
	} else if (!req.query.query) {
		res.status(404).send(errorData.invalidQuery);
	} else {
		if (available) {
			Youtube.search(req.query.query, 'video')
				.then(result => {
					res.status(200).send(result.content);
				})
				.catch(error => {
					res.status(203).send(error);
				});
		} else {
			Youtube.initalize().then(() => {
				console.log(available, 'READY TO SERVE VIDEO');
				available = true;

				Youtube.search(req.query.query, 'video')
					.then(result => {
						res.status(200).send(result.content);
					})
					.catch(error => {
						res.status(203).send(error);
					});
			});
		}
	}
});

app.get('/msc', (req, res) => {
	if (req.query.key !== key) {
		res.status(400).send(errorData.accessNotAllowed);
	} else if (!req.query.query) {
		res.status(404).send(errorData.invalidQuery);
	} else {
		if (available) {
			Youtube.search(req.query.query, 'song')
				.then(result => {
					res.status(200).send(result);
				})
				.catch(error => {
					res.status(203).send(error);
				});
		} else {
			Youtube.initalize().then(() => {
				console.log(available, 'READY TO SERVE SONGS');
				available = true;

				Youtube.search(req.query.query, 'song')
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
					res.status(200).send(result.content);
				})
				.catch(error => {
					res.status(403).send(error);
				});
		} else {
			Youtube.initalize().then(() => {
				console.log(available, 'READY TO SERVE PLAYLIST');
				available = true;

				Youtube.search(req.query.query, 'playlist')
					.then(result => {
						res.status(200).send(result.content);
					})
					.catch(error => {
						res.status(403).send(error);
					});
			});
		}
	}
});

app.get('/searchq', (req, res) => {
	if (req.query.key !== key) {
		res.status(400).send(errorData.accessNotAllowed);
	} else if (!req.query.query) {
		res.status(404).send(errorData.invalidQuery);
	} else {
		if (available) {
			Youtube.getSearchSuggestions(req.query.query)
				.then(result => {
					res.status(200).send(result);
				})
				.catch(error => {
					res.status(403).send(error);
				});
		} else {
			Youtube.initalize().then(() => {
				console.log(available, 'READY TO SERVE PLAYLIST');
				available = true;

				Youtube.getSearchSuggestions(req.query.query)
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

app.get('/*', (req, res) => {
	res.status(400).send(errorData.pageNotFound);
});

app.listen(PORT, () => console.log('server has been started...'));
