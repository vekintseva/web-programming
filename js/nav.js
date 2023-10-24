const pageToLinkMap = {
    // const links = document.querySelector

};

const currentPage = window.location.href; // url адрес текущей страницы
for (const page in pageToLinkMap) {
    if (currentPage.includes(page))
    {
        document.getElementById(pageToLinkMap[page]).className = "nav-active";
        break;  // выход из цикла, как только найдена соответствующая страница
    }
}