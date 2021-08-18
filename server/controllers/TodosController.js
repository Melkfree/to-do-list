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

const updateAction = async (req, res) => {
    const todo = await TodoTask.findById(req.params.id);
    for(let key in req.body){
        if(todo[key] != req.body[key]){
            todo[key] = req.body[key]
        }
    }

    try {
        await todo.save();
        res.send(todo)
    } catch (err) {
        res.send(400, err)
    }
}

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
    updateAction,
    delAction
}