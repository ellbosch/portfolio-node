const express = require('express');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// router.get('/');

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));