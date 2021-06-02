const TodoTask = require("../models/TodoTask");

const indexAction = (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.json({ items: tasks });
    });
}

module.exports = {
    indexAction,
}