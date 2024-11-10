import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const firstStageText = (text) => {
    const textContainer = document.querySelector(".statement-section__container");
    textContainer.innerHTML = null;

    // creating text wrappers
    const primaryTextWrapper = document.createElement("div");
    primaryTextWrapper.className = "statement-section__statement-wrapper";
    const secondaryTextWrapperFirst = primaryTextWrapper.cloneNode(false);
    const secondaryTextWrapperSecond = primaryTextWrapper.cloneNode(false);

    // creating primary text element
    const primaryTextElement = document.createElement("h1");
    primaryTextElement.classList.add("statement-section__primary-text-h1");
    text.split("").forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("statement-section__letter");
        if (letter === " ") span.classList.add("statement-section__letter__empty");
        primaryTextElement.appendChild(span);
    });
    primaryTextWrapper.appendChild(primaryTextElement);

    // creating secondary text elements
    const secondaryTextElementFirst = document.createElement("h1");
    secondaryTextElementFirst.textContent = text;
    secondaryTextElementFirst.classList.add("statement-section__secondary-text-h1");

    const secondaryTextElementSecond = secondaryTextElementFirst.cloneNode(true);

    secondaryTextElementFirst.classList.add("statement-section__secondary-text-h1-animate-first");
    secondaryTextElementSecond.classList.add("statement-section__secondary-text-h1-animate-second");

    secondaryTextWrapperFirst.appendChild(secondaryTextElementFirst);
    secondaryTextWrapperSecond.appendChild(secondaryTextElementSecond);

    // creating lines
    const primaryLine = document.createElement("hr");
    primaryLine.classList.add("statement-section__statement-primary-line");
    // const secondaryLineFirst = document.createElement("hr");
    // secondaryLineFirst.classList.add("statement-section__statement-secondary-line");
    // const secondaryLineSecond = secondaryLineFirst.cloneNode(false);

    // secondaryLineFirst.classList.add("statement-section__statement-secondary-line-animate-first");
    // secondaryLineSecond.classList.add("statement-section__statement-secondary-line-animate-second");

    primaryTextWrapper.appendChild(primaryLine);
    // secondaryTextWrapperFirst.appendChild(secondaryLineFirst);
    // secondaryTextWrapperSecond.appendChild(secondaryLineSecond);

    textContainer.appendChild(secondaryTextWrapperSecond);
    textContainer.appendChild(secondaryTextWrapperFirst);
    textContainer.appendChild(primaryTextWrapper);
    textContainer.appendChild(secondaryTextWrapperFirst.cloneNode(true));
    textContainer.appendChild(secondaryTextWrapperSecond.cloneNode(true));
};

const firstStageTimeline = () => {
    const tl = gsap.timeline();

    tl.to(".statement-section__letter", { duration: 0.8, y: 0, stagger: 0.05 })
        .to(".statement-section__secondary-text-h1-animate-first", { duration: 0.5, opacity: 1 })
        .to(".statement-section__secondary-text-h1-animate-second", { duration: 0.5, opacity: 1 })
        .to(".statement-section__statement-primary-line", { duration: 0.5, width: "112%" })
        .to(".statement-section__letter", { duration: 0.2, color: "#ff0000" })
        // .to(".statement-section__statement-secondary-line-animate-first", { duration: 0.3, width: "112%" })
        .to(".statement-section__secondary-text-h1-animate-first", {
            duration: 0.2,
            css: {
                "-webkit-text-stroke-color": "#ff0000",
            },
        })
        // .to(".statement-section__statement-secondary-line-animate-second", { duration: 0.3, width: "112%" })
        .to(".statement-section__secondary-text-h1-animate-second", {
            duration: 0.2,
            css: {
                "-webkit-text-stroke-color": "#ff0000",
            },
        })
        .to(
            ".statement-section__letter, .statement-section__statement-primary-line, .statement-section__secondary-text-h1-animate-first, .statement-section__secondary-text-h1-animate-second ",
            { duration: 0.5, opacity: 0 }
        );
    // .to(
    //     ".statement-section__letter, .statement-section__statement-primary-line, .statement-section__secondary-text-h1-animate-first, .statement-section__statement-secondary-line-animate-first, .statement-section__secondary-text-h1-animate-second, .statement-section__statement-secondary-line-animate-second ",
    //     { duration: 0.5, opacity: 0 }
    // );
    return tl;
};

firstStageText("We're just like the others");

const statementsAnimationTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".statement-section",
        horizontal: true,
        start: "left 70%",
        end: "left 0", // ????????
        // markers: true,
        scroller: ".main",
    },
    // scrollTrigger: {
    //     trigger: ".statement-section",
    //     horizontal: true,
    //     start: "left 20%",
    //     end: "left 0", // ????????
    //     // markers: true,
    //     scroller: ".hero-section",
    //  scrub:true - прогрес анімації пов'язаний зі скролом
    // },
});

statementsAnimationTimeline
    .add(firstStageTimeline())
    .call(() => {
        firstStageTimeline().revert();
        gsap.delayedCall(0.1, () => {
            firstStageTimeline().restart();
        });
    })
    .call(() => firstStageText("Cars are just metal, right?"))
    .add(firstStageTimeline());

// smoothing scrolling
const lenis = new Lenis();

lenis.on("scroll", (e) => {
    console.log(e);
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
