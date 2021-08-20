const tasksListEllement = document.getElementById('tasksList');

fetch('/todos')
    .then(res => res.json())
    .then(res => {
        const { items } = res;
        const listHtml = items.map(todo => `
                <li class="todo-list-item">
                    <div class="todo-list-item-name">${todo.content}</div>
                    
                    <button form="updateTodo_${todo._id}" class="edit-button"><span class="fas fa-edit"></button>
                    <form hidden id="updateTodo_${todo._id}" class="edit-todo">
                        <input hidden name="id" value="${todo._id}" />
                    </form>
                    <button form="removeTodo_${todo._id}" class="remove-button">[x]</button>
                    <form hidden id="removeTodo_${todo._id}" class="remove-todo">
                        <input hidden name="id" value="${todo._id}" />
                    </form>
                </li>
            `);
        tasksListEllement.innerHTML = listHtml.join('');
        items.forEach(({ _id }) => editTodoListener(_id));
        items.forEach(({ _id }) => removeTodoListener(_id));
        
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
    // .then(res => (console.log(res)))
    .then(({ todo: { content, _id } }) => {
        const li = document.createElement('li');
        li.classList.add('todo-list-item')
        li.innerHTML = `
            <div class="todo-list-item-name">${content}</div>
            <button form="updateTodo_${_id}" class="edit-button"><span class="fas fa-edit"></button>
            <form hidden id="updateTodo_${_id}" class="edit-todo">
                <input hidden name="id" value="${_id}" />
            </form>
            <button form="removeTodo_${_id}" class="remove-button">[x]</button>
            <form hidden id="removeTodo_${_id}" class="remove-todo">
                <input hidden name="id" value="${_id}" />
            </form>
        `;
        tasksListEllement.append(li);
        editTodoListener(_id);
        removeTodoListener(_id);
        
        document.getElementById("new-task").value="";
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

function editTodoListener(_id) {
    document.getElementById(`updateTodo_${_id}`).addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('EDIT');

        fetch(`/todos/edit/${_id}`, {
            method: 'GET'
        })
        .then((res) => res.json())
        // .then(res => (console.log(res)))
        .then(
            function(){
            const editInput = document.createElement('input');
            editInput.type="text";
            editInput.value = `YEYEYEYEYE`;
            document.getElementById(`updateTodo_${_id}`).appendChild(editInput);
            }
        )
        .catch(e => {
            console.log(e);
        })
    });
    
}

function removeTodoListener(_id) {
    document.getElementById(`removeTodo_${_id}`).addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`/todos/remove/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => (console.log(res)))
        .then(function(){
            tasksListEllement.removeChild(document.getElementById(`removeTodo_${_id}`).parentNode)
        })
        .catch(err => console.log(err));
    });
    
}