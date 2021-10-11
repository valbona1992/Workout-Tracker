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
        })
});

// Route to get the last workout with total duration of exercise
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
                totalWeight: { $sum: "exercise.weight" }
            }
        }
    ])
        .sort({ day: -1}).limit(1)
        .then(workoutDB => {
            res.json(workoutDB);
        }).catch(err => {
            console.log(err);
        })
})
