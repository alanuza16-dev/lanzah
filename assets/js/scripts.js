/*!
* Lanzah Hero + Navbar
*/

window.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('#mainNav');
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    const sections = [
        document.querySelector('#about'),
        document.querySelector('#projects'),
        document.querySelector('#contact')
    ].filter(Boolean);

    const navbarShrink = () => {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    };

    const setActiveLink = () => {
        if (!sections.length || !navLinks.length) return;

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

    /* HERO SLIDER */
    const hero = document.querySelector('#lanzahHero');
    if (hero) {
        const panels = hero.querySelectorAll('.lanzah-hero-panel');
        const dots = hero.querySelectorAll('.lanzah-hero-dots button');
        const prevBtn = hero.querySelector('.lanzah-hero-arrow[data-direction="prev"]');
        const nextBtn = hero.querySelector('.lanzah-hero-arrow[data-direction="next"]');

        let current = 0;
        let intervalId = null;

        const showSlide = (index) => {
            panels.forEach((panel, i) => {
                panel.classList.toggle('is-active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === index);
            });

            current = index;
        };

        const nextSlide = () => {
            const next = (current + 1) % panels.length;
            showSlide(next);
        };

        const prevSlide = () => {
            const prev = (current - 1 + panels.length) % panels.length;
            showSlide(prev);
        };

        const startAutoplay = () => {
            stopAutoplay();
            intervalId = setInterval(nextSlide, 5000);
        };

        const stopAutoplay = () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoplay();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoplay();
            });
        });

        showSlide(0);
        startAutoplay();
    }
});

let _modalOpener = null;

function _trapFocus(modal) {
    const focusable = modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    modal._trapHandler = (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    };
    document.addEventListener('keydown', modal._trapHandler);
}

function _releaseFocus(modal) {
    if (modal._trapHandler) {
        document.removeEventListener('keydown', modal._trapHandler);
        modal._trapHandler = null;
    }
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    _modalOpener = document.activeElement;
    modal.style.display = "flex";
    modal.classList.remove('modal--closing');
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) closeBtn.focus();
    _trapFocus(modal);
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('modal--open');
    modal.classList.add('modal--closing');
    modal.setAttribute('aria-hidden', 'true');
    _releaseFocus(modal);
    if (_modalOpener && typeof _modalOpener.focus === 'function') {
        _modalOpener.focus();
        _modalOpener = null;
    }
    modal.addEventListener('animationend', function handler() {
        modal.style.display = 'none';
        modal.classList.remove('modal--closing');
        modal.removeEventListener('animationend', handler);
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'flex') cerrarModal(modal.id);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModal(modal.id);
        });
    });

    document.querySelectorAll('.item[role="button"]').forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
});

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

/* =========================================
   LANZAH HERO GALAXY — Realistic Full-Screen
   ========================================= */
