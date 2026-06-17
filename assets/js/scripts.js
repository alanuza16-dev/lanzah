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
    let mouse = {x:0,y:0}, mTarget = {x:0,y:0};
    const DESKTOP = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const SCOLS = [[235,248,255],[200,235,255],[170,215,255],[120,195,247],[0,200,230],[0,170,210]];
    const rnd = (a,b) => a + Math.random()*(b-a);

    // ---- STARS ----
    function initStars() {
        const N = W > 1400 ? 4000 : W > 800 ? 2600 : 1400;
        stars = [];
        const cR = Math.min(W,H)*0.13;
        for (let i=0; i<N*.18; i++) {
            const r=Math.pow(Math.random(),1.5)*cR, a=rnd(0,Math.PI*2);
            mkS(cx+r*Math.cos(a), cy+r*.5*Math.sin(a), 'core');
        }
        for (let arm=0; arm<2; arm++) for (let i=0; i<N*.30; i++) {
            const th=rnd(.3,Math.PI*3.5), r=cR*.28*Math.exp(.22*th), sc=r*rnd(.18,.42);
            mkS(cx+(r+rnd(-sc,sc))*Math.cos(th+arm*Math.PI+rnd(-.08,.08)),
                cy+(r*.48+rnd(-sc*.5,sc*.5))*Math.sin(th+arm*Math.PI+rnd(-.08,.08)),'arm');
        }
        for (let i=0; i<N*.22; i++) mkS(rnd(0,W),rnd(0,H),'halo');
    }
    function mkS(x, y, type) {
        const br=Math.random()>.94, C=SCOLS[Math.floor(Math.random()*SCOLS.length)];
        stars.push({ x:Math.max(0,Math.min(W,x)), y:Math.max(0,Math.min(H,y)), C,
            r: type==='core'?rnd(.3,2.8):type==='arm'?(br?rnd(1.2,2.6):rnd(.2,1.4)):rnd(.15,.9),
            al: type==='halo'?rnd(.08,.35):rnd(.3,.9),
            tw:rnd(0,Math.PI*2), ts:rnd(.002,.012), flare:br&&type!=='halo',
            pf: type==='core'?rnd(.015,.025):type==='arm'?rnd(.008,.020):rnd(.003,.010) });
    }

    // ---- PLANETS (orbital motion + trail) ----
    function initPlanets() {
        const S=Math.min(W,H);
        planets = [
            {bx:W*.80,by:H*.32,ax:W*.10,ay:H*.055,phase:0,          r:S*.038,col:[8,45,110], hi:[70,175,255],ring:true, ringTilt:.28,atm:[0,180,255], spd:.00055,pf:.040,trail:[]},
            {bx:W*.15,by:H*.62,ax:W*.08,ay:H*.045,phase:Math.PI,     r:S*.022,col:[5,35,95],  hi:[35,150,225],ring:false,             atm:[20,165,245],spd:.00080,pf:.055,trail:[]},
            {bx:W*.52,by:H*.11,ax:W*.12,ay:H*.038,phase:Math.PI*.7,  r:S*.014,col:[0,70,150], hi:[50,200,250],ring:false,             atm:[0,220,255], spd:.00115,pf:.050,trail:[]},
        ];
    }
    function pPos(p) {
        const ang=p.phase+t*p.spd;
        return {bx:p.bx+Math.cos(ang)*p.ax, by:p.by+Math.sin(ang)*p.ay};
    }

    // ---- BG & NEBULAE ----
    const NEB=[[.50,.48,.52,.32,'30,160,220',.055],[.52,.50,.38,.22,'0,210,240',.045],
               [.40,.42,.28,.18,'0,100,180',.060],[.62,.55,.25,.16,'0,180,220',.040],
               [.30,.55,.22,.14,'15,80,160',.050],[.72,.38,.20,.13,'0,229,255',.035],
               [.20,.35,.18,.11,'20,120,200',.040],[.55,.65,.16,.10,'0,150,200',.030],
               [.45,.30,.14,.09,'60,190,255',.025],[.65,.70,.13,.08,'0,80,140',.030]];
    function drawBg() { ctx.fillStyle='#010a18'; ctx.fillRect(0,0,W,H); }
    function drawNebulae() {
        NEB.forEach(([bx,by,rx,ry,c,a]) => {
            const scY=ry/rx, gx=W*bx+mouse.x*.014*W, gy=(H*by+mouse.y*.014*H)/scY;
            const g=ctx.createRadialGradient(gx,gy,0,gx,gy,W*rx);
            g.addColorStop(0,`rgba(${c},${a})`); g.addColorStop(.5,`rgba(${c},${a*.4})`); g.addColorStop(1,'transparent');
            ctx.save(); ctx.scale(1,scY); ctx.fillStyle=g; ctx.fillRect(0,0,W,H/scY*1.2); ctx.restore();
        });
    }

    // ---- GALACTIC CORE ----
    function drawGalacticCore() {
        const pulse=1+.04*Math.sin(t*1.4), cR=Math.min(W,H)*.13*pulse;
        const ox=mouse.x*.006*W, oy=mouse.y*.006*H, pcx=cx+ox, pcy=cy+oy;
        [[cR*3.5,'rgba(0,80,140,.12)'],[cR*2.2,'rgba(0,140,200,.18)'],
         [cR*1.2,'rgba(0,200,240,.30)'],[cR*.5,'rgba(150,230,255,.55)'],[cR*.15,'rgba(255,255,255,.90)']
        ].forEach(([r,col])=>{
            const g=ctx.createRadialGradient(pcx,pcy,0,pcx,pcy,r);
            g.addColorStop(0,col); g.addColorStop(1,'transparent');
            ctx.fillStyle=g; ctx.save(); ctx.scale(1,.48);
            ctx.beginPath(); ctx.arc(pcx,pcy/.48,r,0,Math.PI*2); ctx.fill(); ctx.restore();
        });
        ctx.save(); ctx.globalAlpha=.18+.06*Math.sin(t*2); ctx.strokeStyle='#00e5ff'; ctx.lineWidth=1.2;
        [[W*.10,0],[W*.06,Math.PI/4]].forEach(([len,rot])=>{
            ctx.save(); ctx.translate(pcx,pcy); ctx.rotate(rot);
            ctx.beginPath(); ctx.moveTo(-len,0); ctx.lineTo(len,0); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0,-len*.6); ctx.lineTo(0,len*.6); ctx.stroke();
            ctx.restore();
        }); ctx.restore();
    }

    // ---- STARS (parallax) ----
    function drawStars() {
        stars.forEach(s => {
            s.tw+=s.ts;
            const a=s.al*(0.60+0.40*Math.sin(s.tw));
            const sx=s.x+mouse.x*s.pf*W, sy=s.y+mouse.y*s.pf*H;
            ctx.beginPath(); ctx.arc(sx,sy,s.r,0,Math.PI*2);
            ctx.fillStyle=`rgba(${s.C[0]},${s.C[1]},${s.C[2]},${a.toFixed(2)})`; ctx.fill();
            if (s.flare) {
                ctx.save(); ctx.globalAlpha=a*.35; ctx.strokeStyle=`rgb(${s.C[0]},${s.C[1]},${s.C[2]})`; ctx.lineWidth=.6;
                const len=s.r*4;
                ctx.beginPath(); ctx.moveTo(sx-len,sy); ctx.lineTo(sx+len,sy); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(sx,sy-len); ctx.lineTo(sx,sy+len); ctx.stroke();
                ctx.restore();
            }
        });
    }

    // ---- PLANET TRAIL ----
    function drawTrail(p) {
        const tr=p.trail; if (tr.length<2) return;
        const ox=mouse.x*p.pf*W, oy=mouse.y*p.pf*H;
        for (let i=1; i<tr.length; i++) {
            const f=i/tr.length;
            ctx.beginPath(); ctx.moveTo(tr[i-1].x+ox,tr[i-1].y+oy); ctx.lineTo(tr[i].x+ox,tr[i].y+oy);
            ctx.strokeStyle=`rgba(0,210,250,${f*.38})`; ctx.lineWidth=Math.max(.3,p.r*f*.16); ctx.stroke();
        }
    }

    // ---- PLANET ----
    function drawPlanet(p) {
        const {bx,by}=pPos(p);
        p.trail.push({x:bx,y:by}); if (p.trail.length>55) p.trail.shift();
        const r=p.r, ox=mouse.x*p.pf*W, oy=mouse.y*p.pf*H, px=bx+ox, py=by+oy;
        drawTrail(p);
        const atm=ctx.createRadialGradient(px,py,r*.85,px,py,r*1.55);
        atm.addColorStop(0,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.22)`); atm.addColorStop(1,'transparent');
        ctx.fillStyle=atm; ctx.beginPath(); ctx.arc(px,py,r*1.55,0,Math.PI*2); ctx.fill();
        if (p.ring) {
            ctx.save(); ctx.translate(px,py); ctx.rotate(-p.ringTilt);
            for(let i=3;i>=1;i--){ctx.beginPath();ctx.ellipse(0,0,r*(1.55+i*.28),r*(.28+i*.06),0,0,Math.PI*2);ctx.strokeStyle=`rgba(0,200,240,${.10+i*.08})`;ctx.lineWidth=r*(.10+i*.04);ctx.stroke();}
            ctx.restore();
        }
        const mid=[Math.round((p.hi[0]+p.col[0])*.5),Math.round((p.hi[1]+p.col[1])*.5),Math.round((p.hi[2]+p.col[2])*.5)];
        const lg=ctx.createRadialGradient(px+r*.38,py-r*.38,0,px,py,r);
        lg.addColorStop(0,`rgb(${p.hi[0]},${p.hi[1]},${p.hi[2]})`); lg.addColorStop(.4,`rgb(${mid[0]},${mid[1]},${mid[2]})`); lg.addColorStop(1,`rgb(${p.col[0]},${p.col[1]},${p.col[2]})`);
        ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2); ctx.fillStyle=lg; ctx.fill();
        const sh=ctx.createRadialGradient(px-r*.3,py+r*.3,0,px,py,r);
        sh.addColorStop(.4,'transparent'); sh.addColorStop(1,'rgba(0,5,20,.65)');
        ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2); ctx.fillStyle=sh; ctx.fill();
        const rim=ctx.createRadialGradient(px,py,r*.78,px,py,r*1.05);
        rim.addColorStop(0,'transparent'); rim.addColorStop(1,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.32)`);
        ctx.beginPath(); ctx.arc(px,py,r*1.05,0,Math.PI*2); ctx.fillStyle=rim; ctx.fill();
        if(p.ring){ctx.save();ctx.translate(px,py);ctx.rotate(-p.ringTilt);ctx.beginPath();ctx.ellipse(0,0,r*2.1,r*.42,0,Math.PI,Math.PI*2);ctx.strokeStyle='rgba(0,200,240,.28)';ctx.lineWidth=r*.18;ctx.stroke();ctx.restore();}
    }

    // ---- SHOOTING STARS ----
    function tickShootingStars() {
        if (Math.random()<.004 && shooting.length<4)
            shooting.push({x:rnd(W*.05,W*.65),y:rnd(0,H*.45),vx:rnd(4,9),vy:rnd(.4,1.6),al:1});
        shooting=shooting.filter(s=>s.al>0);
        shooting.forEach(s=>{
            const m=Math.hypot(s.vx,s.vy),nx=s.vx/m,ny=s.vy/m,len=m*12;
            const tail=ctx.createLinearGradient(s.x-nx*len,s.y-ny*len,s.x,s.y);
            tail.addColorStop(0,'transparent'); tail.addColorStop(1,`rgba(200,240,255,${s.al})`);
            ctx.strokeStyle=tail; ctx.lineWidth=1.4;
            ctx.beginPath(); ctx.moveTo(s.x-nx*len,s.y-ny*len); ctx.lineTo(s.x,s.y); ctx.stroke();
            s.x+=s.vx; s.y+=s.vy; s.al-=.018;
        });
    }

    // ---- RESIZE ----
    function resize() {
        const st=canvas.parentElement, dpr=Math.min(window.devicePixelRatio||1,2);
        const sw=st.offsetWidth||window.innerWidth, sh=st.offsetHeight||window.innerHeight;
        W=sw*dpr; H=sh*dpr; canvas.width=W; canvas.height=H;
        canvas.style.width=sw+'px'; canvas.style.height=sh+'px';
        cx=W/2; cy=H/2;
        initStars(); initPlanets();
    }

    // ---- MOUSE PARALLAX (desktop only — no touch interference) ----
    if (DESKTOP) {
        const stage=canvas.parentElement;
        stage.addEventListener('mousemove', e => {
            const r=stage.getBoundingClientRect();
            mTarget.x=(e.clientX-r.left-r.width*.5)/(r.width*.5);
            mTarget.y=(e.clientY-r.top-r.height*.5)/(r.height*.5);
        }, {passive:true});
        stage.addEventListener('mouseleave', ()=>{mTarget.x=0; mTarget.y=0;});
    }

    // ---- FRAME ----
    function frame() {
        if (tabVisible) {
            t+=.008;
            mouse.x+=(mTarget.x-mouse.x)*.06;
            mouse.y+=(mTarget.y-mouse.y)*.06;
            drawBg(); drawNebulae(); drawGalacticCore();
            drawStars(); planets.forEach(drawPlanet); tickShootingStars();
        }
        requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange',()=>{tabVisible=!document.hidden;});
    window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,150);});
    resize(); requestAnimationFrame(frame);
}());