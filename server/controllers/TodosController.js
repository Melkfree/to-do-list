const TodoTask = require("../models/TodoTask");

const indexAction = (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        if (err) return res.send(500, err);
        res.json({ items: tasks });
    });
}

const addAction = async (req, res) => {
    if (!req.body || !req.body.content) {
        res.status(400);
        res.send('None shall pass');
        return;
    }
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.json({ todo: todoTask });
    } catch (err) {
        res.status = 500;
    }
};

const editAction = async (req, res) => {
    const id = req.params.id;
    const content = req.params.content;
    TodoTask.find({}, (err, tasks) => {
    if (err) return res.send(500, err);
    res.json({ contentTask: content, idTask: id });
});
}



// const confirmEditAction = async (req, res) => {
//     const id = req.params.id;
//     TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
//     if (err) return res.send(500, err);
//     res.redirect("/");
// });

// }


const delAction = async (req, res)=> {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.json({ id });
    });
}

module.exports = {
    indexAction,
    addAction,
    editAction,
    // confirmEditAction,
    delAction
}