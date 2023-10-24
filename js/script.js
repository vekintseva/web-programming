(function () {
    console.log("start script")
    document.addEventListener("DOMContentLoaded",()=>{
        const loadInfoDiv = document.getElementById("load_page")

        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                const domContentLoadedTime =
                    entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
                loadInfoDiv.innerText=`DOMContentLoaded processing time: ${domContentLoadedTime}ms,`

            });
        });

        observer.observe({ type: "navigation", buffered: true });

    });
})();