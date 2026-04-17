/*!
* Start Bootstrap - Grayscale v7.0.6
*/

window.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('#mainNav');
    const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-link'));
    const sections = ['about', 'projects', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const navbarShrink = () => {
        if (!navbar) return;
        navbar.classList.toggle('navbar-shrink', window.scrollY > 40);
    };

    const setActiveLink = () => {
        if (!sections.length || !navLinks.length) return;

        const triggerPoint = window.scrollY + 180;
        let currentId = sections[0]?.id || '';

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (triggerPoint >= top && triggerPoint < bottom) {
                currentId = section.id;
            }
        });

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
            currentId = sections[sections.length - 1].id;
        }

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${currentId}`;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    };

    const goToSection = (target) => {
        const y = target.getBoundingClientRect().top + window.pageYOffset - 110;
        document.body.classList.add('page-fade-out');

        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });

        window.setTimeout(() => {
            document.body.classList.remove('page-fade-out');
        }, 420);
    };

    navbarShrink();
    setActiveLink();

    document.addEventListener('scroll', () => {
        navbarShrink();
        setActiveLink();
    }, { passive: true });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            goToSection(target);
        });
    });
});

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
    }
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
}

function openInstagram() {
    const appLink = 'instagram://user?username=lanzahenterprise';
    const webLink = 'https://www.instagram.com/lanzahenterprise/';

    window.location.href = appLink;

    setTimeout(() => {
        window.open(webLink, '_blank');
    }, 1500);
}

function openFacebook() {
    const appLink = 'fb://profile/61574511929980';
    const webLink = 'https://www.facebook.com/profile.php?id=61574511929980';

    window.location.href = appLink;

    setTimeout(() => {
        window.open(webLink, '_blank');
    }, 1500);
}
