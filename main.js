// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButtonAdd = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo")
const editButtons = document.querySelectorAll('.edit');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButtonAdd.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);




// Functions

function addTodo(event) {

    event.preventDefault();

    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create LI
    const newTodo = document.createElement('input');
    newTodo.classList.add('text');
    newTodo.type = 'text';
    newTodo.value = todoInput.value;
    newTodo.setAttribute('readonly', 'readonly');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)

    //EDIT BUTTON
    const editButton = document.createElement('button')
    editButton.innerHTML = 'Edit'
    editButton.classList.add('edit')
    todoDiv.appendChild(editButton);
    editButton.addEventListener('click', () => editToDo(editButton));
    
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //clear Todo Input
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //DELETE TODO
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removelocalTodos(todo);
        todo.addEventListener('transitionend', function(){ //wait while transition finishes then deletes item
            todo.remove();
        });
    }

    //CHECK MARK
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function editToDo(button){
    const todo = button.closest('.todo');
    const editInput = todo.querySelector('.text');
    if (button.innerText.toLowerCase() == "edit") {
        button.innerText = "Save";
        editInput.removeAttribute("readonly");
        editInput.focus();
    } else {
        button.innerText = "Edit";
        editInput.setAttribute("readonly", true);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) { 
        const mStyle = todo.style;  
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncomplited":
                    if (!todo.classList.contains('completed')){
                        mStyle.display = 'flex';
                    } else{
                        mStyle.display = 'none';
                    }
                    break;
            }
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

     //Create LI
     const newTodo = document.createElement('input');
     newTodo.classList.add('text');
     newTodo.type = 'text';
     newTodo.value = todoInput.value;
     newTodo.setAttribute('readonly', 'readonly');
     todoDiv.appendChild(newTodo);

    //EDIT BUTTON
    const editButton = document.createElement('button')
    editButton.innerHTML = 'Edit'
    editButton.classList.add('edit')
    todoDiv.appendChild(editButton);
    editButton.addEventListener('click', () => editToDo(editButton));

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
};

function removelocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}