'use strict';

const Express = require('express');

const app = Express();

const STATIC_DIR = 'public';
const PORT = 8080;

app.use(Express.static(STATIC_DIR));

app.listen(PORT);
