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
   LANZAH HERO GALAXY — Milky Way Realistic
   ========================================= */
(function initHeroGalaxy() {
    const canvas = document.getElementById('lanzahHeroGalaxy');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, cx, cy, stars = [], shooting = [], planets = [];
    let t = 0, tabVisible = true, resizeTimer;
    let cam={x:0,y:0}, camT={x:0,y:0}, isDrag=false, dragP={x:0,y:0}, ptId=null;
    const PI2=Math.PI*2;
    const SC_CORE=[[255,248,218],[255,238,185],[255,252,235],[250,222,148],[255,245,205]];
    const SC_ARM =[[200,215,255],[182,202,255],[220,234,255],[0,220,255],[140,222,255],[230,245,255]];
    const SC_HALO=[[200,215,255],[220,232,255],[180,198,255],[240,245,255]];
    const SC_DUST=[[200,175,148],[180,158,130],[195,172,145]];
    const rnd=(a,b)=>a+Math.random()*(b-a);

    // ---- STARS — each has orbital velocity, wraps seamlessly ----
    function initStars(){
        const N=W>1400?5500:W>800?3500:2000; stars=[];
        const cR=Math.min(W,H)*.38;
        for(let i=0;i<N*.22;i++){const r=Math.pow(Math.random(),2.0)*cR*.30,a=rnd(0,PI2);mkS(cx+r*Math.cos(a),cy+r*.50*Math.sin(a),'core',r);}
        for(let arm=0;arm<2;arm++) for(let i=0;i<N*.28;i++){
            const th=rnd(.2,PI2*1.9),r=cR*.22*Math.exp(.21*th),sc=r*rnd(.12,.36);
            mkS(cx+(r+rnd(-sc,sc))*Math.cos(th+arm*Math.PI+rnd(-.06,.06)),
                cy+(r*.48+rnd(-sc*.5,sc*.5))*Math.sin(th+arm*Math.PI+rnd(-.06,.06)),'disk',r);
        }
        for(let i=0;i<N*.22;i++) mkS(rnd(-W*.05,W*1.05),rnd(-H*.05,H*1.05),'halo',0);
    }
    function mkS(x,y,type,dist){
        const br=Math.random()>.93;
        const pool=type==='core'?SC_CORE:type==='halo'?(Math.random()<.4?SC_ARM:SC_HALO):
                   (Math.random()<.12?SC_DUST:Math.random()<.5?SC_ARM:SC_HALO);
        const C=pool[Math.floor(Math.random()*pool.length)];
        const sz=type==='core'?rnd(.28,2.4):type==='disk'?(br?rnd(.9,2.6):rnd(.16,1.1)):rnd(.10,.7);
        const spd=type==='core'?rnd(.004,.014):type==='disk'?rnd(.002,.008):rnd(.0008,.003);
        const ang=Math.atan2(y-cy,x-cx)+Math.PI/2;
        stars.push({
            x:Math.max(-W*.1,Math.min(W*1.1,x)),y:Math.max(-H*.1,Math.min(H*1.1,y)),C,
            vx:type==='halo'?rnd(-spd*.5,spd*.5):Math.cos(ang)*spd*(type==='core'?.9:.4),
            vy:type==='halo'?rnd(-spd*.25,spd*.25):Math.sin(ang)*spd*(type==='core'?.48:.22),
            r:sz,al:type==='halo'?rnd(.05,.22):rnd(.32,.98),
            tw:rnd(0,PI2),ts:rnd(.001,.009),flare:br&&type!=='halo',
            pf:type==='core'?.010:type==='disk'?.018:.028
        });
    }

    // ---- PLANETS (inside galactic disk) ----
    function initPlanets(){
        const S=Math.min(W,H),cR=S*.38;
        planets=[
            {bx:cx+cR*.28,by:cy-cR*.12,ax:W*.09,ay:H*.045,phase:0,
             r:S*.038,col:[8,45,110],hi:[70,175,255],ring:true,ringTilt:.28,atm:[0,180,255],spd:.00055,pf:.018,trail:[]},
            {bx:cx-cR*.32,by:cy+cR*.15,ax:W*.07,ay:H*.038,phase:Math.PI,
             r:S*.023,col:[5,35,95],hi:[35,150,225],ring:false,atm:[20,165,245],spd:.00080,pf:.022,trail:[]},
            {bx:cx+cR*.08,by:cy-cR*.28,ax:W*.11,ay:H*.050,phase:Math.PI*.7,
             r:S*.015,col:[0,70,150],hi:[50,200,250],ring:false,atm:[0,220,255],spd:.00110,pf:.020,trail:[]},
        ];
    }
    function pPos(p){const a=p.phase+t*p.spd;return{bx:p.bx+Math.cos(a)*p.ax,by:p.by+Math.sin(a)*p.ay};}

    // ---- BACKGROUND — motion blur + galactic disk glow ----
    function drawBg(){
        ctx.fillStyle='rgba(0,0,4,.90)'; ctx.fillRect(0,0,W,H);
        const pcx=cx+cam.x,pcy=cy+cam.y;
        const dg=ctx.createRadialGradient(pcx,pcy,0,pcx,pcy,W*.52);
        dg.addColorStop(0,'rgba(14,9,3,.20)'); dg.addColorStop(.45,'rgba(5,3,1,.09)'); dg.addColorStop(1,'transparent');
        ctx.save(); ctx.scale(1,.40); ctx.fillStyle=dg;
        ctx.beginPath(); ctx.arc(pcx,pcy/.40,W*.52,0,PI2); ctx.fill(); ctx.restore();
    }

    // ---- NEBULAE ----
    const NEB=[[.50,.48,.44,.24,'28,148,212',.046],[.52,.50,.30,.17,'0,188,230',.036],
               [.40,.42,.24,.13,'0,82,162',.054],[.62,.55,.20,.11,'0,162,200',.032],
               [.30,.55,.18,.10,'8,60,142',.042],[.72,.38,.16,.09,'0,205,252',.025],
               [.20,.36,.14,.08,'12,100,182',.034],[.57,.62,.13,.07,'0,130,180',.021]];
    function drawNebulae(){
        const ox=cam.x*.7,oy=cam.y*.7;
        NEB.forEach(([bx,by,rx,ry,c,a])=>{
            const scY=ry/rx,gx=W*bx+ox,gy=(H*by+oy)/scY;
            const g=ctx.createRadialGradient(gx,gy,0,gx,gy,W*rx);
            g.addColorStop(0,`rgba(${c},${a})`); g.addColorStop(.40,`rgba(${c},${a*.20})`); g.addColorStop(1,'transparent');
            ctx.save(); ctx.scale(1,scY); ctx.fillStyle=g; ctx.fillRect(0,0,W,H/scY*1.2); ctx.restore();
        });
    }

    // ---- GALACTIC CORE — warm nucleus, galactic bar, spikes ----
    function drawGalacticCore(){
        const pulse=1+.028*Math.sin(t*1.35),cR=Math.min(W,H)*.38*pulse;
        const pcx=cx+cam.x,pcy=cy+cam.y;
        [[cR*.95,'rgba(20,65,145,.06)'],[cR*.60,'rgba(45,100,185,.10)'],
         [cR*.32,'rgba(215,168,65,.18)'],[cR*.16,'rgba(255,215,122,.34)'],
         [cR*.07,'rgba(255,248,208,.78)'],[cR*.018,'rgba(255,255,255,1.0)']
        ].forEach(([r,col])=>{
            const g=ctx.createRadialGradient(pcx,pcy,0,pcx,pcy,r);
            g.addColorStop(0,col); g.addColorStop(1,'transparent');
            ctx.fillStyle=g; ctx.save(); ctx.scale(1,.48);
            ctx.beginPath(); ctx.arc(pcx,pcy/.48,r,0,PI2); ctx.fill(); ctx.restore();
        });
        ctx.save(); ctx.translate(pcx,pcy); ctx.rotate(.20);
        const bar=ctx.createLinearGradient(-cR*.38,0,cR*.38,0);
        bar.addColorStop(0,'transparent'); bar.addColorStop(.28,'rgba(255,230,148,.08)');
        bar.addColorStop(.5,'rgba(255,243,182,.18)'); bar.addColorStop(.72,'rgba(255,230,148,.08)'); bar.addColorStop(1,'transparent');
        ctx.fillStyle=bar; ctx.save(); ctx.scale(1,.24); ctx.fillRect(-cR*.38,-cR*.6/.24,cR*.76,cR*1.2/.24); ctx.restore(); ctx.restore();
        ctx.save(); ctx.globalAlpha=.52+.16*Math.sin(t*2.1);
        [[cR*.62,0,'rgba(255,248,205,.92)'],[cR*.40,Math.PI/4,'rgba(255,238,178,.72)']].forEach(([len,rot,c])=>{
            ctx.save(); ctx.translate(pcx,pcy); ctx.rotate(rot);
            const sg=ctx.createLinearGradient(-len,0,len,0);
            sg.addColorStop(0,'transparent'); sg.addColorStop(.5,c); sg.addColorStop(1,'transparent');
            ctx.strokeStyle=sg; ctx.lineWidth=1.1; ctx.beginPath(); ctx.moveTo(-len,0); ctx.lineTo(len,0); ctx.stroke();
            ctx.restore();
        }); ctx.restore();
    }

    // ---- DUST LANES ----
    function drawDustLanes(){
        const ox=cam.x*.9,oy=cam.y*.9;
        ctx.save();
        for(let arm=0;arm<2;arm++){
            [.87,.95,1.07].forEach((off,pass)=>{
                ctx.beginPath();
                for(let th=0.6;th<PI2*1.7;th+=0.06){
                    const r=Math.min(W,H)*.38*.22*Math.exp(.21*th)*off;
                    const ang=th+arm*Math.PI,x=cx+r*Math.cos(ang)+ox,y=cy+r*.48*Math.sin(ang)+oy;
                    th<=0.66?ctx.moveTo(x,y):ctx.lineTo(x,y);
                }
                ctx.strokeStyle=`rgba(0,0,0,${pass===1?.28:.18})`;
                ctx.lineWidth=Math.min(W,H)*(.009+pass*.004); ctx.stroke();
            });
        }
        ctx.restore();
    }

    // ---- STARS — update position + draw with glow + spikes ----
    function updateAndDrawStars(){
        const ox=cam.x,oy=cam.y;
        stars.forEach(s=>{
            s.x+=s.vx; s.y+=s.vy;
            if(s.x>W*1.1)s.x-=W*1.2; else if(s.x<-W*.1)s.x+=W*1.2;
            if(s.y>H*1.1)s.y-=H*1.2; else if(s.y<-H*.1)s.y+=H*1.2;
            s.tw+=s.ts; const a=s.al*(0.50+0.50*Math.sin(s.tw));
            const sx=s.x+ox*s.pf,sy=s.y+oy*s.pf;
            if(s.r>1.0){
                const gw=ctx.createRadialGradient(sx,sy,0,sx,sy,s.r*3.2);
                gw.addColorStop(0,`rgba(${s.C[0]},${s.C[1]},${s.C[2]},${(a*.22).toFixed(2)})`); gw.addColorStop(1,'transparent');
                ctx.fillStyle=gw; ctx.beginPath(); ctx.arc(sx,sy,s.r*3.2,0,PI2); ctx.fill();
            }
            ctx.beginPath(); ctx.arc(sx,sy,s.r,0,PI2);
            ctx.fillStyle=`rgba(${s.C[0]},${s.C[1]},${s.C[2]},${a.toFixed(2)})`; ctx.fill();
            if(s.flare){
                ctx.save(); ctx.globalAlpha=a*.52; ctx.lineWidth=.7;
                const len=s.r*6.0;
                [[sx-len,sy,sx+len,sy],[sx,sy-len,sx,sy+len]].forEach(([x1,y1,x2,y2])=>{
                    const sg=ctx.createLinearGradient(x1,y1,x2,y2);
                    sg.addColorStop(0,'transparent'); sg.addColorStop(.5,`rgb(${s.C[0]},${s.C[1]},${s.C[2]})`); sg.addColorStop(1,'transparent');
                    ctx.strokeStyle=sg; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
                }); ctx.restore();
            }
        });
    }

    // ---- PLANET TRAIL & PLANET ----
    function drawTrail(p){
        const tr=p.trail; if(tr.length<2) return;
        const ox=cam.x*p.pf,oy=cam.y*p.pf;
        for(let i=1;i<tr.length;i++){
            const f=i/tr.length;
            ctx.beginPath(); ctx.moveTo(tr[i-1].x+ox,tr[i-1].y+oy); ctx.lineTo(tr[i].x+ox,tr[i].y+oy);
            ctx.strokeStyle=`rgba(0,210,250,${f*.36})`; ctx.lineWidth=Math.max(.3,p.r*f*.15); ctx.stroke();
        }
    }
    function drawPlanet(p){
        const {bx,by}=pPos(p);
        p.trail.push({x:bx,y:by}); if(p.trail.length>60) p.trail.shift();
        const r=p.r,ox=cam.x*p.pf,oy=cam.y*p.pf,px=bx+ox,py=by+oy;
        drawTrail(p);
        const atm=ctx.createRadialGradient(px,py,r*.85,px,py,r*1.55);
        atm.addColorStop(0,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.24)`); atm.addColorStop(1,'transparent');
        ctx.fillStyle=atm; ctx.beginPath(); ctx.arc(px,py,r*1.55,0,PI2); ctx.fill();
        if(p.ring){
            ctx.save(); ctx.translate(px,py); ctx.rotate(-p.ringTilt);
            for(let i=3;i>=1;i--){ctx.beginPath();ctx.ellipse(0,0,r*(1.55+i*.28),r*(.28+i*.06),0,0,PI2);ctx.strokeStyle=`rgba(0,200,240,${.12+i*.08})`;ctx.lineWidth=r*(.10+i*.04);ctx.stroke();}
            ctx.restore();
        }
        const mid=[Math.round((p.hi[0]+p.col[0])*.5),Math.round((p.hi[1]+p.col[1])*.5),Math.round((p.hi[2]+p.col[2])*.5)];
        const lg=ctx.createRadialGradient(px+r*.38,py-r*.38,0,px,py,r);
        lg.addColorStop(0,`rgb(${p.hi[0]},${p.hi[1]},${p.hi[2]})`); lg.addColorStop(.4,`rgb(${mid[0]},${mid[1]},${mid[2]})`); lg.addColorStop(1,`rgb(${p.col[0]},${p.col[1]},${p.col[2]})`);
        ctx.beginPath(); ctx.arc(px,py,r,0,PI2); ctx.fillStyle=lg; ctx.fill();
        const sh=ctx.createRadialGradient(px-r*.3,py+r*.3,0,px,py,r);
        sh.addColorStop(.4,'transparent'); sh.addColorStop(1,'rgba(0,0,0,.80)');
        ctx.beginPath(); ctx.arc(px,py,r,0,PI2); ctx.fillStyle=sh; ctx.fill();
        const rim=ctx.createRadialGradient(px,py,r*.80,px,py,r*1.05);
        rim.addColorStop(0,'transparent'); rim.addColorStop(1,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.34)`);
        ctx.beginPath(); ctx.arc(px,py,r*1.05,0,PI2); ctx.fillStyle=rim; ctx.fill();
        if(p.ring){ctx.save();ctx.translate(px,py);ctx.rotate(-p.ringTilt);ctx.beginPath();ctx.ellipse(0,0,r*2.1,r*.44,0,Math.PI,PI2);ctx.strokeStyle='rgba(0,200,240,.30)';ctx.lineWidth=r*.19;ctx.stroke();ctx.restore();}
    }

    // ---- SHOOTING STARS ----
    function tickShootingStars(){
        if(Math.random()<.003&&shooting.length<3)
            shooting.push({x:rnd(W*.08,W*.68),y:rnd(0,H*.48),vx:rnd(5,11),vy:rnd(.3,1.8),al:1});
        shooting=shooting.filter(s=>s.al>0);
        shooting.forEach(s=>{
            const m=Math.hypot(s.vx,s.vy),nx=s.vx/m,ny=s.vy/m,len=m*14;
            const tail=ctx.createLinearGradient(s.x-nx*len,s.y-ny*len,s.x,s.y);
            tail.addColorStop(0,'transparent'); tail.addColorStop(.6,`rgba(200,235,255,${s.al*.6})`); tail.addColorStop(1,`rgba(255,255,255,${s.al})`);
            ctx.strokeStyle=tail; ctx.lineWidth=1.6;
            ctx.beginPath(); ctx.moveTo(s.x-nx*len,s.y-ny*len); ctx.lineTo(s.x,s.y); ctx.stroke();
            s.x+=s.vx; s.y+=s.vy; s.al-=.016;
        });
    }

    // ---- RESIZE ----
    function resize(){
        const st=canvas.parentElement,dpr=Math.min(window.devicePixelRatio||1,2);
        const sw=st.offsetWidth||window.innerWidth,sh=st.offsetHeight||window.innerHeight;
        W=sw*dpr; H=sh*dpr; canvas.width=W; canvas.height=H;
        canvas.style.width=sw+'px'; canvas.style.height=sh+'px';
        cx=W/2; cy=H/2; initStars(); initPlanets();
    }

    // ---- CLICK+DRAG EASTER EGG (pointer events — mouse + touch, no scroll conflict) ----
    const stage=canvas.parentElement;
    stage.addEventListener('pointerdown',e=>{ptId=e.pointerId;isDrag=true;dragP={x:e.clientX,y:e.clientY};},{passive:true});
    stage.addEventListener('pointermove',e=>{
        if(!isDrag||e.pointerId!==ptId) return;
        const dpr=Math.min(window.devicePixelRatio||1,2);
        camT.x+=(e.clientX-dragP.x)*dpr; camT.y+=(e.clientY-dragP.y)*dpr;
        camT.x=Math.max(-W*.45,Math.min(W*.45,camT.x)); camT.y=Math.max(-H*.45,Math.min(H*.45,camT.y));
        dragP={x:e.clientX,y:e.clientY};
    },{passive:true});
    stage.addEventListener('pointerup',()=>{isDrag=false;ptId=null;});
    stage.addEventListener('pointerleave',()=>{isDrag=false;ptId=null;});

    // ---- FRAME ----
    function frame(){
        if(tabVisible){
            t+=.007;
            cam.x+=(camT.x-cam.x)*.08; cam.y+=(camT.y-cam.y)*.08;
            if(!isDrag){camT.x*=.982; camT.y*=.982;}
            drawBg(); drawNebulae(); drawGalacticCore(); drawDustLanes();
            updateAndDrawStars(); planets.forEach(drawPlanet); tickShootingStars();
        }
        requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange',()=>{tabVisible=!document.hidden;});
    window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,150);}); resize(); requestAnimationFrame(frame);
}());

