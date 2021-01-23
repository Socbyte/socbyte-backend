const express = require('express');
const YoutubeMusicApi = require('youtube-music-api');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	const body = {
		simple_query: `https://socbyte-backend.herokuapp.com/?id={youtube_video_id}`,
	};
	res.send(body);
});

app.listen(PORT, () => console.log('server has been started...'));
