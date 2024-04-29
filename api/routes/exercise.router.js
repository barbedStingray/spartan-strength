const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/spartacus', (req, res) => {
    console.log('GET /spartacus server NAILED IT');

    const queryText = `SELECT * FROM "spartacus";`;

    pool.query(queryText).then((result) => {
        console.log('GET /spartacus success');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error GET /spartacus');
        res.sendStatus(500);
    });
});
// POST

// DELETE

// PUT

module.exports = router;