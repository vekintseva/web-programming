document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.todo');
    const inputField = document.getElementById('myInput');
    const todoList = document.getElementById('myUL');
    const addButton = document.querySelector('.addBtn');

    function newElement() {
    }

    document.getElementById('todoForm').addEventListener('submit', function (event) {
        event.preventDefault();
        newElement();
    });

    inputField.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

    addButton.addEventListener('click', function (event) {
        let inputData
        let todos = []

        if (inputField.value === '') {
            alert("Ты не придумал себе дело, поэтому его никак не добавить");
            inputData = "отдых:)"
        } else {
            inputData = inputField.value;
        }

        const newListElement = document.createElement('li');
        newListElement.textContent = inputData;

        const span = document.createElement('SPAN');
        const txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        newListElement.appendChild(span);

        todoList.appendChild(newListElement);

        inputField.value = "";

        if ("todos" in localStorage) {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.push({name: inputData, isChecked: false});
        localStorage.setItem('todos', JSON.stringify(todos));

        span.addEventListener('click', function () {
            console.log("DELETE action")
            const div = this.parentElement;
            div.style.display = "none";
            const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
            console.log(`savedTodos before   = ${JSON.parse(localStorage.getItem('todos'))}`)
            console.log(`savedTodos = ${savedTodos}`)
            const clickedTodoName = div.textContent.replace('×', '');
            console.log(`clickedTodoName = ${clickedTodoName}`)
            let todoClicked = savedTodos.find(todo => todo.name === clickedTodoName)
            console.log("todoClicked=", todoClicked)
            if (todoClicked) {
                localStorage.setItem('todos', JSON.stringify(savedTodos.filter((todo) => todo.name !== clickedTodoName)));
            }
        });

    });

    todoList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('checked');

            const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
            const clickedTodoName = event.target.textContent.replace('×', '');
            console.log("clickedTodoName=", clickedTodoName)
            let todoClicked = savedTodos.find(todo => todo.name === clickedTodoName)
            console.log("todoClicked=", todoClicked)
            if (todoClicked) {
                todoClicked.isChecked = !todoClicked.isChecked
                localStorage.setItem('todos', JSON.stringify(savedTodos))
            }
        }
    });

    if (localStorage.getItem('todos') !== null) {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        savedTodos.forEach(function (todo) {
            const newListElement = document.createElement('li');
            newListElement.textContent = todo.name;

            console.log("todo", todo)
            if (todo.isChecked) {
                newListElement.classList.add('checked');
            }


            const span = document.createElement('SPAN');
            const txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            newListElement.appendChild(span);

            todoList.appendChild(newListElement);


            span.addEventListener('click', function () {
                let div = this.parentElement;
                div.style.display = "none";


                const clickedTodoName = div.textContent.replace('×', '');
                console.log(`clickedTodoName = ${clickedTodoName}`)
                let todoClicked = savedTodos.find(todo => todo.name === clickedTodoName)
                console.log("todoClicked=", todoClicked)
                if (todoClicked) {
                    localStorage.setItem('todos', JSON.stringify(savedTodos.filter((todo) => todo.name !== clickedTodoName)));
                }
            });

            todoList.appendChild(newListElement);
        });
    }

    document.getElementById('clearButton').addEventListener('click', function () {
        localStorage.removeItem('todos');
    });

});