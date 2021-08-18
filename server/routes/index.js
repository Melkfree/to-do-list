const { indexAction } = require('../controllers/IndexController');
const {
    indexAction: todosAllAction,
    addAction:  addTodoAction,
    updateAction: updateTodoAction,
    delAction: deleteTodoAction,
} = require('../controllers/TodosController');

const routes = (app) => {
    app
        .get('/', indexAction)
        .get('/todos', todosAllAction)
        .post('/todos', addTodoAction)
        .delete('/todos/remove/:id', deleteTodoAction)
        .put('/todos/edit/:id', updateTodoAction)
}

module.exports = routes;