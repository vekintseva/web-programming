(function () {

    // console.log("проверка добавления")

    document.addEventListener("DOMContentLoaded",()=>{
        // console.log("Загружена стр")
        console.log(window.location.href)
        const links = document.querySelectorAll('.navigation ul li a')
        for (let link of links) {
            console.log(link.href)
            if (link.href === window.location.href){
                link.classList.add("nav-active")
            }
        }
    });

})();


