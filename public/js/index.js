// const { json } = require("body-parser");

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
            <form hidden id="updateTodo_${_id}" class="edit-todo" >
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
            function(item){
                console.log(item);
            const editInput = document.createElement('input');
            const submitInputButton = document.createElement('button');
            const submitInputForm = document.createElement('form');

            submitInputButton.innerText = 'Submit';
            submitInputButton.className ='update-submit';
            submitInputButton.setAttribute('form', `updateTodoSubmit_${_id}`);

            submitInputForm.setAttribute('id', `updateTodoSubmit_${_id}`);
            submitInputForm.setAttribute('hidden', '');
            // submitInputForm.setAttribute('display', 'none');
            submitInputForm.setAttribute('method', 'POST');
            submitInputForm.innerHTML = `<input hidden name="id" value="${_id}" />`;

            editInput.type="text";
            editInput.setAttribute('id', `submitTodo_${_id}`);
            editInput.value = `${item.content}`;


            document.getElementById(`updateTodo_${_id}`).appendChild(submitInputForm);
            document.getElementById(`updateTodo_${_id}`).appendChild(editInput);
            document.getElementById(`updateTodo_${_id}`).appendChild(submitInputButton);
            
            submitUpdateListener(_id);
            }
        )
        .catch(e => {
            console.log(e);
        })
    });
    
}

function submitUpdateListener(_id) {
    document.getElementById(`updateTodoSubmit_${_id}`).addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(document.getElementById(`updateTodoSubmit_${_id}`));
        fetch(`/todos/edit/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({content: 'HIIIII'}),
            body: JSON.stringify({content : document.getElementById(`submitTodo_${_id}`).value}),
        })
        .then(res => res.json())
        // .then(res => {console.log(res)})
        .then(function(item) {
            console.log(`This ${item.content} and ${item.id}`);
            const divUpdate = document.createElement('div');
            divUpdate.innerText = `${item.content}`;

            
            
            document.getElementById(`updateTodo_${_id}`).parentNode.replaceChild(divUpdate ,document.getElementById(`updateTodo_${_id}`).parentNode.getElementsByTagName('div')[0])
            while (document.getElementById(`updateTodo_${_id}`).firstChild) {
                document.getElementById(`updateTodo_${_id}`).removeChild(document.getElementById(`updateTodo_${_id}`).firstChild);
            }
        })
        .catch(e => {
            console.log(e)
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