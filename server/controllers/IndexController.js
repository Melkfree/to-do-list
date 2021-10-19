const TodoTask = require("../models/TodoTask");

const indexAction = (req, res) => {
    res.render("todo.ejs", {});
}

module.exports = {
    indexAction,
}

