
//Очистка локального хранилища - можно сделать напрямую в браузере через консоль:    localStorage.clear();

// Задание: Обработайте событие отправки формы (нужно перехватить событие onSubmit) и без перезагрузки страницы отобразите результат генерации
//Сделайте возможность сохранения и загрузки введенных пользователем параметров в локальное хранилище браузера пользователя (то есть localStorage)
   document.addEventListener('DOMContentLoaded', function() {
        var form = document.querySelector('.todo');
        var inputField = document.getElementById('myInput');
        var todoList = document.getElementById('myUL');
        var addButton = document.querySelector('.addBtn');

       //Добавляем обработчик события отправки формы
    document.getElementById('todoForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        newElement();
    });

        // Предотвращаем добавление события через кнопку "Enter"
        inputField.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        });

        // Добавляем событие добавления через кнопку "Добавить"
        addButton.addEventListener('click', function(event)
        {
            if (inputField.value === '')
                {
                    alert("Ты не придумал себе дело, поэтому его никак не добавить");
                    inputData = "отдых:)"
                } else {
                     inputData = inputField.value; // Получаем данные из поля ввода
                        }

            // можно выполнить генерацию результата
            // var generatedResult = "Добавлено новое дело: " + inputData;

            // Отобразим результат на странице
            var newListElement = document.createElement('li');
            newListElement.textContent = inputData;

            // Создаем кнопку "Закрыть" и добавляем ее к новому элементу списка
            var span = document.createElement('SPAN');
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            newListElement.appendChild(span);

            // Добавляем новый элемент списка в "todoList"
            todoList.appendChild(newListElement);
            inputField.value = ""; // Очистим поле ввода

            // Сохраняем введенные данные в локальное хранилище браузера
            if (localStorage.getItem('todos') === null) {
                var todos = [];
            } else {
                var todos = JSON.parse(localStorage.getItem('todos'));
            }

            todos.push(inputData);
            localStorage.setItem('todos', JSON.stringify(todos));

            // Добавляем обработчик события "клик" к кнопке "Закрыть" для нового элемента списка
            span.addEventListener('click', function() {
                    var div = this.parentElement;
                    div.style.display = "none";

                    // Удаляем удаленный элемент из локального хранилища
                    var savedTodos = JSON.parse(localStorage.getItem('todos')) || []; // Получаем массив из локального хранилища
                    var dataIndex = savedTodos.indexOf(div.textContent);
                    if (dataIndex > -1) {
                        savedTodos.splice(dataIndex, 1);
                        localStorage.setItem('todos', JSON.stringify(savedTodos)); // Обновляем локальное хранилище
                    }
                });
        });

       // Добавляем обработчик события "клик" для элементов списка чтобы переключать состояние "checked"
       todoList.addEventListener('click', function(event) {
           if (event.target.tagName === 'LI') {
               event.target.classList.toggle('checked'); // Переключаем класс "checked"

               // Обновляем состояние в локальном хранилище
               var savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
               var clickedTodo = event.target.textContent;
               var index = savedTodos.indexOf(clickedTodo);
               if (index > -1) {
                   savedTodos[index] = savedTodos[index].replace(/^\[x\]/, "") || "[x]" + savedTodos[index]; // добавить или убрать [x] в зависимости от наличия класса
                   localStorage.setItem('todos', JSON.stringify(savedTodos)); // Обновляем локальное хранилище
               }
           }
       });

       // Загружаем сохраненные данные из локального хранилища при загрузке страницы
       if (localStorage.getItem('todos') !== null) {
           var savedTodos = JSON.parse(localStorage.getItem('todos'));
           savedTodos.forEach(function(todo) {
               var newListElement = document.createElement('li');
               newListElement.textContent = todo;

               // Проверяем, сохранен ли статус "checked" в локальном хранилище
               if (todo.startsWith("[x]")) {
                   newListElement.classList.add('checked'); // Добавляем класс "checked"
               }


               // Создаем кнопку "Закрыть" и добавляем ее к сохраненному элементу списка
                var span = document.createElement('SPAN');
                var txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                newListElement.appendChild(span);

                todoList.appendChild(newListElement);

                // Добавляем обработчик события "клик" к кнопке "Закрыть" сохраненного элемента
                span.addEventListener('click', function() {
                    var div = this.parentElement;
                    div.style.display = "none";

                    // Удаляем удаленный элемент из локального хранилища
                    var dataIndex = savedTodos.indexOf(div.textContent);
                    if (dataIndex > -1) {
                        savedTodos.splice(dataIndex, 1);
                        localStorage.setItem('todos', JSON.stringify(savedTodos));
                    }
                });

                todoList.appendChild(newListElement);
                    });
}

       // Добавляем обработчик события для кнопки "очистить список"
       document.getElementById('clearButton').addEventListener('click', function() {
           // Очищаем локальное хранилище
           localStorage.removeItem('todos');
           // Очищаем массив savedTodos (если он у вас есть)
           savedTodos = [];
   });

});

