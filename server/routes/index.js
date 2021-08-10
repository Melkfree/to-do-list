const { indexAction } = require('../controllers/IndexController');
const {
    indexAction: todosAllAction,
    addAction:  addTodoAction,
    delAction: deleteTodoAction,
} = require('../controllers/TodosController');

const routes = (app) => {
    app
        .get('/', indexAction)
        .get('/todos', todosAllAction)
        .post('/todos', addTodoAction)
        .delete('/todos/remove/:id', deleteTodoAction)
}

module.exports = routes;