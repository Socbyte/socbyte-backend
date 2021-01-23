const express = require('express');
const YoutubeMusicApi = require('youtube-music-api');
const key = require('./key');

const app = express();
const PORT = process.env.PORT || 3000;

let available = false;
const Youtube = new YoutubeMusicApi();
Youtube.initalize().then(() => {
	available = true;
});

app.get('/', (req, res) => {
	const body = {
		simple_query: `https://socbyte-backend.herokuapp.com/?id={youtube_video_id}`,
	};
	res.send(body);
});

app.get('/music', (req, res) => {
	if (req.query.key !== key) {
		res.send({
			status: 400,
			error: {
				code: 'accessNotAllowed',
				message: "you don't have access to retrieve data from this link",
			},
		});
	} else if (!req.query.query) {
		res.send({
			status: 400,
			error: {
				code: 'undefined/query',
				message: 'the query you have provided is not valid',
			},
		});
	} else {
		if (available) {
			Youtube.search(req.query.query, 'video')
				.then(result => {
					res.send(result);
				})
				.catch(error => {
					res.send(error);
				});
		} else {
			Youtube.initalize().then(() => {
				available = true;

				Youtube.search(req.query.query, 'video')
					.then(result => {
						res.send(result);
					})
					.catch(error => {
						res.send(error);
					});
			});
		}
	}
});

app.listen(PORT, () => console.log('server has been started...'));
