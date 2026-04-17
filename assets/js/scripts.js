/*!
* Start Bootstrap - Grayscale v7.0.6
*/

window.addEventListener('DOMContentLoaded', event => {

    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }

        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    const setActiveLink = function () {
        const navLinks = document.querySelectorAll('#mainNav .nav-link');
        const sections = [
            document.querySelector('#about'),
            document.querySelector('#projects'),
            document.querySelector('#contact')
        ].filter(Boolean);

        if (!navLinks.length || !sections.length) {
            return;
        }

        let currentId = '';
        const triggerPoint = window.scrollY + 180;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (triggerPoint >= top && triggerPoint < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };

    navbarShrink();
    setActiveLink();

    document.addEventListener('scroll', () => {
        navbarShrink();
        setActiveLink();
    });

    const navLinks = document.querySelectorAll('#mainNav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (!href || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            const targetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        });
    });

    const lanzahHero = document.querySelector('#lanzahHero');
    if (lanzahHero) {
        const panels = Array.from(lanzahHero.querySelectorAll('.lanzah-hero-panel'));
        const dots = Array.from(lanzahHero.querySelectorAll('.lanzah-hero-dots button'));
        const arrows = Array.from(lanzahHero.querySelectorAll('.lanzah-hero-arrow'));
        let activeIndex = panels.findIndex(panel => panel.classList.contains('is-active'));
        let intervalId = null;
        let transitionTimeout = null;

        const syncDots = () => {
            dots.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === activeIndex);
            });
        };

        const goToSlide = (nextIndex) => {
            if (nextIndex === activeIndex) return;
            const currentPanel = panels[activeIndex];
            const nextPanel = panels[nextIndex];

            if (!currentPanel || !nextPanel) return;

            lanzahHero.classList.add('is-transitioning');
            currentPanel.classList.add('is-exiting');
            nextPanel.classList.add('is-entering');

            window.clearTimeout(transitionTimeout);
            transitionTimeout = window.setTimeout(() => {
                currentPanel.classList.remove('is-active', 'is-exiting');
                nextPanel.classList.remove('is-entering');
                nextPanel.classList.add('is-active');
                activeIndex = nextIndex;
                syncDots();
                lanzahHero.classList.remove('is-transitioning');
            }, 700);
        };

        const nextSlide = () => goToSlide((activeIndex + 1) % panels.length);
        const prevSlide = () => goToSlide((activeIndex - 1 + panels.length) % panels.length);

        const restartAutoPlay = () => {
            window.clearInterval(intervalId);
            const delay = Number(panels[activeIndex]?.dataset.delay || 5000);
            intervalId = window.setInterval(nextSlide, delay);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                restartAutoPlay();
            });
        });

        arrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                if (arrow.dataset.direction === 'prev') prevSlide();
                else nextSlide();
                restartAutoPlay();
            });
        });

        syncDots();
        restartAutoPlay();
    }
});

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "block";
    }
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
    }
}

function openInstagram() {
    const appLink = "instagram://user?username=lanzahenterprise";
    const webLink = "https://www.instagram.com/lanzahenterprise/";

    window.location.href = appLink;

    setTimeout(function () {
        window.open(webLink, "_blank");
    }, 1500);
}

function openFacebook() {
    const appLink = "fb://profile/61574511929980";
    const webLink = "https://www.facebook.com/profile.php?id=61574511929980";

    window.location.href = appLink;

    setTimeout(function () {
        window.open(webLink, "_blank");
    }, 1500);
}
