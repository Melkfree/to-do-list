const { indexAction } = require('../controllers/IndexController');
const {
    indexAction: todosAllAction,
    addAction:  addTodoAction,
} = require('../controllers/TodosController');

const routes = (app) => {
    app
        .get('/', indexAction)
        .get('/todos', todosAllAction)
        .post('/todos', addTodoAction)
}

module.exports = routes;