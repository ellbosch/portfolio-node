const express = require('express');

const API_PORT = process.env.HTTP_PORT || 3001;
const app = express();

app.get('/', (req, res) => {
	res.send('just gonna send it');
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));