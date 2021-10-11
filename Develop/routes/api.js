const router = require('express').Router();
const Workout = require("../models/workout");


// Route to get the dashboard for seven days 
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: $exercises.duration }
            }
        }
    ])
        .sort({ day: -1}).limit(7)
        .then(workoutDB => {
            res.json(workoutDB);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

