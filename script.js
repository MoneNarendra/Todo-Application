let todoItemsContainer = document.getElementById("todoItemsContainer");
let addBtnEl = document.getElementById("addBtn");
let saveTodoButton = document.getElementById("saveTodoButton");

function getSavedTodoList() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parseTodoList = JSON.parse(stringifiedTodoList);

    if (parseTodoList === null) {
        return [];
    } else {
        return parseTodoList;
    }

}

let todoList = getSavedTodoList();

saveTodoButton.onclick = function() {
    let stringifyTodoList = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringifyTodoList);
    //console.log(localStorage.getItem("todoList"));
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelEle = document.getElementById(labelId);
    //let checkboxStatusEl = document.getElementById(checkboxId);

    labelEle.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNum;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === false) {
        todoObject.isChecked = true;
    } else {
        todoObject.isChecked = false;
    }

}

function deleteTodoEle(todoId) {
    let deleteEle = document.getElementById(todoId);
    todoItemsContainer.removeChild(deleteEle);

    let deleteTodoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNum;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteTodoIndex, 1);
}

function createAndAppend(todo) {
    let checkboxId = "checkbox" + todo.uniqueNum;
    let labelId = "label" + todo.uniqueNum;
    let todoId = "todo" + todo.uniqueNum;

    let todoContainer = document.createElement("li");
    todoContainer.id = todoId;
    todoContainer.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoContainer);

    let inputEle = document.createElement("input");
    inputEle.classList.add("checkbox-input");
    inputEle.type = "checkbox";
    inputEle.checked = todo.isChecked;
    inputEle.id = checkboxId;

    inputEle.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    todoContainer.appendChild(inputEle);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoContainer.appendChild(labelContainer);

    let labelEle = document.createElement("label");
    labelEle.classList.add("checkbox-label");
    labelEle.id = labelId;
    labelEle.setAttribute("for", checkboxId);
    labelEle.textContent = todo.text;

    if (todo.isChecked === true) {
        labelEle.classList.toggle("checked");
    }

    labelContainer.appendChild(labelEle);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteEle = document.createElement("i");
    deleteEle.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteEle.onclick = function() {
        deleteTodoEle(todoId);
    };

    deleteContainer.appendChild(deleteEle);


}

for (let todo of todoList) {
    createAndAppend(todo);
}

let lengthTodo = todoList.length;

function onAddTodo() {
    let todoUserInput = document.getElementById("todoUserInput");
    let userInput = todoUserInput.value;

    if (userInput === "") {
        alert("Enter the valid input");
        return;
    }

    lengthTodo = lengthTodo + 1;
    let newTodo = {
        text: userInput,
        uniqueNum: lengthTodo,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppend(newTodo);
    todoUserInput.value = "";

}

addBtnEl.onclick = function() {
    onAddTodo();
};

// theam change 

let theamID = document.getElementById("theamID");

let mainContainer = document.getElementById("mainContainer");

theamID.onchange = function(event) {
    console.log(event.target.checked);
    mainContainer.classList.toggle("dark-theam");
}