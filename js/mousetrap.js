document.addEventListener("DOMContentLoaded", function() {
    // Привязываем клавишу '1' для перенаправления на страницу 'Authorization.html'
    Mousetrap.bind('1', function() {
        window.location.href = 'Authorization.html';
    });

    // Привязываем клавишу '2' для перенаправления на страницу 'Catalog.html'
    Mousetrap.bind('2', function() {
        window.location.href = 'Catalog.html';
    });

    // Привязываем клавишу '3' для перенаправления на страницу 'Services.html'
    Mousetrap.bind('3', function() {
        window.location.href = 'Services.html';
    });

    Mousetrap.bind('0', function() {
        window.location.href = 'index.html';
    });
});

//window.location.href для изменения текущего URL-адреса страницы на указанные значения при нажатии соответствующих клавиш.
