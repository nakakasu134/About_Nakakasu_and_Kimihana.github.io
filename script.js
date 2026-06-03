const scrollBtn = document.getElementById("scrollTopBtn");

scrollBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
