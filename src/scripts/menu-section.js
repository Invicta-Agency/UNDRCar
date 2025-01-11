import lottie from "lottie-web";
import { gsap } from "gsap";

const blackColor = getComputedStyle(document.documentElement).getPropertyValue("--black-color").trim();

export let menuIsShown = false;

const lottieMenuIcon = lottie.loadAnimation({
    container: document.getElementById("menu-icon"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "/UNDRCar/assets/animated-icons/menu-icon.json",
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        progressiveLoad: true,
    },
});

document
    .querySelectorAll(
        ".menu-section, .menu-section__contacts-icon, .menu-section__menu-buttons, .menu-section__navigation-links-wrapper, .menu-section__contacts-warapper, .menu-section__navigation-link"
    )
    .forEach((el) => {
        el.style.willChange = "transform, opacity, height, padding";
    });

const menuTimeline = gsap.timeline({
    paused: true,
});

menuTimeline
    .call(() => {
        lottieMenuIcon.play();
        menuIsShown = !menuIsShown;
    })
    .to(
        ".menu-section",
        {
            right: "1.18vh",
            maxWidth: "100vw",
            backgroundColor: blackColor,
            paddingLeft: "2.94vh",
            paddingRight: "2.94vh",
            duration: 1,
        },
        "<"
    )
    .to(
        ".menu-section__contacts-icon",
        {
            scaleY: 0,
            stagger: 0.1,
            duration: 0.3,
        },
        "<"
    )
    .to(".menu-section__contacts-icon", { display: "none" })
    .to(".menu-section__menu-buttons", { height: "auto" }, "<")
    .to(".menu-section", { paddingBottom: "2.94vh" }, "<")
    .to(".menu-section__navigation-links-wrapper", { display: "flex" })
    .to(".menu-section__contacts-wrapper", { display: "flex" }, "<")
    .to(".menu-section__navigation-link", { scaleY: 1, stagger: 0.1, duration: 0.3 })
    .to(".menu-section__contacts-wrapper", { scaleY: 1, stagger: 0.1, duration: 0.3 });

const menuBtnOnClickHandler = () => {
    requestAnimationFrame(() => {
        menuIsShown ? menuTimeline.reverse() : menuTimeline.play();
        lottieMenuIcon.setDirection(menuIsShown ? -1 : 1);
    });
};

// Debounce the event listener
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

document.querySelector(".menu-section__menu-icon").addEventListener("click", debounce(menuBtnOnClickHandler, 100));
document.querySelector(".menu-section__menu-icon").addEventListener(
    "keydown",
    debounce((e) => {
        if (e.key === "Enter") menuBtnOnClickHandler();
    }, 100)
);
