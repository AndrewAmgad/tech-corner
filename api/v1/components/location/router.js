const express = require('express');
const router = express.Router();
const fs = require('fs');

let file = fs.readFileSync('cities.json');
let data = JSON.parse(file);

router.get('/cities', (req, res) => {
    res.status(200).json(data)
});

module.exports = router;