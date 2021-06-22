fetch('/todos')
    .then(res => res.json())
    .then(res => {
        const tasksListEllement = document.getElementById('tasksList');
        console.log(tasksListEllement)
        const { items } = res;
        const listHtml = items.map(todo => `
                <li class="todo-list-item">
                    <div class="todo-list-item-name">${todo.content}</div>
                    <a href="/edit/${todo._id}" class="edit" id="edit-task">
                        <span class="fas fa-edit"></span>
                    </a>
                    <a href="/remove/${todo._id}" class="remove" id="delete-task">
                        <span class="fas fa-times"></span>
                    </a>
                </li>
            `);
        tasksListEllement.innerHTML = listHtml.join('');
    })

