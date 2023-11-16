async function updateRequest(firstCall) {
    const preloader = document.getElementById('preloader');
    let url = 'https://jsonplaceholder.typicode.com/users';

    if (firstCall) {
        url += '?id_gte=5'; // первый запрос пользователей с id больше или равно 5
    } else {
        url += '?id_lte=5'; // второй запрос пользователей с id меньше или равно 5
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        preloader.style.display = 'none'; // скрыть preloader
        console.log('Полученные данные о пользователях:', users);
        renderUsers(users);
        document.getElementById('refreshButton').style.display = 'block'; // отобразить кнопку "Обновить запрос"
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        preloader.style.display = 'none'; // скрыть preloader
        const errorPlaceholder = document.createElement('div');
        errorPlaceholder.textContent = '⚠ Что-то пошло не так';
        document.body.appendChild(errorPlaceholder);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const preloader = document.getElementById('preloader');
     let url = 'https://jsonplaceholder.typicode.com/users';

    let firstCall = true; // Флаг для отслеживания первого и второго обращения

    document.getElementById('refreshButton').addEventListener('click', function() {
        firstCall = !firstCall; // обновить флаг
        updateRequest(firstCall); // вызов функции с обновленным флагом
    });

    updateRequest(firstCall); // вызов функции изначальной функции
});

function renderUsers(users) {
        const userListElement = document.getElementById('userList');
        userListElement.innerHTML = ''; // очистить существующие данные
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.innerHTML =
                `Username: ${user.username}, Name: ${user.name}, Email: ${user.email}`;
            userListElement.appendChild(userElement);
        });
}









