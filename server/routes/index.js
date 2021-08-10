const { indexAction } = require('../controllers/IndexController');
const {
    indexAction: todosAllAction,
    addAction:  addTodoAction,
    deleteAction: delAction
} = require('../controllers/TodosController');

const routes = (app) => {
    app
        .get('/', indexAction)
        .get('/todos', todosAllAction)
        .post('/todos', addTodoAction)
        .get('/remove/:id', deleteAction)
}

module.exports = routes;