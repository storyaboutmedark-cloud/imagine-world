/* =========================================================
   IMAGINE WORLD — CLEAN JAVASCRIPT
========================================================= */

/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const navigationLinks = document.querySelectorAll(
    '.navbar nav a[href^="#"]'
);

navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        navbar.style.background = "rgba(4,5,10,.90)";
        navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,.30)";
    } else {
        navbar.style.background = "rgba(5,6,10,.55)";
        navbar.style.boxShadow = "none";
    }
});

/* =========================================================
   MAGICAL PARTICLES
========================================================= */

const particleContainer =
    document.getElementById("magicParticles");

function createMagicParticles() {
    if (!particleContainer) return;

    const particleCount =
        window.innerWidth < 700 ? 35 : 70;

    for (let i = 0; i < particleCount; i += 1) {
        const particle = document.createElement("span");
        particle.className = "magic-particle";

        const size = Math.random() * 3 + 1;

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${100 + Math.random() * 20}%`;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.animationDuration =
            `${5 + Math.random() * 9}s`;

        particle.style.animationDelay =
            `${Math.random() * 8}s`;

        particle.style.setProperty(
            "--drift-x",
            `${Math.random() * 180 - 90}px`
        );

        particleContainer.appendChild(particle);
    }
}

createMagicParticles();

/* =========================================================
   CINEMATIC REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

revealElements.forEach((element, index) => {
    element.style.transitionDelay =
        `${Math.min(index * 60, 240)}ms`;

    revealObserver.observe(element);
});

/* =========================================================
   HERO PARALLAX
========================================================= */

const hero =
    document.querySelector(".hero");

const heroBackground =
    document.querySelector(".hero-background");

if (
    hero &&
    heroBackground &&
    window.matchMedia("(pointer:fine)").matches
) {
    hero.addEventListener("mousemove", (event) => {
        const x =
            (event.clientX / window.innerWidth - 0.5) * 12;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 10;

        heroBackground.style.transform =
            `scale(1.08) translate(${x}px,${y}px)`;
    });

    hero.addEventListener("mouseleave", () => {
        heroBackground.style.transform =
            "scale(1.05) translate(0,0)";
    });
}

/* =========================================================
   BUTTON RIPPLE
========================================================= */

const buttons =
    document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";
        ripple.style.width = "10px";
        ripple.style.height = "10px";
        ripple.style.borderRadius = "50%";
        ripple.style.background =
            "rgba(255,255,255,.45)";
        ripple.style.left =
            `${event.offsetX}px`;
        ripple.style.top =
            `${event.offsetY}px`;
        ripple.style.transform =
            "translate(-50%,-50%)";
        ripple.style.pointerEvents = "none";
        ripple.style.animation =
            "buttonRipple .7s ease-out forwards";

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 700);
    });
});

const rippleStyle =
    document.createElement("style");

rippleStyle.textContent = `
@keyframes buttonRipple {
    0% {
        width: 10px;
        height: 10px;
        opacity: .8;
    }
    100% {
        width: 350px;
        height: 350px;
        opacity: 0;
    }
}
`;

document.head.appendChild(rippleStyle);

/* =========================================================
   VIDEO LIGHTBOX
========================================================= */

const watchVideo =
    document.getElementById("watchVideo");

const videoLightbox =
    document.getElementById("videoLightbox");

const videoClose =
    document.getElementById("videoClose");

const showcaseVideo =
    document.getElementById("showcaseVideo");

function closeVideoLightbox() {
    if (!videoLightbox) return;

    videoLightbox.classList.remove("active");
    videoLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (showcaseVideo) {
        showcaseVideo.pause();
        showcaseVideo.currentTime = 0;
    }
}

if (
    watchVideo &&
    videoLightbox &&
    showcaseVideo
) {
    watchVideo.addEventListener("click", (event) => {
        event.preventDefault();

        videoLightbox.classList.add("active");
        videoLightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");

        const playPromise =
            showcaseVideo.play();

        if (playPromise) {
            playPromise.catch(() => {});
        }
    });
}

if (videoClose) {
    videoClose.addEventListener(
        "click",
        closeVideoLightbox
    );
}

if (videoLightbox) {
    videoLightbox.addEventListener("click", (event) => {
        if (
            event.target === videoLightbox ||
            event.target.classList.contains("video-backdrop")
        ) {
            closeVideoLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        videoLightbox?.classList.contains("active")
    ) {
        closeVideoLightbox();
    }
});

/* =========================================================
   WHATSAPP CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name =
            document.getElementById("visitorName")
                .value.trim();

        const email =
            document.getElementById("visitorEmail")
                .value.trim();

        const service =
            document.getElementById("requestedService")
                .value;

        const message =
            document.getElementById("visitorMessage")
                .value.trim();

        formStatus.textContent = "";
        formStatus.className = "form-status";

        if (!name || !email || !service || !message) {
            formStatus.textContent =
                "Please complete all fields.";
            formStatus.classList.add("error");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formStatus.textContent =
                "Please enter a valid email address.";
            formStatus.classList.add("error");
            return;
        }

        const whatsappMessage =
`Hello Shiva,

My name is: ${name}

My email is: ${email}

I need: ${service}

My idea:
${message}

I found Imagine World through your website.`;

        const whatsappNumber = "919369725219";

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=` +
            encodeURIComponent(whatsappMessage);

        formStatus.textContent =
            "Opening WhatsApp...";

        formStatus.classList.add("success");

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    });
}

/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNav =
    document.getElementById("mainNav");

function closeMobileMenu() {
    if (!mobileMenuButton || !mainNav) return;

    mainNav.classList.remove("mobile-open");
    mobileMenuButton.classList.remove("menu-open");
    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );
    mobileMenuButton.setAttribute(
        "aria-label",
        "Open menu"
    );
    document.body.classList.remove("menu-lock");
}

if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen =
            mainNav.classList.toggle("mobile-open");

        mobileMenuButton.classList.toggle(
            "menu-open",
            isOpen
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        document.body.classList.toggle(
            "menu-lock",
            isOpen
        );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener(
            "click",
            closeMobileMenu
        );
    });
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        mainNav?.classList.contains("mobile-open")
    ) {
        closeMobileMenu();
    }
});

console.log("✨ Imagine World is ready.");
