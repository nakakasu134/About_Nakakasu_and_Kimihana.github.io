const scrollBtn = document.getElementById("scrollTopBtn");

scrollBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const open_close = function () {
    const fadeBoxes = document.querySelectorAll(".fade-box");
    const vidIframes = document.querySelectorAll(".vid-iframe");
    const allVisible = Array.from(fadeBoxes).every(box => box.classList.contains("is-visible"))
        && Array.from(vidIframes).every(iframe => iframe.classList.contains("is-visible"));
    toggleAllBtn.textContent = allVisible ? "すべて閉じる" : "すべて開く";
    return allVisible;
}

const hiddenText = "を隠す";

const addHiddenText = function (element) {
    if (!element.textContent.includes(hiddenText)) {
        element.textContent += hiddenText;
    }
}

const removeHiddenText = function (element) {
    if (element.textContent.includes(hiddenText)) {
        element.textContent = element.textContent.replace(hiddenText, "");
    }
}

const toggleAllBtn = document.getElementById("toggleAllBtn");
toggleAllBtn.addEventListener("click", function () {
    const fadeBoxes = document.querySelectorAll(".fade-box");
    const vidIframes = document.querySelectorAll(".vid-iframe");
    const toggles = document.querySelectorAll(".toggle");

    const allVisible = open_close();

    if (allVisible) {
        // Hide all boxes and iframes
        fadeBoxes.forEach(box => box.classList.remove("is-visible"));
        vidIframes.forEach(iframe => iframe.classList.remove("is-visible"));
        toggles.forEach(toggle => removeHiddenText(toggle));
    } else {
        // Show all boxes and iframes
        fadeBoxes.forEach(box => box.classList.add("is-visible"));
        vidIframes.forEach(iframe => iframe.classList.add("is-visible"));
        toggles.forEach(toggle => addHiddenText(toggle));
    }
    open_close();
});

const fadeContainers = document.querySelectorAll(".fade-container");

fadeContainers.forEach(function (container) {
    const toggle = container.querySelector(".toggle");
    const fadeBox = container.querySelector(".fade-box");
    const hiddenText = "を隠す";

    toggle.addEventListener("click", function () {
        fadeBox.classList.toggle("is-visible");

        if (fadeBox.classList.contains("is-visible")) {
            addHiddenText(toggle);
        } else {
            removeHiddenText(toggle);
        }
        open_close();
    });
});

const vidIframes = document.querySelectorAll(".vid-iframe");
vidIframes.forEach(function (iframe) {
    const toggle = iframe.parentElement.querySelector(".toggle");
    const hiddenText = "を隠す";

    toggle.addEventListener("click", function () {
        iframe.classList.toggle("is-visible");

        if (iframe.classList.contains("is-visible")) {
            addHiddenText(toggle);
        } else {
            removeHiddenText(toggle);
        }
        open_close();
    });
});