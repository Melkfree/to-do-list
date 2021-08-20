const { indexAction } = require('../controllers/IndexController');
const {
    indexAction: todosAllAction,
    addAction:  addTodoAction,
    editAction: editTodoAction,
    confirmEditAction: confirmEditTodoAction,
    delAction: deleteTodoAction,
} = require('../controllers/TodosController');

const routes = (app) => {
    app
        .get('/', indexAction)
        .get('/todos', todosAllAction)
        .post('/todos', addTodoAction)
        .get('/todos/edit/:id', editTodoAction)
        .post('/todos/edit/:id', confirmEditTodoAction)
        .delete('/todos/remove/:id', deleteTodoAction)
        
        
}

module.exports = routes;