const tasksListEllement = document.getElementById('tasksList');

fetch('/todos')
    .then(res => res.json())
    .then(res => {
        const { items } = res;
        const listHtml = items.map(todo => `
                <li class="todo-list-item">
                    <div class="todo-list-item-name">${todo.content}</div>
                    <a href="/edit/${todo._id}" class="edit">
                        <span class="fas fa-edit"></span>
                    </a>
                    <a href="/remove/${todo._id}" class="remove">
                        <span class="fas fa-times"></span>
                    </a>
                    <button form="removeTodo_${todo._id}" class="remove-button">[x]</button>
                    <form hidden id="removeTodo_${todo._id}" class="remove-todo">
                        <input hidden name="id" value="${todo._id}" />
                    </form>
                </li>
            `);
        tasksListEllement.innerHTML = listHtml.join('');
        items.forEach(({ _id }) => removeTodoListener(_id))
    });

const addTodoForm = document.getElementById('addTodo');

addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(addTodoForm);
    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getFormData(addTodoForm),
    })
    .then((res) => res.json())
    .then(({ todo: { content, _id } }) => {
        const li = document.createElement('li');
        li.classList.add('todo-list-item')
        li.innerHTML = `
            <li class="todo-list-item">
            <div class="todo-list-item-name">${content}</div>
            <a href="/edit/${_id}" class="edit"> <span class="fas fa-edit"></span>
            </a>
            <a href="/remove/${_id}" class="remove"> <span class="fas fa-times"></span>
            </a>
            <button form="removeTodo_${_id}" class="remove-button">[x]</button>
            <form hidden id="removeTodo_${_id}" class="remove-todo">
                <input hidden name="id" value="${_id}" />
            </form>
        `;
        tasksListEllement.append(li);
        removeTodoListener(_id)
    })
    .catch(e => {
        console.log(e)
    })
})


function getFormData(form) {
    var elements = form.elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

    return JSON.stringify(obj);
}


function removeTodoListener(_id) {
    document.getElementById(`removeTodo_${_id}`).addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`/todos/remove/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    });
}