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
   LANZAH HERO — Sistema Solar · Vía Láctea
   ========================================= */
(function initHeroGalaxy() {
    const canvas = document.getElementById('lanzahHeroCinemaGalaxy');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy, stars = [], shooting = [], planets = [];
    let t = 0, tabVisible = true, resizeTimer;
    let cam={x:0,y:0}, camT={x:0,y:0}, isDrag=false, dragP={x:0,y:0}, ptId=null;
    const PI2=Math.PI*2;
    const SC_WARM=[[255,248,218],[255,238,185],[255,252,235],[250,222,148]];
    const SC_BLUE=[[200,215,255],[182,202,255],[220,234,255],[0,220,255],[230,245,255]];
    const SC_FAINT=[[170,185,225],[200,215,250],[155,172,210]];
    const rnd=(a,b)=>a+Math.random()*(b-a);

    function initStars(){
        const N=W>1400?5200:W>800?3400:2000; stars=[];
        for(let i=0;i<N;i++){
            const inBand=Math.random()<.45;
            const x=rnd(-W*.05,W*1.05);
            const y=inBand?cy+rnd(-H*.22,H*.22)*Math.random():rnd(-H*.05,H*1.05);
            mkS(x,y,inBand);
        }
    }
    function mkS(x,y,warm){
        const br=Math.random()>.94,pool=warm?(Math.random()<.4?SC_WARM:SC_BLUE):SC_FAINT;
        const C=pool[Math.floor(Math.random()*pool.length)];
        const spd=rnd(.0008,.006),gcx=cx*.55,gcy=cy*1.4;
        const ang=Math.atan2(y-gcy,x-gcx)+Math.PI/2;
        stars.push({x:Math.max(-W*.1,Math.min(W*1.1,x)),y:Math.max(-H*.1,Math.min(H*1.1,y)),C,
            vx:Math.cos(ang)*spd*(warm?.55:.22),vy:Math.sin(ang)*spd*(warm?.30:.12),
            r:warm?(br?rnd(.8,2.2):rnd(.14,.85)):rnd(.08,.55),
            al:warm?rnd(.28,.92):rnd(.04,.52),
            tw:rnd(0,PI2),ts:rnd(.001,.009),flare:br&&warm,pf:warm?.010:.022});
    }

    function initPlanets(){
        const sR=Math.min(W,H)*.44,S=Math.min(W,H);
        planets=[
            {bx:cx,by:cy,ax:sR*.12,ay:sR*.065,ph:0,    r:S*.006,col:[130,118,108],hi:[195,185,175],atm:[150,140,130],ring:false,spd:.52, pf:.006,tr:[]},
            {bx:cx,by:cy,ax:sR*.20,ay:sR*.110,ph:.80,   r:S*.013,col:[195,158,80], hi:[242,212,145],atm:[220,190,120],ring:false,spd:.37, pf:.008,tr:[]},
            {bx:cx,by:cy,ax:sR*.29,ay:sR*.158,ph:2.1,   r:S*.014,col:[28,78,168],  hi:[78,162,228], atm:[0,155,255],  ring:false,spd:.25, pf:.010,tr:[]},
            {bx:cx,by:cy,ax:sR*.40,ay:sR*.218,ph:1.3,   r:S*.009,col:[155,55,22],  hi:[215,108,68], atm:[190,88,52],  ring:false,spd:.175,pf:.012,tr:[]},
            {bx:cx,by:cy,ax:sR*.54,ay:sR*.295,ph:4.5,   r:S*.030,col:[162,122,72], hi:[218,182,132],atm:[198,162,108],ring:false,spd:.090,pf:.016,tr:[]},
            {bx:cx,by:cy,ax:sR*.67,ay:sR*.368,ph:2.8,   r:S*.026,col:[182,156,98], hi:[228,200,152],atm:[200,175,122],ring:true,ringTilt:.32,rCol:[205,178,128],spd:.060,pf:.020,tr:[]},
            {bx:cx,by:cy,ax:sR*.80,ay:sR*.440,ph:.50,   r:S*.018,col:[95,182,192], hi:[148,218,228],atm:[112,208,218],ring:true,ringTilt:.06,rCol:[140,218,228],spd:.038,pf:.024,tr:[]},
            {bx:cx,by:cy,ax:sR*.93,ay:sR*.512,ph:3.6,   r:S*.017,col:[22,72,198],  hi:[72,135,252], atm:[45,92,228],  ring:false,spd:.024,pf:.028,tr:[]},
        ];
    }
    function pPos(p){const a=p.ph+t*p.spd;return{bx:p.bx+Math.cos(a)*p.ax,by:p.by+Math.sin(a)*p.ay};}

    function drawBg(){ctx.fillStyle='rgba(0,0,4,.92)';ctx.fillRect(0,0,W,H);}

    const NEB=[[.48,.50,.36,.19,'28,148,212',.040],[.54,.48,.25,.13,'0,188,230',.030],
               [.36,.44,.22,.12,'0,78,158',.048],[.64,.54,.17,.09,'0,155,198',.026],
               [.28,.56,.15,.08,'8,55,138',.036],[.74,.40,.14,.07,'0,198,248',.020]];
    function drawNebulae(){
        NEB.forEach(([bx,by,rx,ry,c,a])=>{
            const scY=ry/rx,gx=W*bx+cam.x*.6,gy=(H*by+cam.y*.6)/scY;
            const g=ctx.createRadialGradient(gx,gy,0,gx,gy,W*rx);
            g.addColorStop(0,`rgba(${c},${a})`); g.addColorStop(.38,`rgba(${c},${a*.16})`); g.addColorStop(1,'transparent');
            ctx.save(); ctx.scale(1,scY); ctx.fillStyle=g; ctx.fillRect(0,0,W,H/scY*1.2); ctx.restore();
        });
    }

    function drawGalaxyCore(){
        const gcx=cx*.55+cam.x*.5,gcy=cy*1.38+cam.y*.5,pulse=1+.022*Math.sin(t*1.4);
        const cR=Math.min(W,H)*.28*pulse;
        [[cR,'rgba(18,55,135,.05)'],[cR*.58,'rgba(38,92,180,.09)'],[cR*.29,'rgba(205,158,52,.15)'],
         [cR*.13,'rgba(252,212,118,.30)'],[cR*.048,'rgba(255,248,205,.70)'],[cR*.012,'rgba(255,255,255,.92)']
        ].forEach(([r,col])=>{
            const g=ctx.createRadialGradient(gcx,gcy,0,gcx,gcy,r);
            g.addColorStop(0,col); g.addColorStop(1,'transparent');
            ctx.fillStyle=g; ctx.save(); ctx.scale(1,.48);
            ctx.beginPath(); ctx.arc(gcx,gcy/.48,r,0,PI2); ctx.fill(); ctx.restore();
        });
        ctx.save(); ctx.globalAlpha=.30+.12*Math.sin(t*2);
        [[cR*.48,0,'rgba(255,246,202,.72)'],[cR*.30,Math.PI/4,'rgba(255,238,175,.52)']].forEach(([len,rot,c])=>{
            ctx.save(); ctx.translate(gcx,gcy); ctx.rotate(rot);
            const sg=ctx.createLinearGradient(-len,0,len,0);
            sg.addColorStop(0,'transparent'); sg.addColorStop(.5,c); sg.addColorStop(1,'transparent');
            ctx.strokeStyle=sg; ctx.lineWidth=1.0; ctx.beginPath(); ctx.moveTo(-len,0); ctx.lineTo(len,0); ctx.stroke();
            ctx.restore();
        }); ctx.restore();
    }

    function drawSun(){
        const pcx=cx+cam.x*.004,pcy=cy+cam.y*.004,sR=Math.min(W,H)*.016;
        [[sR*10,'rgba(255,200,80,.025)'],[sR*5,'rgba(255,215,100,.07)'],[sR*2.4,'rgba(255,232,128,.18)'],
         [sR*.8,'rgba(255,252,195,.82)'],[sR*.2,'rgba(255,255,255,1.0)']
        ].forEach(([r,col])=>{
            const g=ctx.createRadialGradient(pcx,pcy,0,pcx,pcy,r);
            g.addColorStop(0,col); g.addColorStop(1,'transparent');
            ctx.fillStyle=g; ctx.beginPath(); ctx.arc(pcx,pcy,r,0,PI2); ctx.fill();
        });
        ctx.save(); ctx.globalAlpha=.55+.20*Math.sin(t*1.8);
        [0,Math.PI/4,Math.PI/8].forEach(rot=>{
            ctx.save(); ctx.translate(pcx,pcy); ctx.rotate(rot);
            const sg=ctx.createLinearGradient(-sR*9,0,sR*9,0);
            sg.addColorStop(0,'transparent'); sg.addColorStop(.5,'rgba(255,248,180,.86)'); sg.addColorStop(1,'transparent');
            ctx.strokeStyle=sg; ctx.lineWidth=.85; ctx.beginPath(); ctx.moveTo(-sR*9,0); ctx.lineTo(sR*9,0); ctx.stroke();
            ctx.restore();
        }); ctx.restore();
    }

    function updateAndDrawStars(){
        const ox=cam.x,oy=cam.y;
        stars.forEach(s=>{
            s.x+=s.vx; s.y+=s.vy;
            if(s.x>W*1.1)s.x-=W*1.2; else if(s.x<-W*.1)s.x+=W*1.2;
            if(s.y>H*1.1)s.y-=H*1.2; else if(s.y<-H*.1)s.y+=H*1.2;
            s.tw+=s.ts; const a=s.al*(0.50+0.50*Math.sin(s.tw));
            const sx=s.x+ox*s.pf,sy=s.y+oy*s.pf;
            ctx.beginPath(); ctx.arc(sx,sy,s.r,0,PI2);
            ctx.fillStyle=`rgba(${s.C[0]},${s.C[1]},${s.C[2]},${a.toFixed(2)})`; ctx.fill();
            if(s.flare){
                ctx.save(); ctx.globalAlpha=a*.48; ctx.lineWidth=.60; const len=s.r*5.0;
                [[sx-len,sy,sx+len,sy],[sx,sy-len,sx,sy+len]].forEach(([x1,y1,x2,y2])=>{
                    const sg=ctx.createLinearGradient(x1,y1,x2,y2);
                    sg.addColorStop(0,'transparent'); sg.addColorStop(.5,`rgb(${s.C[0]},${s.C[1]},${s.C[2]})`); sg.addColorStop(1,'transparent');
                    ctx.strokeStyle=sg; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
                }); ctx.restore();
            }
        });
    }

    function drawTrail(p){
        const tr=p.tr; if(tr.length<2) return;
        const ox=cam.x*p.pf,oy=cam.y*p.pf;
        for(let i=1;i<tr.length;i++){
            const f=i/tr.length;
            ctx.beginPath(); ctx.moveTo(tr[i-1].x+ox,tr[i-1].y+oy); ctx.lineTo(tr[i].x+ox,tr[i].y+oy);
            ctx.strokeStyle=`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},${f*.28})`; ctx.lineWidth=Math.max(.3,p.r*f*.12); ctx.stroke();
        }
    }
    function drawPlanet(p){
        const {bx,by}=pPos(p);
        p.tr.push({x:bx,y:by}); if(p.tr.length>44) p.tr.shift();
        const r=p.r,ox=cam.x*p.pf,oy=cam.y*p.pf,px=bx+ox,py=by+oy;
        drawTrail(p);
        const atm=ctx.createRadialGradient(px,py,r*.85,px,py,r*1.55);
        atm.addColorStop(0,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.22)`); atm.addColorStop(1,'transparent');
        ctx.fillStyle=atm; ctx.beginPath(); ctx.arc(px,py,r*1.55,0,PI2); ctx.fill();
        if(p.ring){
            const rC=p.rCol||[0,210,250];
            ctx.save(); ctx.translate(px,py); ctx.rotate(-p.ringTilt);
            for(let i=3;i>=1;i--){ctx.beginPath();ctx.ellipse(0,0,r*(1.6+i*.26),r*(.26+i*.06),0,0,PI2);ctx.strokeStyle=`rgba(${rC[0]},${rC[1]},${rC[2]},${.09+i*.08})`;ctx.lineWidth=r*(.09+i*.04);ctx.stroke();}
            ctx.restore();
        }
        const mid=[Math.round((p.hi[0]+p.col[0])*.5),Math.round((p.hi[1]+p.col[1])*.5),Math.round((p.hi[2]+p.col[2])*.5)];
        const lg=ctx.createRadialGradient(px+r*.40,py-r*.40,0,px,py,r);
        lg.addColorStop(0,`rgb(${p.hi[0]},${p.hi[1]},${p.hi[2]})`); lg.addColorStop(.42,`rgb(${mid[0]},${mid[1]},${mid[2]})`); lg.addColorStop(1,`rgb(${p.col[0]},${p.col[1]},${p.col[2]})`);
        ctx.beginPath(); ctx.arc(px,py,r,0,PI2); ctx.fillStyle=lg; ctx.fill();
        const sh=ctx.createRadialGradient(px-r*.28,py+r*.28,0,px,py,r);
        sh.addColorStop(.38,'transparent'); sh.addColorStop(1,'rgba(0,0,0,.82)');
        ctx.beginPath(); ctx.arc(px,py,r,0,PI2); ctx.fillStyle=sh; ctx.fill();
        const rim=ctx.createRadialGradient(px,py,r*.80,px,py,r*1.06);
        rim.addColorStop(0,'transparent'); rim.addColorStop(1,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.32)`);
        ctx.beginPath(); ctx.arc(px,py,r*1.06,0,PI2); ctx.fillStyle=rim; ctx.fill();
        if(p.ring){const rC=p.rCol||[0,210,250];ctx.save();ctx.translate(px,py);ctx.rotate(-p.ringTilt);ctx.beginPath();ctx.ellipse(0,0,r*2.1,r*.45,0,Math.PI,PI2);ctx.strokeStyle=`rgba(${rC[0]},${rC[1]},${rC[2]},.28)`;ctx.lineWidth=r*.18;ctx.stroke();ctx.restore();}
    }

    function tickShootingStars(){
        if(Math.random()<.003&&shooting.length<3)
            shooting.push({x:rnd(W*.08,W*.70),y:rnd(0,H*.45),vx:rnd(5,11),vy:rnd(.3,1.8),al:1});
        shooting=shooting.filter(s=>s.al>0);
        shooting.forEach(s=>{
            const m=Math.hypot(s.vx,s.vy),nx=s.vx/m,ny=s.vy/m,len=m*14;
            const tail=ctx.createLinearGradient(s.x-nx*len,s.y-ny*len,s.x,s.y);
            tail.addColorStop(0,'transparent'); tail.addColorStop(.6,`rgba(200,235,255,${s.al*.6})`); tail.addColorStop(1,`rgba(255,255,255,${s.al})`);
            ctx.strokeStyle=tail; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(s.x-nx*len,s.y-ny*len); ctx.lineTo(s.x,s.y); ctx.stroke();
            s.x+=s.vx; s.y+=s.vy; s.al-=.016;
        });
    }

    function resize(){
        const st=canvas.parentElement,dpr=Math.min(window.devicePixelRatio||1,2);
        const sw=st.offsetWidth||window.innerWidth,sh=st.offsetHeight||window.innerHeight;
        W=sw*dpr; H=sh*dpr; canvas.width=W; canvas.height=H;
        canvas.style.width=sw+'px'; canvas.style.height=sh+'px';
        cx=W/2; cy=H/2; initStars(); initPlanets();
    }

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

    function frame(){
        if(tabVisible){
            t+=.007;
            cam.x+=(camT.x-cam.x)*.08; cam.y+=(camT.y-cam.y)*.08;
            if(!isDrag){camT.x*=.982; camT.y*=.982;}
            drawBg(); drawNebulae(); drawGalaxyCore();
            updateAndDrawStars(); drawSun(); planets.forEach(drawPlanet); tickShootingStars();
        }
        requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange',()=>{tabVisible=!document.hidden;});
    window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,150);}); resize(); requestAnimationFrame(frame);
}());
