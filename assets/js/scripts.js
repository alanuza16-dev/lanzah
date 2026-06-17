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