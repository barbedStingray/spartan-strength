const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

// spartacus original workout
router.get('/spartacus', (req, res) => {
    console.log('GET /spartacus server');

    const queryText = `SELECT * FROM "spartacus";`;

    pool.query(queryText).then((result) => {
        console.log('GET /spartacus success');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error GET /spartacus', error);
        res.sendStatus(500);
    });
});

// custom workout NAME
router.get('/workoutName/:id', (req, res) => {
    console.log('GET /workoutName server', req.params.id);

    const queryText = `SELECT * FROM "workout" WHERE "id" = $1;`;

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('GET /workoutName success');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error GET /workoutName', error);
        res.sendStatus(500);
    });
});

// custom workout list
router.get('/workoutsList', (req, res) => {
    console.log('GET /workoutsList server');

    const queryText = `SELECT * FROM "workout";`;

    pool.query(queryText).then((result) => {
        console.log('GET /workoutsList success');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error GET /workoutsList', error);
        res.sendStatus(500);
    });
});

// exercises list
router.get('/exercises/:id', (req, res) => {
    console.log('GET /exercises server', req.params.id);

    const queryText = `
    SELECT 
	    "workout_exercise"."id",
	    "workout_exercise"."exercise"
    FROM
        "workout_exercise"
        JOIN "workout" ON "workout"."id" = "workout_exercise"."workout_id"
        WHERE "workout"."id" = $1
    ;`;

    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('GET /exercises success');
        res.send(result.rows);
    }).catch((error) => {
        console.log('error GET /exercises', error);
        res.sendStatus(500);
    });

});


// POST
// post new workout name
router.post('/newWorkout', (req, res) => {
    console.log('POST /newWorkout', req.body.workoutName);
    const queryText = `INSERT INTO "workout" ("name") VALUES ($1) RETURNING "id";`;
    const { workoutName } = req.body;

    pool.query(queryText, [workoutName]).then((result) => {
        console.log(`POST /newWorkout success return:`, result.rows[0]);
        const { id } = result.rows[0];
        console.log('ID', id);
        res.status(201).send({ id });
        // res.sendStatus(201);
    }).catch((error) => {
        console.log(`POST /newWorkout error`, error);
        res.sendStatus(500);
    });
});

// ! post new exercise 
router.post('/newExercise', (req, res) => {
    // console.log('POST /newExercise', req.body.workoutName);
    // const queryText = `INSERT INTO "workout" ("name") VALUES ($1) RETURNING "id";`;
    // const { workoutName } = req.body;

    pool.query(queryText, [workoutName]).then((result) => {
        // console.log(`POST /newExercise success return:`, result.rows[0]);
        // const { id } = result.rows[0];
        // console.log('ID', id);
        // res.status(201).send({ id });
        // res.sendStatus(201);
    }).catch((error) => {
        console.log(`POST /newExercise error`, error);
        res.sendStatus(500);
    });
});


// DELETE

// PUT

module.exports = router;