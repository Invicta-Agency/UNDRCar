import "./src/styles/main.scss";
import "./src/scripts/gallery-section";
import "./src/scripts/menu-section";
import "./src/scripts/services-section";
import "./src/scripts/statement-section";
import { menuIsShown } from "./src/scripts/menu-section";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const scrollContainer = document.getElementById("scroll-container");
let currentBox = 0;
const horisontalScrollBoxes = document.querySelectorAll(".horisontal-scroll-box");
const totalHorisontalScrollBoxes = horisontalScrollBoxes.length;

scrollContainer.addEventListener("wheel", (event) => {
    event.preventDefault();

    if (scrollContainer.scrollLeft !== currentBox * window.innerWidth || menuIsShown) return;

    const horisontalBoxElement = horisontalScrollBoxes[currentBox];
    const verticalBoxElement = horisontalBoxElement.querySelector(".vertical-scroll-box");

    if (!menuIsShown) {
        if (event.deltaY > 0) {
            if (verticalBoxElement) {
                if (verticalBoxElement.scrollTop + verticalBoxElement.clientHeight >= verticalBoxElement.scrollHeight) {
                    if (currentBox < totalHorisontalScrollBoxes - 1) {
                        currentBox++;
                    }
                } else {
                    verticalBoxElement.scrollTop += 400;
                }
            } else if (currentBox < totalHorisontalScrollBoxes - 1) {
                currentBox++;
            }
            gsap.to(".menu-section", { left: "-25%", duration: 0.9, ease: "circ" });
        } else {
            if (verticalBoxElement) {
                if (verticalBoxElement.scrollTop > 0) {
                    verticalBoxElement.scrollTop -= 400;
                } else {
                    if (currentBox > 0) {
                        currentBox--;
                    }
                }
            } else if (currentBox > 0) {
                currentBox--;
            }
            gsap.to(".menu-section", { left: "1.18vh", duration: 0.9, ease: "circ" });
        }
    }

    const targetScrollLeft = currentBox * window.innerWidth;

    gsap.to(scrollContainer, {
        scrollTo: { x: targetScrollLeft },
        duration: 0.6,
        ease: "circ",
    });
});

const goToBox = (sectionIndex) => {
    currentBox = sectionIndex;
    gsap.to(scrollContainer, {
        scrollTo: { x: currentBox * window.innerWidth },
        duration: 1,
        ease: "circ",
    });
};

document.querySelector(".menu-section__about-us").addEventListener("click", () => {
    goToBox(2);
});

document.querySelector(".menu-section__services").addEventListener("click", () => {
    goToBox(3);
});

document.querySelector(".menu-section__gallery").addEventListener("click", () => {
    goToBox(4);
});

document.querySelector(".footer__start-button").addEventListener("click", () => {
    gsap.to(".menu-section", { left: "1.18vh", duration: 0.9, ease: "circ" });
    goToBox(0);
});

// Update scroll position on window resize
window.addEventListener("resize", () => {
    const targetScrollLeft = currentBox * window.innerWidth;
    gsap.to(scrollContainer, {
        scrollTo: { x: targetScrollLeft },
        duration: 0.6,
        ease: "circ",
    });
});

horisontalScrollBoxes.forEach((section, index) => {
    section.addEventListener("focus", () => {
        if (index > currentBox) {
            gsap.to(".menu-section", { left: "-25%", duration: 0.9, ease: "circ" });
        } else if (index < currentBox) {
            gsap.to(".menu-section", { left: "1.18vh", duration: 0.9, ease: "circ" });
        }

        goToBox(index);
    });
});
