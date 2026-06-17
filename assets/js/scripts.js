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

/* ================================
   LANZAH GALAXY — Canvas Animation
   ================================ */
(function initGalaxy() {
    const canvas = document.getElementById('lanzahGalaxy');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Lanzah palette: blues & cyans from the logo
    const PLANETS = [
        { a:68,  b:19, spd:0.009,  r:5,  col:'#4fc3f7', glow:'#4fc3f7', phase:0.5  },
        { a:118, b:33, spd:0.005,  r:9,  col:'#00bcd4', glow:'#00e5ff', phase:1.8, ring:true  },
        { a:180, b:50, spd:0.0028, r:13, col:'#1565c0', glow:'#4fc3f7', phase:3.1, moon:true  },
        { a:240, b:66, spd:0.0016, r:7,  col:'#26c6da', glow:'#26c6da', phase:5.0  },
    ];

    let W, H, cx, cy, sc;
    let stars = [], asteroids = [];
    let t = 0, tabVisible = true, resizeTimer;

    function hex2rgb(h) {
        return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
    }
    function lighter(hex, a) { const [r,g,b]=hex2rgb(hex); return `rgb(${Math.min(255,r+a)},${Math.min(255,g+a)},${Math.min(255,b+a)})`; }
    function darker(hex, a)  { const [r,g,b]=hex2rgb(hex); return `rgb(${Math.max(0,r-a)},${Math.max(0,g-a)},${Math.max(0,b-a)})`; }

    function initStars() {
        stars = Array.from({length:170}, () => ({
            x: Math.random()*W, y: Math.random()*H,
            r: Math.random()*1.4+0.2,
            a: Math.random()*0.6+0.2,
            tw: Math.random()*Math.PI*2,
            ts: Math.random()*0.014+0.004,
        }));
    }

    function initAsteroids() {
        asteroids = Array.from({length:55}, () => ({
            a:   148 + Math.random()*22,
            b:   40  + Math.random()*12,
            ang: Math.random()*Math.PI*2,
            spd: (0.0006+Math.random()*0.001) * (Math.random()>0.5?1:-1),
            r:   Math.random()*1.3+0.4,
            al:  Math.random()*0.4+0.12,
        }));
    }

    function resize() {
        const w   = Math.min(canvas.parentElement.offsetWidth || 480, 480);
        const dpr = Math.min(window.devicePixelRatio||1, 2);
        W = w*dpr; H = w*0.78*dpr;
        canvas.width = W; canvas.height = H;
        canvas.style.width  = w+'px';
        canvas.style.height = (w*0.78)+'px';
        cx = W/2; cy = H/2; sc = w/500;
        initStars(); initAsteroids();
    }

    function drawBg() {
        ctx.fillStyle = '#020c1b';
        ctx.fillRect(0,0,W,H);
    }

    function drawNebula() {
        [{x:.45,y:.40,r:.38,c:'41,182,246',a:.07},
         {x:.60,y:.62,r:.30,c:'0,229,255', a:.05},
         {x:.25,y:.65,r:.26,c:'21,101,192',a:.06}
        ].forEach(n => {
            const g = ctx.createRadialGradient(W*n.x,H*n.y,0,W*n.x,H*n.y,W*n.r);
            g.addColorStop(0,`rgba(${n.c},${n.a})`);
            g.addColorStop(1,'transparent');
            ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
        });
    }

    function drawStars() {
        stars.forEach(s => {
            s.tw += s.ts;
            const a = s.a*(0.55+0.45*Math.sin(s.tw));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`;
            ctx.fill();
        });
    }

    function drawOrbit(p) {
        ctx.save(); ctx.translate(cx,cy);
        ctx.beginPath();
        ctx.ellipse(0,0,p.a*sc,p.b*sc,0,0,Math.PI*2);
        ctx.strokeStyle = 'rgba(79,195,247,0.10)';
        ctx.setLineDash([2,7]); ctx.lineWidth=0.7; ctx.stroke();
        ctx.setLineDash([]); ctx.restore();
    }

    function drawAsteroids() {
        asteroids.forEach(ast => {
            ast.ang += ast.spd;
            const x = cx+Math.cos(ast.ang)*ast.a*sc;
            const y = cy+Math.sin(ast.ang)*ast.b*sc;
            ctx.beginPath(); ctx.arc(x,y,ast.r*sc,0,Math.PI*2);
            ctx.fillStyle = `rgba(79,195,247,${ast.al})`; ctx.fill();
        });
    }

    function drawCore() {
        const pulse = 0.86+0.14*Math.sin(t*1.8);
        [[55,.04],[38,.07],[24,.13]].forEach(([r,a]) => {
            const g = ctx.createRadialGradient(cx,cy,0,cx,cy,r*sc);
            g.addColorStop(0,`rgba(0,229,255,${a*pulse})`);
            g.addColorStop(1,'transparent');
            ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r*sc,0,Math.PI*2); ctx.fill();
        });
        const cg = ctx.createRadialGradient(cx-3*sc,cy-3*sc,0,cx,cy,11*sc);
        cg.addColorStop(0,'#ffffff'); cg.addColorStop(.25,'#e0f7fa');
        cg.addColorStop(.6,'#00e5ff'); cg.addColorStop(1,'#0277bd');
        ctx.beginPath(); ctx.arc(cx,cy,11*sc,0,Math.PI*2); ctx.fillStyle=cg; ctx.fill();
        ctx.save(); ctx.globalAlpha=0.20+0.08*Math.sin(t*2.5);
        ctx.strokeStyle='#00e5ff'; ctx.lineWidth=0.7*sc;
        for (const len of [22,14]) {
            ctx.beginPath(); ctx.moveTo(cx-len*sc,cy); ctx.lineTo(cx+len*sc,cy); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx,cy-len*sc); ctx.lineTo(cx,cy+len*sc); ctx.stroke();
        }
        ctx.restore();
    }

    function planetPos(p) {
        const ang = p.phase + t*p.spd;
        return { x:cx+Math.cos(ang)*p.a*sc, y:cy+Math.sin(ang)*p.b*sc };
    }

    function drawPlanet(p, pos) {
        const s = p.r*sc;
        const [gr,gg,gb] = hex2rgb(p.glow);
        const halo = ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,s*3.5);
        halo.addColorStop(0,`rgba(${gr},${gg},${gb},0.22)`); halo.addColorStop(1,'transparent');
        ctx.fillStyle=halo; ctx.beginPath(); ctx.arc(pos.x,pos.y,s*3.5,0,Math.PI*2); ctx.fill();

        if (p.ring) {
            ctx.save(); ctx.translate(pos.x,pos.y); ctx.rotate(-0.35);
            ctx.beginPath(); ctx.ellipse(0,0,s*2.8,s*0.65,0,0,Math.PI*2);
            ctx.strokeStyle='rgba(0,229,255,0.50)'; ctx.lineWidth=s*0.55; ctx.stroke();
            ctx.restore();
        }

        const pg = ctx.createRadialGradient(pos.x-s*.35,pos.y-s*.35,0,pos.x,pos.y,s);
        pg.addColorStop(0,lighter(p.col,90)); pg.addColorStop(.45,p.col); pg.addColorStop(1,darker(p.col,60));
        ctx.beginPath(); ctx.arc(pos.x,pos.y,s,0,Math.PI*2); ctx.fillStyle=pg; ctx.fill();

        const rim = ctx.createRadialGradient(pos.x,pos.y,s*.7,pos.x,pos.y,s*1.15);
        rim.addColorStop(0,'transparent'); rim.addColorStop(1,`rgba(${gr},${gg},${gb},0.18)`);
        ctx.beginPath(); ctx.arc(pos.x,pos.y,s*1.15,0,Math.PI*2); ctx.fillStyle=rim; ctx.fill();

        if (p.moon) {
            const mAng = t*0.045;
            const mx = pos.x+Math.cos(mAng)*s*3.2, my = pos.y+Math.sin(mAng)*s*1.6;
            ctx.save(); ctx.translate(pos.x,pos.y);
            ctx.beginPath(); ctx.ellipse(0,0,s*3.2,s*1.6,0,0,Math.PI*2);
            ctx.strokeStyle='rgba(179,229,252,0.15)'; ctx.lineWidth=0.5; ctx.stroke();
            ctx.restore();
            const mr = s*0.38;
            const mg = ctx.createRadialGradient(mx-mr*.3,my-mr*.3,0,mx,my,mr);
            mg.addColorStop(0,'#e3f2fd'); mg.addColorStop(1,'#78909c');
            ctx.beginPath(); ctx.arc(mx,my,mr,0,Math.PI*2); ctx.fillStyle=mg; ctx.fill();
        }
    }

    function frame() {
        if (tabVisible) {
            t += 0.012;
            drawBg(); drawNebula(); drawStars();
            PLANETS.forEach(p => drawOrbit(p));
            drawAsteroids();
            PLANETS.map(p => ({p, pos:planetPos(p)}))
                   .sort((a,b) => a.pos.y-b.pos.y)
                   .forEach(({p,pos}) => drawPlanet(p,pos));
            drawCore();
        }
        requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange', () => { tabVisible = !document.hidden; });
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 120); });

    resize();
    requestAnimationFrame(frame);
}());