/* =========================================
   LANZAH HERO CINEMA GALAXY
   ========================================= */
(function initHeroCinemaGalaxy() {
    const canvas = document.getElementById('lanzahHeroCinemaGalaxy');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const TAU = Math.PI * 2;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const rand = (min, max) => min + Math.random() * (max - min);
    const rgba = (color, alpha) => `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let dust = [];
    let time = 0;
    let lastFrame = performance.now();
    let staticBackdrop = null;
    let staticBackdropCtx = null;
    let visible = true;
    let resizeTimer = null;

    const starPalettes = [
        [238, 255, 255],
        [165, 244, 255],
        [91, 214, 223],
        [69, 177, 226],
        [111, 222, 255],
        [96, 150, 255]
    ];

    const planets = [
        { orbit: 0.16, size: 1.7, speed: 0.070, phase: 0.2, color: [98, 132, 145], glow: [166, 248, 255], shadow: [1, 9, 18], accent: [228, 255, 255], texture: 'rock' },
        { orbit: 0.23, size: 2.7, speed: 0.058, phase: 1.1, color: [70, 184, 190], glow: [118, 242, 232], shadow: [2, 18, 23], accent: [215, 255, 248], texture: 'ice' },
        { orbit: 0.31, size: 3.4, speed: 0.050, phase: 2.2, color: [22, 116, 192], glow: [106, 226, 255], shadow: [2, 12, 34], accent: [88, 216, 184], texture: 'terrain', moon: true },
        { orbit: 0.39, size: 2.4, speed: 0.044, phase: 3.2, color: [128, 92, 78], glow: [238, 148, 116], shadow: [18, 8, 10], accent: [255, 202, 148], texture: 'ember' },
        { orbit: 0.51, size: 7.2, speed: 0.034, phase: 4.0, color: [122, 186, 206], glow: [150, 244, 255], shadow: [3, 17, 28], accent: [232, 255, 246], texture: 'gas', bands: true },
        { orbit: 0.63, size: 6.5, speed: 0.028, phase: 5.0, color: [172, 208, 194], glow: [158, 246, 230], shadow: [7, 19, 20], accent: [245, 255, 230], texture: 'gas', ring: true },
        { orbit: 0.75, size: 4.8, speed: 0.022, phase: 5.8, color: [88, 210, 216], glow: [134, 252, 255], shadow: [2, 18, 34], accent: [226, 255, 255], texture: 'ice', ring: true, ringSoft: true },
        { orbit: 0.86, size: 4.7, speed: 0.018, phase: 0.9, color: [38, 92, 190], glow: [72, 182, 255], shadow: [1, 7, 28], accent: [158, 226, 255], texture: 'storm' }
    ];

    function resize() {
        const parent = canvas.parentElement;
        const rect = parent.getBoundingClientRect();

        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = Math.max(320, Math.floor(rect.width * dpr));
        height = Math.max(420, Math.floor(rect.height * dpr));

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${Math.floor(width / dpr)}px`;
        canvas.style.height = `${Math.floor(height / dpr)}px`;

        initStars();
        initDust();
        buildStaticBackdrop();
    }

    function initStars() {
        const count = width > 1800 ? 1300 : width > 1000 ? 980 : 620;
        const galaxy = getGalaxy();
        const cx = galaxy.x;
        const cy = galaxy.y;
        const radius = galaxy.radius;

        stars = [];

        for (let i = 0; i < count; i += 1) {
            const inArm = Math.random() > 0.28;
            const arm = Math.random() > 0.5 ? 0 : Math.PI;
            const angle = inArm ? rand(0.12, TAU * 1.82) : rand(0, TAU);
            const spiral = inArm ? 0.45 * Math.exp(0.17 * angle) : Math.pow(Math.random(), 0.58);
            const r = inArm ? radius * 0.14 * spiral : radius * rand(0.10, 1.08);
            const spread = inArm ? rand(-radius * 0.145, radius * 0.145) : rand(-radius * 0.33, radius * 0.33);
            const a = inArm ? angle + arm + rand(-0.24, 0.24) : angle;
            const color = starPalettes[Math.floor(Math.random() * starPalettes.length)];

            stars.push({
                x: cx + (r + spread) * Math.cos(a),
                y: cy + (r * 0.42 + spread * 0.35) * Math.sin(a),
                orbit: r,
                angle: a,
                arm: inArm,
                color,
                size: inArm ? rand(0.10, 0.76) : rand(0.08, 0.56),
                alpha: inArm ? rand(0.075, 0.34) : rand(0.045, 0.25),
                spin: inArm ? rand(0.00008, 0.00018) : rand(0.00003, 0.00008),
                twinkle: rand(0, TAU),
                depth: rand(0.10, 1.0),
                flare: Math.random() > 0.985
            });
        }
    }

    function initDust() {
        dust = [];
        const radius = getGalaxy().radius * 0.96;

        for (let arm = 0; arm < 2; arm += 1) {
            for (let i = 0; i < 34; i += 1) {
                const angle = rand(0.35, TAU * 1.65);
                const r = radius * 0.14 * Math.exp(0.18 * angle);
                dust.push({
                    angle: angle + arm * Math.PI,
                    orbit: r,
                    width: rand(32, 104) * dpr,
                    alpha: rand(0.012, 0.045)
                });
            }
        }
    }

    function getGalaxy() {
        const mobile = width / dpr < 720;
        return {
            x: width * 0.50,
            y: mobile ? height * 0.43 : height * 0.455,
            radius: Math.min(width, height) * (mobile ? 0.56 : 0.70),
            flatness: mobile ? 0.46 : 0.43
        };
    }

    function drawBackground() {
        const bg = ctx.createLinearGradient(0, 0, width, height);
        bg.addColorStop(0, '#00030a');
        bg.addColorStop(0.30, '#031223');
        bg.addColorStop(0.58, '#020711');
        bg.addColorStop(1, '#000106');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        const brandBloom = ctx.createRadialGradient(width * 0.50, height * 0.43, 0, width * 0.50, height * 0.43, Math.min(width, height) * 0.84);
        brandBloom.addColorStop(0, 'rgba(103,232,224,0.14)');
        brandBloom.addColorStop(0.38, 'rgba(42,151,205,0.08)');
        brandBloom.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = brandBloom;
        ctx.fillRect(0, 0, width, height);

        const topFade = ctx.createLinearGradient(0, 0, 0, height);
        topFade.addColorStop(0, 'rgba(0,0,0,0.72)');
        topFade.addColorStop(0.20, 'rgba(0,0,0,0.10)');
        topFade.addColorStop(0.72, 'rgba(0,0,0,0.02)');
        topFade.addColorStop(1, 'rgba(0,0,0,0.82)');
        ctx.fillStyle = topFade;
        ctx.fillRect(0, 0, width, height);
    }

    function drawNebulae() {
        const driftX = Math.sin(time * 0.020) * width * 0.006;
        const driftY = Math.cos(time * 0.018) * height * 0.005;
        const layers = [
            [0.40, 0.42, 0.46, '63,174,226', 0.13],
            [0.52, 0.44, 0.38, '103,232,224', 0.12],
            [0.60, 0.50, 0.34, '46,124,214', 0.08],
            [0.34, 0.58, 0.30, '67,213,205', 0.06],
            [0.72, 0.60, 0.26, '25,83,157', 0.07]
        ];

        layers.forEach(([x, y, radius, color, alpha]) => {
            const gx = width * x + driftX;
            const gy = height * y + driftY;
            const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.min(width, height) * radius);
            gradient.addColorStop(0, `rgba(${color},${alpha})`);
            gradient.addColorStop(0.42, `rgba(${color},${alpha * 0.22})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        });
    }

    function drawCore() {
        const galaxy = getGalaxy();
        const cx = galaxy.x;
        const cy = galaxy.y;
        const base = Math.min(width, height);
        const pulse = 1 + Math.sin(time * 0.55) * 0.030;
        const rings = [
            [base * 0.76 * pulse, 'rgba(17,90,180,0.050)'],
            [base * 0.52 * pulse, 'rgba(32,196,220,0.060)'],
            [base * 0.33 * pulse, 'rgba(105,235,226,0.070)'],
            [base * 0.16 * pulse, 'rgba(185,255,250,0.115)'],
            [base * 0.050 * pulse, 'rgba(245,255,255,0.22)']
        ];

        rings.forEach(([radius, color]) => {
            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.save();
            ctx.scale(1, 0.45);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(cx, cy / 0.45, radius, 0, TAU);
            ctx.fill();
            ctx.restore();
        });

        const flare = ctx.createLinearGradient(cx - base * 0.54, cy, cx + base * 0.54, cy);
        flare.addColorStop(0, 'rgba(0,0,0,0)');
        flare.addColorStop(0.34, 'rgba(65,190,232,0.020)');
        flare.addColorStop(0.50, 'rgba(215,255,255,0.060)');
        flare.addColorStop(0.66, 'rgba(65,220,210,0.020)');
        flare.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.save();
        ctx.translate(0, cy);
        ctx.scale(1, 0.18);
        ctx.fillStyle = flare;
        ctx.fillRect(cx - base * 0.58, -base * 0.30, base * 1.16, base * 0.60);
        ctx.restore();
    }

    function drawDust() {
        const galaxy = getGalaxy();
        const cx = galaxy.x;
        const cy = galaxy.y;
        const rotate = time * 0.002;

        ctx.save();
        dust.forEach((lane) => {
            const angle = lane.angle + rotate;
            const x = cx + lane.orbit * Math.cos(angle);
            const y = cy + lane.orbit * 0.42 * Math.sin(angle);

            ctx.beginPath();
            ctx.ellipse(x, y, lane.width, lane.width * 0.18, angle * 0.35, 0, TAU);
            ctx.fillStyle = `rgba(0,10,18,${lane.alpha})`;
            ctx.fill();
        });
        ctx.restore();
    }

    function drawStars(delta) {
        const galaxy = getGalaxy();
        const cx = galaxy.x;
        const cy = galaxy.y;

        stars.forEach((star) => {
            const angle = star.angle + time * star.spin;
            const x = cx + star.orbit * Math.cos(angle);
            const y = cy + star.orbit * 0.42 * Math.sin(angle);
            const tw = 0.86 + Math.sin(time * (0.26 + star.depth * 0.24) + star.twinkle) * 0.14;
            const alpha = clamp(star.alpha * tw * (star.arm ? 0.72 : 1), 0, 1);

            if (x < -20 || x > width + 20 || y < -20 || y > height + 20) return;

            if (star.size > 1.05 || star.flare) {
                const glow = ctx.createRadialGradient(x, y, 0, x, y, star.size * 5.6 * dpr);
                glow.addColorStop(0, `rgba(${star.color[0]},${star.color[1]},${star.color[2]},${alpha * 0.22})`);
                glow.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, star.size * 5.6 * dpr, 0, TAU);
                ctx.fill();
            }

            ctx.fillStyle = `rgba(${star.color[0]},${star.color[1]},${star.color[2]},${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, star.size * dpr, 0, TAU);
            ctx.fill();
        });
    }

    function drawTextSafeVeil() {
        const base = Math.min(width, height);
        const veil = ctx.createRadialGradient(width * 0.50, height * 0.49, 0, width * 0.50, height * 0.49, base * 0.68);
        veil.addColorStop(0, 'rgba(0,10,18,0.30)');
        veil.addColorStop(0.42, 'rgba(0,8,15,0.18)');
        veil.addColorStop(0.78, 'rgba(0,4,9,0.06)');
        veil.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = veil;
        ctx.fillRect(0, 0, width, height);

        const cinemaGlass = ctx.createLinearGradient(0, height * 0.22, 0, height * 0.76);
        cinemaGlass.addColorStop(0, 'rgba(0,0,0,0)');
        cinemaGlass.addColorStop(0.36, 'rgba(0,8,16,0.14)');
        cinemaGlass.addColorStop(0.62, 'rgba(0,9,16,0.16)');
        cinemaGlass.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = cinemaGlass;
        ctx.fillRect(0, 0, width, height);
    }

    function buildStaticBackdrop() {
        staticBackdrop = document.createElement('canvas');
        staticBackdrop.width = width;
        staticBackdrop.height = height;
        staticBackdropCtx = staticBackdrop.getContext('2d', { alpha: false });

        const previousTime = time;
        time = previousTime || 0.001;

        drawBackground();
        drawNebulae();
        drawCore();
        drawDust();
        drawStars(0);
        drawTextSafeVeil();

        staticBackdropCtx.drawImage(canvas, 0, 0);
        time = previousTime;
    }

    function getSystem() {
        const mobile = width / dpr < 720;
        const scale = Math.min(width, height);
        return {
            x: width * 0.50,
            y: mobile ? height * 0.73 : height * 0.70,
            radius: mobile ? scale * 0.27 : scale * 0.30,
            yScale: mobile ? 0.30 : 0.34
        };
    }

    function drawOrbitArc(system, planet, angle) {
        const rx = system.radius * planet.orbit;
        const ry = rx * system.yScale;

        ctx.save();
        ctx.translate(system.x, system.y);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
        ctx.strokeStyle = 'rgba(113,231,224,0.040)';
        ctx.lineWidth = Math.max(0.45, dpr * 0.5);
        ctx.stroke();
        ctx.restore();
    }

    function drawPlanet(system, planet) {
        const angle = planet.phase + time * planet.speed;
        const rx = system.radius * planet.orbit;
        const ry = rx * system.yScale;
        const x = system.x + Math.cos(angle) * rx;
        const y = system.y + Math.sin(angle) * ry;
        const z = 0.72 + Math.sin(angle) * 0.28;
        const radius = planet.size * dpr * (0.82 + z * 0.22);

        drawOrbitArc(system, planet, angle);

        const glow = ctx.createRadialGradient(x, y, radius * 0.4, x, y, radius * 4.6);
        glow.addColorStop(0, `rgba(${planet.glow[0]},${planet.glow[1]},${planet.glow[2]},0.16)`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius * 4.6, 0, TAU);
        ctx.fill();

        if (planet.ring) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-0.22);
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 2.15, radius * (planet.ringSoft ? 0.42 : 0.35), 0, 0, TAU);
            ctx.strokeStyle = planet.ringSoft ? 'rgba(155,248,255,0.26)' : 'rgba(174,248,236,0.32)';
            ctx.lineWidth = Math.max(1, radius * 0.22);
            ctx.stroke();
            ctx.restore();
        }

        const shade = ctx.createRadialGradient(x + radius * 0.38, y - radius * 0.42, 0, x, y, radius);
        shade.addColorStop(0, `rgb(${planet.glow[0]},${planet.glow[1]},${planet.glow[2]})`);
        shade.addColorStop(0.44, `rgb(${planet.color[0]},${planet.color[1]},${planet.color[2]})`);
        shade.addColorStop(1, 'rgb(5,10,24)');
        ctx.fillStyle = shade;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TAU);
        ctx.fill();

        if (planet.bands) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, TAU);
            ctx.clip();
            for (let i = -2; i <= 2; i += 1) {
                ctx.fillStyle = i % 2 === 0 ? 'rgba(220,255,252,0.22)' : 'rgba(18,82,105,0.20)';
                ctx.fillRect(x - radius, y + i * radius * 0.26, radius * 2, radius * 0.14);
            }
            ctx.restore();
        }

        if (planet.moon) {
            const mx = x + Math.cos(time * 1.6) * radius * 2.0;
            const my = y + Math.sin(time * 1.6) * radius * 0.85;
            ctx.fillStyle = 'rgba(225,235,240,0.90)';
            ctx.beginPath();
            ctx.arc(mx, my, Math.max(1.1, radius * 0.22), 0, TAU);
            ctx.fill();
        }

    }

    function drawScenePlanet(planet, x, y, radius, alpha) {
        ctx.save();
        ctx.globalAlpha *= alpha;

        const glow = ctx.createRadialGradient(x, y, radius * 0.28, x, y, radius * 5.8);
        glow.addColorStop(0, rgba(planet.glow, 0.34));
        glow.addColorStop(0.36, rgba(planet.glow, 0.10));
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius * 5.8, 0, TAU);
        ctx.fill();

        if (planet.ring) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-0.20);
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 2.36, radius * (planet.ringSoft ? 0.48 : 0.36), 0, 0, TAU);
            ctx.strokeStyle = planet.ringSoft ? 'rgba(155,248,255,0.20)' : 'rgba(204,255,238,0.30)';
            ctx.lineWidth = Math.max(1, radius * 0.20);
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 1.78, radius * (planet.ringSoft ? 0.34 : 0.25), 0, 0, TAU);
            ctx.strokeStyle = planet.ringSoft ? 'rgba(72,180,230,0.13)' : 'rgba(110,220,205,0.18)';
            ctx.lineWidth = Math.max(0.8, radius * 0.10);
            ctx.stroke();
            ctx.restore();
        }

        const surface = ctx.createRadialGradient(x - radius * 0.38, y - radius * 0.42, 0, x, y, radius * 1.12);
        surface.addColorStop(0, rgba(planet.accent, 1));
        surface.addColorStop(0.26, rgba(planet.glow, 0.94));
        surface.addColorStop(0.58, `rgb(${planet.color[0]},${planet.color[1]},${planet.color[2]})`);
        surface.addColorStop(1, `rgb(${planet.shadow[0]},${planet.shadow[1]},${planet.shadow[2]})`);
        ctx.fillStyle = surface;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TAU);
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TAU);
        ctx.clip();

        if (planet.texture === 'gas') {
            for (let i = -5; i <= 5; i += 1) {
                const bandY = y + i * radius * 0.135 + Math.sin(i * 1.9 + planet.phase) * radius * 0.035;
                const bandH = radius * (0.060 + (Math.abs(i) % 3) * 0.018);
                ctx.fillStyle = i % 2 === 0 ? rgba(planet.accent, 0.16) : rgba(planet.shadow, 0.20);
                ctx.beginPath();
                ctx.ellipse(x, bandY, radius * 1.08, bandH, Math.sin(i + planet.phase) * 0.10, 0, TAU);
                ctx.fill();
            }
        } else {
            for (let i = 0; i < 9; i += 1) {
                const seed = planet.phase * 37 + i * 12.9898;
                const px = x + Math.sin(seed) * radius * 0.72;
                const py = y + Math.cos(seed * 1.31) * radius * 0.58;
                const pr = radius * (0.11 + (Math.sin(seed * 0.71) + 1) * 0.075);
                const patch = ctx.createRadialGradient(px, py, 0, px, py, pr);
                const warmAlpha = planet.texture === 'ember' ? 0.22 : 0.13;
                patch.addColorStop(0, planet.texture === 'storm' ? rgba(planet.glow, 0.16) : rgba(planet.accent, warmAlpha));
                patch.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = patch;
                ctx.beginPath();
                ctx.ellipse(px, py, pr * 1.45, pr * 0.72, seed, 0, TAU);
                ctx.fill();
            }
        }

        for (let i = 0; i < 2; i += 1) {
            ctx.strokeStyle = rgba(planet.glow, 0.07 - i * 0.015);
            ctx.lineWidth = Math.max(0.5, radius * (0.030 - i * 0.005));
            ctx.beginPath();
            ctx.ellipse(x - radius * 0.05, y + radius * (-0.22 + i * 0.18), radius * 0.90, radius * 0.16, -0.18, 0, TAU);
            ctx.stroke();
        }

        const terminator = ctx.createLinearGradient(x - radius * 0.78, y - radius * 0.78, x + radius * 0.82, y + radius * 0.86);
        terminator.addColorStop(0, 'rgba(0,0,0,0)');
        terminator.addColorStop(0.45, 'rgba(0,0,0,0.08)');
        terminator.addColorStop(0.78, rgba(planet.shadow, 0.62));
        terminator.addColorStop(1, rgba(planet.shadow, 0.92));
        ctx.fillStyle = terminator;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TAU);
        ctx.fill();

        const highlight = ctx.createRadialGradient(x - radius * 0.42, y - radius * 0.42, 0, x - radius * 0.42, y - radius * 0.42, radius * 0.54);
        highlight.addColorStop(0, 'rgba(255,255,255,0.22)');
        highlight.addColorStop(0.32, rgba(planet.accent, 0.13));
        highlight.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = highlight;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TAU);
        ctx.fill();

        ctx.restore();

        const rim = ctx.createRadialGradient(x, y, radius * 0.76, x, y, radius * 1.08);
        rim.addColorStop(0, 'rgba(0,0,0,0)');
        rim.addColorStop(0.72, rgba(planet.glow, 0.13));
        rim.addColorStop(1, rgba(planet.accent, 0.30));
        ctx.fillStyle = rim;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.08, 0, TAU);
        ctx.fill();

        ctx.strokeStyle = rgba(planet.glow, 0.28);
        ctx.lineWidth = Math.max(0.7, radius * 0.035);
        ctx.beginPath();
        ctx.arc(x, y, radius, -2.65, 0.76);
        ctx.stroke();

        if (planet.ring) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-0.20);
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 2.36, radius * (planet.ringSoft ? 0.48 : 0.36), 0, 0, Math.PI);
            ctx.strokeStyle = planet.ringSoft ? 'rgba(198,255,255,0.24)' : 'rgba(226,255,238,0.34)';
            ctx.lineWidth = Math.max(1, radius * 0.17);
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 1.78, radius * (planet.ringSoft ? 0.34 : 0.25), 0, 0, Math.PI);
            ctx.strokeStyle = 'rgba(90,220,220,0.14)';
            ctx.lineWidth = Math.max(0.7, radius * 0.08);
            ctx.stroke();
            ctx.restore();
        }

        if (planet.moon) {
            const moonAngle = time * 0.55;
            ctx.fillStyle = 'rgba(225,245,248,0.82)';
            ctx.beginPath();
            ctx.arc(x + Math.cos(moonAngle) * radius * 1.8, y + Math.sin(moonAngle) * radius * 0.72, Math.max(1, radius * 0.15), 0, TAU);
            ctx.fill();
        }

        ctx.restore();
    }

    function drawSolarSystem() {
        const mobile = width / dpr < 720;
        const base = Math.min(width, height);
        const sunX = width * 0.50;
        const sunY = height * (mobile ? 0.73 : 0.70);
        const sunR = base * (mobile ? 0.038 : 0.048) * (1 + Math.sin(time * 0.24) * 0.035);
        const layout = mobile ? [
            [0.43, 0.77, 0.011, 5, 5],
            [0.58, 0.73, 0.016, 7, 4],
            [0.29, 0.55, 0.030, 6, 4],
            [0.74, 0.58, 0.015, 7, 5],
            [0.68, 0.82, 0.036, 5, 4],
            [0.32, 0.83, 0.038, 6, 4],
            [0.79, 0.70, 0.023, 7, 5],
            [0.20, 0.70, 0.022, 6, 5]
        ] : [
            [0.50, 0.66, 0.011, 10, 5],
            [0.60, 0.63, 0.016, 12, 6],
            [0.30, 0.28, 0.040, 8, 5],
            [0.97, 0.43, 0.026, 14, 6],
            [0.83, 0.22, 0.056, 9, 6],
            [0.20, 0.28, 0.050, 11, 5],
            [0.70, 0.76, 0.030, 12, 5],
            [0.40, 0.77, 0.022, 10, 6]
        ];

        ctx.save();
        ctx.globalAlpha = mobile ? 0.68 : 0.74;

        const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 8.5);
        sunGlow.addColorStop(0, 'rgba(236,255,255,0.78)');
        sunGlow.addColorStop(0.20, 'rgba(103,232,224,0.26)');
        sunGlow.addColorStop(1, 'rgba(45,151,218,0)');
        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR * 8.5, 0, TAU);
        ctx.fill();

        ctx.fillStyle = 'rgba(244,255,255,0.92)';
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR, 0, TAU);
        ctx.fill();

        layout.forEach(([xRatio, yRatio, sizeRatio, driftX, driftY], index) => {
            const planet = planets[index];
            const phase = planet.phase + time * planet.speed;
            const x = width * xRatio + Math.cos(phase) * driftX * dpr;
            const y = height * yRatio + Math.sin(phase * 0.9) * driftY * dpr;
            const radius = Math.max(1.6 * dpr, base * sizeRatio);
            drawScenePlanet(planet, x, y, radius, index > 3 ? 0.78 : 0.88);
        });
        ctx.restore();
    }

    function drawLetterboxBlend() {
        const edge = ctx.createLinearGradient(0, 0, 0, height);
        edge.addColorStop(0, 'rgba(0,0,0,0.82)');
        edge.addColorStop(0.12, 'rgba(0,0,0,0)');
        edge.addColorStop(0.84, 'rgba(0,0,0,0)');
        edge.addColorStop(1, 'rgba(0,0,0,0.86)');
        ctx.fillStyle = edge;
        ctx.fillRect(0, 0, width, height);

        const side = ctx.createLinearGradient(0, 0, width, 0);
        side.addColorStop(0, 'rgba(0,0,0,0.54)');
        side.addColorStop(0.13, 'rgba(0,0,0,0)');
        side.addColorStop(0.86, 'rgba(0,0,0,0)');
        side.addColorStop(1, 'rgba(0,0,0,0.54)');
        ctx.fillStyle = side;
        ctx.fillRect(0, 0, width, height);
    }

    function render(now) {
        const delta = Math.min(0.05, (now - lastFrame) / 1000);
        lastFrame = now;

        if (visible) {
            time = now * 0.001;

            if (staticBackdrop) {
                ctx.drawImage(staticBackdrop, 0, 0);
            } else {
                drawBackground();
                drawNebulae();
                drawCore();
                drawDust();
                drawStars(delta);
                drawTextSafeVeil();
            }
            drawSolarSystem();
            drawLetterboxBlend();
        }

        requestAnimationFrame(render);
    }

    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(resize, 120);
    });

    document.addEventListener('visibilitychange', () => {
        visible = !document.hidden;
        lastFrame = performance.now();
    });

    resize();
    requestAnimationFrame(render);
}());
