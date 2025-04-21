import { gsap } from "gsap";

const singleAnimDuration = 20;
const intersectionDuration = 0.8525 * singleAnimDuration;

// total duration = (0.076 + 0.113 + 0.235 + 0.148 + 1) * singleAnimDuration = 31.44
const animTotalDuration = 31.44;

const tl1 = gsap
    .timeline({
        defaults: {
            duration: singleAnimDuration,
            ease: "linear",
        },
        repeat: -1,
        // repeatDelay: animTotalDuration - 2 * intersectionDuration,
    })
    .fromTo(".gallery-section__photo--11", { top: "101%" }, { top: "-100%" })
    .fromTo(".gallery-section__photo--21", { top: "101%" }, { top: "-100%" }, "<7.6%")
    .fromTo(".gallery-section__photo--31", { top: "101%" }, { top: "-100%" }, "<11.3%")
    .fromTo(".gallery-section__photo--41", { top: "101%" }, { top: "-100%" }, "<23.5%")
    .fromTo(".gallery-section__photo--51", { top: "101%" }, { top: "-100%" }, "<14.8%");

tl1.play();

const tl2 = gsap
    .timeline({
        defaults: {
            duration: singleAnimDuration,
            ease: "linear",
        },
        repeat: -1,
        // repeatDelay: animTotalDuration - 2 * intersectionDuration,
        delay: animTotalDuration - intersectionDuration,
    })
    .fromTo(".gallery-section__photo--12", { top: "101%" }, { top: "-100%" })
    .fromTo(".gallery-section__photo--22", { top: "101%" }, { top: "-100%" }, "<7.6%")
    .fromTo(".gallery-section__photo--32", { top: "101%" }, { top: "-100%" }, "<11.3%")
    .fromTo(".gallery-section__photo--42", { top: "101%" }, { top: "-100%" }, "<23.5%")
    .fromTo(".gallery-section__photo--52", { top: "101%" }, { top: "-100%" }, "<14.8%");

tl2.play();
