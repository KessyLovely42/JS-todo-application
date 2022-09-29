'use strict'

// Save todo items to local storage
const saveTodoItems = (todos) => {
    const todoJSON = JSON.stringify(todos);
    localStorage.setItem('todos', todoJSON);
}

//get todo items from local storage
const getTodoItems = () => {
    const todos = localStorage.getItem('todos');
    try {
        return todos ? JSON.parse(todos) : [];
    } catch (e) { return []; }
}
//delete todo items from local storage

//generate to the todo DOM elements
const generateDomElements = (todos) => {
    document.querySelector('#todos').innerHTML = '';

        todos.forEach((todo) => {
            const todoListSummary = document.createElement('h2');
            const todoItemLabel = document.createElement('label');
            const todoItemDiv = document.createElement('div');
            const todoCheckBox = document.createElement('input');
            const todoItemText = document.createElement('span');
            const deleteButton = document.createElement('button');
            const todosDiv = document.querySelector('#todos');

            todoItemText.setAttribute('id', todo.id);
            todoItemText.setAttribute('name', 'todo_text');
            todo.completed == true ? todoItemLabel.setAttribute('class', 'list-item-completed')
                : todoItemLabel.setAttribute('class', 'list-item')
            todoItemDiv.setAttribute('class', 'list-item__container');
            todoCheckBox.setAttribute('type', 'checkbox');
            todo.completed == true ? todoCheckBox.checked = true : todoCheckBox.checked = false;
            deleteButton.setAttribute('text', 'remove');
            deleteButton.innerHTML = "<img src='delete.png' width = '15' height = '15'>";
            //deleteButton.setAttribute('class', 'button');
            //deleteButton.textContent = 'remove';

            deleteButton.addEventListener ('click', (e) => {
                todos = getTodoItems();
                let todoIndex = todos.findIndex((todo) => {
                    //console.log(e.target.parentNode);
                    return e.target.parentNode.parentNode.firstChild.firstChild.nextSibling.getAttribute("id") == todo.id;
                })
                todos.splice(todoIndex,1);
                saveTodoItems(todos);
                generateDomElements(getTodoItems());
            })

            todoCheckBox.addEventListener('click', (e) => {
                //console.log(e.target.checked);
                let todos = getTodoItems();
                if (e.target.checked == true) {
                    todos.forEach((todo) => {
                        if (e.target.nextSibling.getAttribute('id') == todo.id) {
                            todo.completed = true;
                            todo.dateCompleted = currentDateTime();
                            e.target.parentNode.parentNode.setAttribute('class', 'list-item-completed');
                        }
                    })
                } else{
                    todos.forEach((todo) => {
                        if (e.target.nextSibling.getAttribute('id') == todo.id) {
                            todo.completed = false;
                            todo.dateCompleted = '';
                            e.target.parentNode.parentNode.setAttribute('class', 'list-item');
                        }
                    })
                }
                saveTodoItems(todos);
            })
            
            todoItemText.appendChild(document.createTextNode(todo.text));
            todoItemLabel.appendChild(todoItemDiv);
            todoItemLabel.appendChild(deleteButton);
            todoItemDiv.appendChild(todoCheckBox);
            todoItemDiv.appendChild(todoItemText);

            todosDiv.appendChild(todoListSummary);
            todosDiv.appendChild(todoItemLabel);
        })
    
    
}

const filterTodos = (filterText) => {
    let todos = getTodoItems();
    let regex = new RegExp(filterText + '+', 'i');
    let filteredTodo = todos.filter((todo) => {
        if (document.querySelector('#hide-completed').checked == true) {
            //console.log('in here ');
        //console.log(regex.test(todo.text) && todo.completed == false);
        return regex.test(todo.text) && todo.completed == true;
        } else {
            return regex.test(todo.text);
        }
    })
    return filteredTodo;
}

//get the summary of to do elements

//get current date and time in string format for all the date 
const currentDateTime = () => {
    let d = new Date();
    let currentDate = '';
    if (d.getHours() < 12) {
        currentDate = d.getDay() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '  ' +
            d.getHours() + ':' + d.getMinutes() + ' am';
    } else {
        currentDate = d.getDay() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + '  ' +
            (d.getHours() -12)+ ':' + d.getMinutes() + ' pm';
    }
    return currentDate;
}

