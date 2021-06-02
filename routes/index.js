const { indexAction } = require('../controllers/IndexController');
const { indexAction: todosAllAction } = require('../controllers/TodosController');

const routes = (app) => {
    app.get('/', indexAction);
    app.get('/todos', todosAllAction)
}

module.exports = routes;