(function initHeroGalaxy() {
    const canvas = document.getElementById('lanzahHeroGalaxy');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, cx, cy, stars = [], shooting = [], planets = [];
    let t = 0, tabVisible = true, resizeTimer;

    // Lanzah star color palette
    const STAR_COLORS = [
        [235,248,255], [200,235,255], [170,215,255],
        [120,195,247], [0,200,230],   [0,170,210],
    ];

    const rnd = (a, b) => a + Math.random() * (b - a);

    // ---- STARS ----
    function initStars() {
        const count = W > 1400 ? 4000 : W > 800 ? 2600 : 1400;
        stars = [];
        const coreR = Math.min(W, H) * 0.14;

        // Core cluster
        for (let i = 0; i < count * 0.18; i++) {
            const r = Math.pow(Math.random(), 1.5) * coreR;
            const a = rnd(0, Math.PI * 2);
            stars.push(makeStar(cx + r*Math.cos(a), cy + r*0.5*Math.sin(a), 'core'));
        }
        // Two logarithmic spiral arms
        for (let arm = 0; arm < 2; arm++) {
            for (let i = 0; i < count * 0.30; i++) {
                const th = rnd(0.3, Math.PI * 3.5);
                const r  = coreR * 0.28 * Math.exp(0.22 * th);
                const sc = r * rnd(0.18, 0.42);
                const angle = th + arm * Math.PI + rnd(-0.08, 0.08);
                stars.push(makeStar(cx + (r + rnd(-sc,sc)) * Math.cos(angle),
                                    cy + (r * 0.48 + rnd(-sc*0.5,sc*0.5)) * Math.sin(angle), 'arm'));
            }
        }
        // Background/halo
        for (let i = 0; i < count * 0.22; i++) {
            stars.push(makeStar(rnd(0, W), rnd(0, H), 'halo'));
        }
    }

    function makeStar(x, y, type) {
        const bright = Math.random();
        const isBright = bright > 0.94;
        const c = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        return {
            x: Math.max(0, Math.min(W, x)), y: Math.max(0, Math.min(H, y)),
            r: type === 'core'  ? rnd(0.3, 2.8) :
               type === 'arm'   ? (isBright ? rnd(1.2, 2.6) : rnd(0.2, 1.4)) :
                                  rnd(0.15, 0.9),
            al: type === 'halo' ? rnd(0.08, 0.35) : rnd(0.3, 0.9),
            c,
            tw: rnd(0, Math.PI*2),
            ts: rnd(0.002, 0.012),
            flare: isBright && type !== 'halo',
        };
    }

    // ---- PLANETS ----
    function initPlanets() {
        planets = [
            // Gas giant right side with rings
            { x: W*0.82, y: H*0.28, r: Math.min(W,H)*0.065,
              col:[12,60,120], hi:[80,190,255], ring:true, ringTilt:0.28,
              atm:[0,200,255], speed:0.00025, drift:0 },
            // Medium planet left
            { x: W*0.12, y: H*0.60, r: Math.min(W,H)*0.038,
              col:[8,40,100], hi:[40,160,230], ring:false,
              atm:[30,180,255], speed:0.0004, drift:Math.PI },
            // Small distant planet top-center
            { x: W*0.50, y: H*0.10, r: Math.min(W,H)*0.022,
              col:[0,80,160], hi:[60,210,250], ring:false,
              atm:[0,229,255], speed:0.0006, drift:Math.PI*0.5 },
        ];
    }

    // ---- DRAW BACKGROUND ----
    function drawBg() {
        ctx.fillStyle = '#010a18';
        ctx.fillRect(0, 0, W, H);
    }

    // ---- NEBULAE ----
    const NEB = [
        [.50,.48,.52,.32,'30,160,220',.055],[.52,.50,.38,.22,'0,210,240',.045],
        [.40,.42,.28,.18,'0,100,180', .060],[.62,.55,.25,.16,'0,180,220',.040],
        [.30,.55,.22,.14,'15,80,160', .050],[.72,.38,.20,.13,'0,229,255',.035],
        [.20,.35,.18,.11,'20,120,200',.040],[.55,.65,.16,.10,'0,150,200',.030],
        [.45,.30,.14,.09,'60,190,255',.025],[.65,.70,.13,.08,'0,80,140', .030],
    ];
    function drawNebulae() {
        NEB.forEach(([bx,by,rx,ry,c,a]) => {
            const gx=W*bx, gy=H*by, g=ctx.createRadialGradient(gx,gy,0,gx,gy,W*rx);
            g.addColorStop(0,`rgba(${c},${a})`); g.addColorStop(.5,`rgba(${c},${a*.4})`); g.addColorStop(1,'transparent');
            ctx.save(); ctx.scale(1,ry/rx); ctx.fillStyle=g; ctx.fillRect(0,0,W,H*(rx/ry)*2); ctx.restore();
        });
    }

    // ---- GALACTIC CORE ----
    function drawGalacticCore() {
        const pulse = 1 + 0.04*Math.sin(t*1.4);
        const cR = Math.min(W,H) * 0.13 * pulse;
        [[cR*3.5,'rgba(0,80,140,0.12)'],[cR*2.2,'rgba(0,140,200,0.18)'],
         [cR*1.2,'rgba(0,200,240,0.30)'],[cR*0.5,'rgba(150,230,255,0.55)'],
         [cR*0.15,'rgba(255,255,255,0.90)']
        ].forEach(([r,col]) => {
            const g = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
            g.addColorStop(0, col); g.addColorStop(1, 'transparent');
            ctx.fillStyle=g;
            ctx.save(); ctx.scale(1, 0.48);
            ctx.beginPath(); ctx.arc(cx, cy/0.48, r, 0, Math.PI*2);
            ctx.fill(); ctx.restore();
        });
        // Star-point spike cross
        ctx.save();
        ctx.globalAlpha = 0.18 + 0.06*Math.sin(t*2);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1.2;
        [[W*0.10,0],[W*0.06,Math.PI/4]].forEach(([len, rot]) => {
            ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot);
            ctx.beginPath(); ctx.moveTo(-len,0); ctx.lineTo(len,0); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0,-len*0.6); ctx.lineTo(0,len*0.6); ctx.stroke();
            ctx.restore();
        });
        ctx.restore();
    }

    // ---- STARS ----
    function drawStars() {
        stars.forEach(s => {
            s.tw += s.ts;
            const a = s.al * (0.60 + 0.40*Math.sin(s.tw));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${a.toFixed(2)})`;
            ctx.fill();
            if (s.flare) {
                ctx.save();
                ctx.globalAlpha = a * 0.35;
                ctx.strokeStyle = `rgb(${s.c[0]},${s.c[1]},${s.c[2]})`;
                ctx.lineWidth = 0.6;
                const len = s.r * 4;
                ctx.beginPath(); ctx.moveTo(s.x-len,s.y); ctx.lineTo(s.x+len,s.y); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(s.x,s.y-len); ctx.lineTo(s.x,s.y+len); ctx.stroke();
                ctx.restore();
            }
        });
    }

    // ---- PLANETS ----
    function drawPlanet(p) {
        const r = p.r;
        const px = p.x, py = p.y;

        // Atmosphere halo
        const atm = ctx.createRadialGradient(px,py,r*0.85,px,py,r*1.55);
        atm.addColorStop(0, `rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},0.22)`);
        atm.addColorStop(1, 'transparent');
        ctx.fillStyle=atm; ctx.beginPath(); ctx.arc(px,py,r*1.55,0,Math.PI*2); ctx.fill();

        // Rings behind planet
        if (p.ring) {
            ctx.save(); ctx.translate(px,py); ctx.rotate(-p.ringTilt);
            for (let i=3; i>=1; i--) {
                ctx.beginPath(); ctx.ellipse(0,0,r*(1.55+i*0.28),r*(0.28+i*0.06),0,0,Math.PI*2);
                ctx.strokeStyle=`rgba(0,200,240,${0.10+i*0.08})`; ctx.lineWidth=r*0.10+i*r*0.04; ctx.stroke();
            }
            ctx.restore();
        }

        // Planet sphere with directional light (light from top-right)
        const lg = ctx.createRadialGradient(px+r*0.38, py-r*0.38, 0, px, py, r);
        lg.addColorStop(0, `rgb(${p.hi[0]},${p.hi[1]},${p.hi[2]})`);
        lg.addColorStop(0.4,`rgb(${Math.round(p.hi[0]*0.5+p.col[0]*0.5)},${Math.round(p.hi[1]*0.5+p.col[1]*0.5)},${Math.round(p.hi[2]*0.5+p.col[2]*0.5)})`);
        lg.addColorStop(1, `rgb(${p.col[0]},${p.col[1]},${p.col[2]})`);
        ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2); ctx.fillStyle=lg; ctx.fill();

        // Terminator shadow (dark crescent on opposite side of light)
        const sh = ctx.createRadialGradient(px-r*0.3,py+r*0.3,0,px,py,r);
        sh.addColorStop(0.4,'transparent'); sh.addColorStop(1,'rgba(0,5,20,0.65)');
        ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2); ctx.fillStyle=sh; ctx.fill();

        // Atmospheric rim glow
        const rim = ctx.createRadialGradient(px,py,r*0.78,px,py,r*1.05);
        rim.addColorStop(0,'transparent'); rim.addColorStop(1,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},0.32)`);
        ctx.beginPath(); ctx.arc(px,py,r*1.05,0,Math.PI*2); ctx.fillStyle=rim; ctx.fill();

        // Front ring slice (over planet)
        if (p.ring) {
            ctx.save(); ctx.translate(px,py); ctx.rotate(-p.ringTilt);
            ctx.beginPath(); ctx.ellipse(0,0,r*2.1,r*0.42,0,Math.PI,Math.PI*2);
            ctx.strokeStyle='rgba(0,200,240,0.28)'; ctx.lineWidth=r*0.18; ctx.stroke();
            ctx.restore();
        }
    }

    // ---- SHOOTING STARS ----
    function tickShootingStars() {
        if (Math.random() < 0.004 && shooting.length < 4)
            shooting.push({ x:rnd(W*.05,W*.65), y:rnd(0,H*.45), vx:rnd(4,9), vy:rnd(.4,1.6), al:1 });
        shooting = shooting.filter(s => s.al > 0);
        shooting.forEach(s => {
            const m=Math.hypot(s.vx,s.vy), nx=s.vx/m, ny=s.vy/m, len=m*12;
            const tail=ctx.createLinearGradient(s.x-nx*len,s.y-ny*len,s.x,s.y);
            tail.addColorStop(0,'transparent'); tail.addColorStop(1,`rgba(200,240,255,${s.al})`);
            ctx.strokeStyle=tail; ctx.lineWidth=1.4;
            ctx.beginPath(); ctx.moveTo(s.x-nx*len,s.y-ny*len); ctx.lineTo(s.x,s.y); ctx.stroke();
            s.x+=s.vx; s.y+=s.vy; s.al-=0.018;
        });
    }

    // ---- RESIZE ----
    function resize() {
        const stage = canvas.parentElement;
        const dpr = Math.min(window.devicePixelRatio||1, 2);
        const sw = stage.offsetWidth  || window.innerWidth;
        const sh = stage.offsetHeight || window.innerHeight;
        W = sw*dpr; H = sh*dpr;
        canvas.width=W; canvas.height=H;
        canvas.style.width=sw+'px'; canvas.style.height=sh+'px';
        cx=W/2; cy=H/2;
        initStars(); initPlanets();
    }

    // ---- FRAME LOOP ----
    function frame() {
        if (tabVisible) {
            t += 0.008;
            drawBg();
            drawNebulae();
            drawGalacticCore();
            drawStars();
            planets.forEach(drawPlanet);
            tickShootingStars();
        }
        requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange', () => { tabVisible = !document.hidden; });
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer=setTimeout(resize,150); });
    resize(); requestAnimationFrame(frame);
}());