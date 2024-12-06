import "./src/styles/main.scss";
import "./src/scripts/menu-section";
// import "./src/scripts/statements-animation";

const scrollContainer = document.getElementById("main");
let isScrolling = false;
let targetScrollLeft = 0;
let scrollTimeout;

scrollContainer.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (isScrolling) return;

    const scrollAmount = window.innerWidth;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    if (event.deltaY > 0) {
        if (targetScrollLeft !== maxScrollLeft) isScrolling = true;
        targetScrollLeft = Math.min(scrollContainer.scrollLeft + scrollAmount, maxScrollLeft);
    } else {
        if (targetScrollLeft !== 0) isScrolling = true;
        targetScrollLeft = Math.max(scrollContainer.scrollLeft - scrollAmount, 0);
    }

    scrollContainer.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
});

scrollContainer.addEventListener("scroll", () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        if (Math.abs(scrollContainer.scrollLeft - targetScrollLeft) < 1) {
            isScrolling = false;
        }
    }, 100);
});
