const express = require('express');

const App = express();

const PORT = process.env.PORT || 5000;

App.get('/', (req, res) => res.send("API is running"));

App.listen(PORT, () => console.log('${ PORT }'));

