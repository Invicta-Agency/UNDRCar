import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let cards = gsap.utils.toArray(".services-section__card");

cards.forEach((card) => {
    gsap.to(card, {
        translateX: 0,
        duration: 1,
        scale: 1,
        scrollTrigger: {
            scroller: ".services-section__cards-wrapper",
            trigger: card,
            start: "top 90%",
            end: "bottom 75%",
            scrub: true,
        },
    });
});
