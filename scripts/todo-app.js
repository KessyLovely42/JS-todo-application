'use strict'

currentDateTime();
generateDomElements(getTodoItems());
document.querySelector('#filter-todo').value = '';
document.querySelector('#todo-text').value = '';
document.querySelector('#hide-completed').checked = false;

//logic for the submit button
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let todos = getTodoItems();
    const todoText = e.target.elements.addTodo.value.trim();
    if (todoText !== '') {
        let todoOBJ = {
            id: uuidv4(),
            text: todoText,
            notes: '',
            //checked: false,
            dateCreated: currentDateTime(),
            deadlineDate: '',
            dateCompleted:'',
            completed: false
        }
        todos.push(todoOBJ);
        saveTodoItems(todos);
    }
    generateDomElements(todos);
    e.target.elements.addTodo.value = '';
})

//logic for the filter checkbox
document.querySelector('#filter-todo').addEventListener('input', (e) => {
    try {
        generateDomElements(filterTodos(e.target.value));
    } catch (er) {
        e.target.value = '';
    }
    //console.log(todoFiltered);
})
//logic for the hide completed
document.querySelector('#hide-completed').addEventListener('click', (e) => {
    generateDomElements(filterTodos(document.querySelector('#filter-todo')));
})
