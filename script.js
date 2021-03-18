var newTask = document.getElementsByClassName("add-task");
var addButton = document.getElementsByTagName("button")[0];
var activeTask = document.getElementsByClassName("active-task");

var createNewTaskElement = function(taskString){
    var listItem = document.createElement("li");
    var label = document.createElement("label");
    var deleteButton = document.createElement("button");
    var addHr = document.createElement("hr");

    deleteButton.innerText = "Видалити";
    deleteButton.className = "delete";

    label.innerText = taskString;

    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function (){
    var listItem = createNewTaskElement(newTask.value);
    activeTask.appendChild(listItem);
    newTask.value = "";
}

var deleteTask = function(){
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem, ) {
  var deleteButton = taskListItem.querySelector("button.delete");
    deleteButton.onclick = deleteTask;
}

for (var i = 0; i < activeTask.children.length; i ++) {	
    bindTaskEvents(activeTask.children[i],);
  }