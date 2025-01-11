import "./src/styles/main.scss";
import "./src/scripts/menu-section";
import "./src/scripts/statement-section";
import { menuIsShown } from "./src/scripts/menu-section";
import { gsap } from "gsap";

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
        if (!menuIsShown) {
            if (targetScrollLeft !== maxScrollLeft) isScrolling = true;
            targetScrollLeft = Math.min(scrollContainer.scrollLeft + scrollAmount, maxScrollLeft);
            gsap.to(".menu-section", { left: "-25%", duration: 1 });
        }
    } else {
        if (!menuIsShown) {
            if (targetScrollLeft !== 0) isScrolling = true;
            targetScrollLeft = Math.max(scrollContainer.scrollLeft - scrollAmount, 0);
            gsap.to(".menu-section", { left: "1.18vh", duration: 1 });
        }
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
