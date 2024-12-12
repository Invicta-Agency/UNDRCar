import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim();

const firstStageText = (text, blackLetters) => {
    const textContainer = document.querySelector(".statement-section__container");
    textContainer.innerHTML = null;

    // creating text wrappers
    const primaryTextWrapper = document.createElement("div");
    primaryTextWrapper.className = "statement-section__statement-wrapper";
    const secondaryTextWrapperFirst = primaryTextWrapper.cloneNode(false);
    const secondaryTextWrapperSecond = primaryTextWrapper.cloneNode(false);

    // creating primary text element
    const primaryTextElement = document.createElement("h1");
    primaryTextElement.classList.add(
        "statement-section__primary-text-h1",
        blackLetters ? "statement-section__black-letters" : "b"
    );
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

    secondaryTextElementFirst.classList.add(
        "statement-section__secondary-text-h1-animate-first",
        blackLetters ? "statement-section__black-stroke" : "b"
    );
    secondaryTextElementSecond.classList.add(
        "statement-section__secondary-text-h1-animate-second",
        blackLetters ? "statement-section__gray-stroke" : "b"
    );

    secondaryTextWrapperFirst.appendChild(secondaryTextElementFirst);
    secondaryTextWrapperSecond.appendChild(secondaryTextElementSecond);

    // creating lines
    const primaryLine = document.createElement("hr");
    primaryLine.classList.add("statement-section__statement-primary-line");

    primaryTextWrapper.appendChild(primaryLine);

    textContainer.appendChild(secondaryTextWrapperSecond);
    textContainer.appendChild(secondaryTextWrapperFirst);
    textContainer.appendChild(primaryTextWrapper);
    textContainer.appendChild(secondaryTextWrapperFirst.cloneNode(true));
    textContainer.appendChild(secondaryTextWrapperSecond.cloneNode(true));
};

const secondStageTextWords = (text) => {
    const textContainer = document.querySelector(".statement-section__container");
    textContainer.innerHTML = null;

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("statement-section__text-wrapper");

    text.split(" ").forEach((word) => {
        const wordWrapper = document.createElement("div");
        wordWrapper.classList.add("statement-section__word-wrapper");

        const wordElement = document.createElement("h3");
        wordElement.classList.add("statement-section__text-h3");
        wordElement.textContent = word;

        wordWrapper.appendChild(wordElement);
        textWrapper.appendChild(wordWrapper);
    });

    textContainer.appendChild(textWrapper);
};

const firstStageTimeline = () => {
    const tl = gsap.timeline();

    tl.to(".statement-section__letter", { duration: 0.6, y: 0, stagger: 0.05 })
        .to(".statement-section__secondary-text-h1-animate-first", { duration: 0.5, opacity: 1 })
        .to(".statement-section__secondary-text-h1-animate-second", { duration: 0.5, opacity: 1 })
        .to(".statement-section__statement-primary-line", { duration: 0.5, width: "112%" })
        .to(".statement-section__letter", { duration: 0.2, color: "#ff0000" })
        .to(".statement-section__secondary-text-h1-animate-first", {
            duration: 0.2,
            css: {
                "-webkit-text-stroke-color": "#ff0000",
            },
        })
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
    return tl;
};

const secondStageTimeline = () => {
    const tl = gsap.timeline();

    tl.to(".statement-section", { backgroundColor: accentColor, duration: 0.3 })
        .to(".statement-section__letter", {
            duration: 0.6,
            y: 0,
            stagger: 0.05,
        })
        .to(".statement-section__secondary-text-h1-animate-first", { duration: 0.5, opacity: 1 })
        .to(".statement-section__secondary-text-h1-animate-second", { duration: 0.5, opacity: 1 })
        .to(
            ".statement-section__letter, .statement-section__statement-primary-line, .statement-section__secondary-text-h1-animate-first, .statement-section__secondary-text-h1-animate-second ",
            { duration: 0.5, opacity: 0 }
        );

    return tl;
};
const thirdStageTimeline = () => {
    const tl = gsap.timeline();

    tl.to(".statement-section__text-h3", {
        duration: 0.4,
        y: 0,
        stagger: 0.2,
    }).to(".statement-section__text-h3", {
        duration: 4,
        opacity: 1,
        delay: 4,
    });

    return tl;
};

const finalTimeline = () => {
    const tl = gsap.timeline();
    tl.to(".statement-section__text-h3", { duration: 0.4, opacity: 1, y: 0, stagger: 0.2 });

    return tl;
};
firstStageText("We're just like the others", false);

const statementsAnimationTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".statement-section",
        horizontal: true,
        start: "left 70%",
        end: "left 0", // ????????
        // markers: true,
        scroller: ".main",
    },
});

statementsAnimationTimeline
    .add(firstStageTimeline())
    .call(() => firstStageText("Cars are just metal, right?", false))
    .call(() => {
        firstStageTimeline().revert();
        gsap.delayedCall(0.1, () => {
            firstStageTimeline().restart();
        });
    })
    .add(firstStageTimeline())
    .call(() => firstStageText("But in reality", true))

    .call(() => {
        firstStageTimeline().revert();
        gsap.delayedCall(0.1, () => {
            secondStageTimeline();
        });
    })
    .add(secondStageTimeline())
    .call(() =>
        secondStageTextWords(
            "we don’t just fix cars, we craft experiences. Each vehicle is a unique puzzle, and our passion lies in solving it with skill and creativity."
        )
    )
    .call(() => {
        secondStageTimeline().revert();
        gsap.delayedCall(0.1, () => {
            thirdStageTimeline();
        });
    })
    .add(thirdStageTimeline())
    .call(() =>
        secondStageTextWords(
            "We dive deep into every detail, ensuring your car performs at its best. Every repair is an opportunity to unlock its full potential."
        )
    )
    .call(() => {
        thirdStageTimeline().revert();
        gsap.delayedCall(0.1, () => {
            thirdStageTimeline().restart();
        });
    })
    .add(thirdStageTimeline())
    .call(() =>
        secondStageTextWords(
            "Your journey is our priority. With us, expect more than a quick fix — enjoy a smoother, more exhilarating ride every time you hit the road."
        )
    )
    .call(() => {
        thirdStageTimeline().revert();
        gsap.delayedCall(0.1, () => {
            finalTimeline();
        });
    })
    .add(finalTimeline());

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
