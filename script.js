const scrollBtn = document.getElementById("scrollTopBtn");

scrollBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const fadeContainers = document.querySelectorAll(".fade-container");

fadeContainers.forEach(function (container) {
    const toggle = container.querySelector(".toggle");
    const fadeBox = container.querySelector(".fade-box");
    const hiddenText = "を隠す";

    toggle.addEventListener("click", function () {
        fadeBox.classList.toggle("is-visible");

        if (fadeBox.classList.contains("is-visible")) {
            toggle.textContent += hiddenText;
        } else {
            toggle.textContent = toggle.textContent.replace(hiddenText, "");
        }
    });
});

const vidIframes = document.querySelectorAll(".vid-iframe");
vidIframes.forEach(function (iframe) {
    const toggle = iframe.parentElement.querySelector(".toggle");
    const hiddenText = "を隠す";

    toggle.addEventListener("click", function () {
        iframe.classList.toggle("is-visible");

        if (iframe.classList.contains("is-visible")) {
            toggle.textContent += hiddenText;
        } else {
            toggle.textContent = toggle.textContent.replace(hiddenText, "");
        }
    });
});