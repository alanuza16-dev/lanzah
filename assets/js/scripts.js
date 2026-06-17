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
   LANZAH HERO — Sistema Solar Cinematográfico
   ========================================= */
(function initHeroGalaxy(){
    const canvas=document.getElementById('lanzahHeroCinemaGalaxy');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    let W,H,cx,cy,stars=[],shooting=[],planets=[],belt=[];
    let t=0,tabVisible=true,resizeTimer,grainPat;
    let cam={x:0,y:0},camT={x:0,y:0},isDrag=false,dragP={x:0,y:0},ptId=null;
    const PI2=Math.PI*2,PI=Math.PI;
    const SC_W=[[255,248,218],[255,238,185],[255,252,235],[250,222,148],[255,210,160]];
    const SC_B=[[200,215,255],[182,202,255],[220,234,255],[0,220,255],[230,245,255]];
    const SC_F=[[170,185,225],[200,215,250],[155,172,210],[140,150,195]];
    const rnd=(a,b)=>a+Math.random()*(b-a);

    function initGrain(){
        const gc=document.createElement('canvas');gc.width=256;gc.height=256;
        const g=gc.getContext('2d'),id=g.createImageData(256,256),d=id.data;
        for(let i=0;i<d.length;i+=4){const v=Math.random()*255;d[i]=d[i+1]=d[i+2]=v;d[i+3]=20;}
        g.putImageData(id,0,0); grainPat=ctx.createPattern(gc,'repeat');
    }

    function initStars(){
        const N=W>1400?6000:W>800?4000:2400; stars=[];
        for(let i=0;i<N;i++){
            const inBand=Math.random()<.48,x=rnd(-W*.05,W*1.05);
            const y=inBand?cy+rnd(-H*.25,H*.25)*Math.random():rnd(-H*.05,H*1.05);
            const br=Math.random()>.93,pool=inBand?(Math.random()<.38?SC_W:SC_B):SC_F;
            const C=pool[Math.floor(Math.random()*pool.length)];
            const spd=rnd(.0006,.005),gcx=cx*.55,gcy=cy*1.4;
            const ang=Math.atan2(y-gcy,x-gcx)+PI/2;
            stars.push({x:Math.max(-W*.1,Math.min(W*1.1,x)),y:Math.max(-H*.1,Math.min(H*1.1,y)),C,
                vx:Math.cos(ang)*spd*(inBand?.50:.20),vy:Math.sin(ang)*spd*(inBand?.28:.10),
                r:inBand?(br?rnd(.9,2.4):rnd(.12,.80)):rnd(.06,.50),
                al:inBand?rnd(.30,.95):rnd(.03,.48),
                tw:rnd(0,PI2),ts:rnd(.0008,.008),flare:br&&inBand,pf:inBand?.010:.022});
        }
    }

    function initBelt(){
        const sR=Math.min(W,H)*.44,N=W>1400?180:W>800?120:65; belt=[];
        for(let i=0;i<N;i++) belt.push({a:rnd(0,PI2),d:sR*rnd(.45,.52),dA:rnd(.005,.025),r:rnd(.3,1.1),al:rnd(.12,.42),e:rnd(.48,.58)});
    }

    function initPlanets(){
        const sR=Math.min(W,H)*.44,S=Math.min(W,H),P=[
            [.12,.065,0,.006,[140,128,118],[200,192,182],[160,150,140],0,.52,.006,0],
            [.20,.110,.80,.013,[178,142,62],[235,205,130],[210,178,100],0,.37,.008,0],
            [.29,.158,2.1,.014,[45,95,145],[80,160,155],[64,161,157],0,.25,.010,1],
            [.40,.218,1.3,.009,[162,68,32],[218,118,72],[195,95,55],0,.175,.012,2],
            [.54,.295,4.5,.030,[152,118,68],[210,175,125],[185,152,100],0,.090,.016,3],
            [.67,.368,2.8,.026,[175,150,95],[222,198,148],[195,170,118],1,.060,.020,4],
            [.80,.440,.50,.018,[82,168,162],[130,205,198],[100,161,157],2,.038,.024,0],
            [.93,.512,3.6,.017,[32,62,175],[65,120,210],[50,100,195],0,.024,.028,5]];
        const ringD=[0,0,0,0,0,{t:.32,c:[195,172,122]},{t:.06,c:[100,161,157]},0];
        planets=P.map(([ax,ay,ph,r,col,hi,atm,ri,spd,pf,bands],i)=>{
            const o={bx:cx,by:cy,ax:sR*ax,ay:sR*ay,ph,r:S*r,col,hi,atm,ring:!!ringD[i],spd,pf,tr:[],bands};
            if(ringD[i]){o.ringTilt=ringD[i].t;o.rCol=ringD[i].c;} return o;
        });
    }
    function pPos(p){const a=p.ph+t*p.spd;return{bx:p.bx+Math.cos(a)*p.ax,by:p.by+Math.sin(a)*p.ay};}
    function drawBg(){ctx.fillStyle='rgba(0,0,4,.90)';ctx.fillRect(0,0,W,H);}

    const NEB=[[.48,.50,.36,.19,'28,148,212',.040],[.54,.48,.25,.13,'0,188,230',.030],
        [.36,.44,.22,.12,'0,78,158',.048],[.64,.54,.17,.09,'0,155,198',.026],
        [.28,.56,.15,.08,'8,55,138',.036],[.74,.40,.14,.07,'0,198,248',.020],
        [.42,.46,.20,.14,'158,42,82',.022],[.58,.52,.16,.10,'128,58,148',.018],
        [.32,.50,.18,.11,'185,95,42',.016]];
    function drawNebulae(){NEB.forEach(([bx,by,rx,ry,c,a])=>{
        const scY=ry/rx,gx=W*bx+cam.x*.6,gy=(H*by+cam.y*.6)/scY;
        const g=ctx.createRadialGradient(gx,gy,0,gx,gy,W*rx);
        g.addColorStop(0,`rgba(${c},${a})`);g.addColorStop(.38,`rgba(${c},${a*.16})`);g.addColorStop(1,'transparent');
        ctx.save();ctx.scale(1,scY);ctx.fillStyle=g;ctx.fillRect(0,0,W,H/scY*1.2);ctx.restore();
    });}
    function drawDustLanes(){
        const gcx=cx*.55+cam.x*.4,gcy=cy*1.38+cam.y*.4;
        ctx.save();ctx.globalCompositeOperation='multiply';
        for(let i=0;i<3;i++){const ang=-.18+i*.12,sp=H*(.06+i*.03),len=W*.8;
            ctx.save();ctx.translate(gcx,gcy);ctx.rotate(ang);const dg=ctx.createLinearGradient(-len,0,len,0);
            dg.addColorStop(0,'transparent');dg.addColorStop(.2,'rgba(8,5,15,.30)');dg.addColorStop(.5,'rgba(4,2,8,.40)');dg.addColorStop(.8,'rgba(8,5,15,.30)');dg.addColorStop(1,'transparent');
            ctx.fillStyle=dg;ctx.fillRect(-len,-sp,len*2,sp*2);ctx.restore();}
        ctx.restore();
    }
    function drawGalaxyCore(){
        const gcx=cx*.55+cam.x*.5,gcy=cy*1.38+cam.y*.5,pulse=1+.028*Math.sin(t*1.4);
        const cR=Math.min(W,H)*.30*pulse;
        [[cR,'rgba(18,55,135,.06)'],[cR*.55,'rgba(38,92,180,.10)'],[cR*.28,'rgba(205,158,52,.18)'],
         [cR*.12,'rgba(252,212,118,.35)'],[cR*.045,'rgba(255,248,205,.75)'],[cR*.010,'rgba(255,255,255,.95)']
        ].forEach(([r,col])=>{
            const g=ctx.createRadialGradient(gcx,gcy,0,gcx,gcy,r);
            g.addColorStop(0,col);g.addColorStop(1,'transparent');
            ctx.fillStyle=g;ctx.save();ctx.scale(1,.46);
            ctx.beginPath();ctx.arc(gcx,gcy/.46,r,0,PI2);ctx.fill();ctx.restore();
        });
        ctx.save();ctx.globalAlpha=.11+.06*Math.sin(t*1.2);
        for(let i=0;i<8;i++){const rot=i*PI/4+t*.08+Math.sin(t*.3+i)*.15,len=cR*(.5+.2*Math.sin(t*.6+i*1.2));
            ctx.save();ctx.translate(gcx,gcy);ctx.rotate(rot);ctx.scale(1,.46);const rg=ctx.createLinearGradient(0,0,len,0);
            rg.addColorStop(0,'rgba(255,232,165,.55)');rg.addColorStop(.5,'rgba(255,210,120,.10)');rg.addColorStop(1,'transparent');
            ctx.fillStyle=rg;ctx.beginPath();ctx.moveTo(0,-cR*.015);ctx.lineTo(len,0);ctx.lineTo(0,cR*.015);ctx.fill();ctx.restore();}
        ctx.restore();
        ctx.save();ctx.globalAlpha=.32+.14*Math.sin(t*2);
        [[cR*.52,0,'rgba(255,246,202,.72)'],[cR*.34,PI/4,'rgba(255,238,175,.52)']].forEach(([len,rot,c])=>{
            ctx.save();ctx.translate(gcx,gcy);ctx.rotate(rot);
            const sg=ctx.createLinearGradient(-len,0,len,0);
            sg.addColorStop(0,'transparent');sg.addColorStop(.5,c);sg.addColorStop(1,'transparent');
            ctx.strokeStyle=sg;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-len,0);ctx.lineTo(len,0);ctx.stroke();ctx.restore();
        });ctx.restore();
    }

    function drawSun(){
        const pcx=cx+cam.x*.004,pcy=cy+cam.y*.004,sR=Math.min(W,H)*.018;
        [[sR*12,'rgba(255,200,80,.020)'],[sR*6,'rgba(255,215,100,.06)'],[sR*2.8,'rgba(255,232,128,.20)'],
         [sR*.9,'rgba(255,252,195,.85)'],[sR*.22,'rgba(255,255,255,1.0)']
        ].forEach(([r,col])=>{
            const g=ctx.createRadialGradient(pcx,pcy,0,pcx,pcy,r);
            g.addColorStop(0,col);g.addColorStop(1,'transparent');
            ctx.fillStyle=g;ctx.beginPath();ctx.arc(pcx,pcy,r,0,PI2);ctx.fill();
        });
        ctx.save();ctx.globalAlpha=.58+.22*Math.sin(t*1.8);
        [0,PI/4,PI/8].forEach(rot=>{
            ctx.save();ctx.translate(pcx,pcy);ctx.rotate(rot);
            const sg=ctx.createLinearGradient(-sR*10,0,sR*10,0);
            sg.addColorStop(0,'transparent');sg.addColorStop(.5,'rgba(255,248,180,.88)');sg.addColorStop(1,'transparent');
            ctx.strokeStyle=sg;ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(-sR*10,0);ctx.lineTo(sR*10,0);ctx.stroke();ctx.restore();
        });ctx.restore();
        const fW=W*.55,fH=sR*1.6;
        ctx.save();ctx.globalAlpha=.26+.10*Math.sin(t*2.2);
        const af=ctx.createLinearGradient(pcx-fW,pcy,pcx+fW,pcy);
        af.addColorStop(0,'transparent');af.addColorStop(.15,'rgba(80,160,255,.08)');
        af.addColorStop(.35,'rgba(180,220,255,.22)');af.addColorStop(.5,'rgba(255,250,220,.48)');
        af.addColorStop(.65,'rgba(255,200,120,.22)');af.addColorStop(.85,'rgba(255,120,60,.08)');af.addColorStop(1,'transparent');
        ctx.fillStyle=af;ctx.fillRect(pcx-fW,pcy-fH/2,fW*2,fH);
        const af2=ctx.createLinearGradient(pcx-fW*.7,pcy,pcx+fW*.7,pcy);
        af2.addColorStop(0,'transparent');af2.addColorStop(.4,'rgba(255,255,255,.18)');
        af2.addColorStop(.5,'rgba(255,255,255,.32)');af2.addColorStop(.6,'rgba(255,255,255,.18)');af2.addColorStop(1,'transparent');
        ctx.fillStyle=af2;ctx.fillRect(pcx-fW*.7,pcy-fH*.18,fW*1.4,fH*.36);ctx.restore();
        ctx.save();ctx.globalAlpha=.05+.03*Math.sin(t*1.5);
        [[.22,18,'120,180,255'],[-.15,12,'255,200,120'],[.35,8,'100,200,255']].forEach(([off,sz,col])=>{
            const gx=pcx+fW*off,gy=pcy+fH*off*.3;
            const gg=ctx.createRadialGradient(gx,gy,0,gx,gy,sz);
            gg.addColorStop(0,`rgba(${col},.35)`);gg.addColorStop(.6,`rgba(${col},.08)`);gg.addColorStop(1,'transparent');
            ctx.fillStyle=gg;ctx.beginPath();ctx.arc(gx,gy,sz,0,PI2);ctx.fill();
        });ctx.restore();
    }

    function updateAndDrawStars(){const ox=cam.x,oy=cam.y;
        stars.forEach(s=>{s.x+=s.vx;s.y+=s.vy;
            if(s.x>W*1.1)s.x-=W*1.2;else if(s.x<-W*.1)s.x+=W*1.2;
            if(s.y>H*1.1)s.y-=H*1.2;else if(s.y<-H*.1)s.y+=H*1.2;
            s.tw+=s.ts;const a=s.al*(0.48+0.52*Math.sin(s.tw)),sx=s.x+ox*s.pf,sy=s.y+oy*s.pf;
            ctx.beginPath();ctx.arc(sx,sy,s.r,0,PI2);
            ctx.fillStyle=`rgba(${s.C[0]},${s.C[1]},${s.C[2]},${a.toFixed(2)})`;ctx.fill();
            if(s.flare){ctx.save();ctx.globalAlpha=a*.50;ctx.lineWidth=.55;const len=s.r*5.5;
                [[sx-len,sy,sx+len,sy],[sx,sy-len,sx,sy+len]].forEach(([x1,y1,x2,y2])=>{const sg=ctx.createLinearGradient(x1,y1,x2,y2);
                    sg.addColorStop(0,'transparent');sg.addColorStop(.5,`rgb(${s.C[0]},${s.C[1]},${s.C[2]})`);sg.addColorStop(1,'transparent');
                    ctx.strokeStyle=sg;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();});ctx.restore();}
        });}
    function drawBelt(){const ox=cam.x*.014,oy=cam.y*.014;ctx.fillStyle='rgba(160,150,140,.35)';
        belt.forEach(a=>{a.a+=a.dA*.007;ctx.beginPath();ctx.arc(cx+Math.cos(a.a)*a.d+ox,cy+Math.sin(a.a)*a.d*a.e+oy,a.r,0,PI2);ctx.fill();});}
    function drawTrail(p){const tr=p.tr;if(tr.length<2)return;const ox=cam.x*p.pf,oy=cam.y*p.pf;
        for(let i=1;i<tr.length;i++){const f=i/tr.length;ctx.beginPath();ctx.moveTo(tr[i-1].x+ox,tr[i-1].y+oy);ctx.lineTo(tr[i].x+ox,tr[i].y+oy);
            ctx.strokeStyle=`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},${f*.30})`;ctx.lineWidth=Math.max(.3,p.r*f*.14);ctx.stroke();}}
    function drawPlanet(p){
        const{bx,by}=pPos(p);
        p.tr.push({x:bx,y:by});if(p.tr.length>50)p.tr.shift();
        const r=p.r,ox=cam.x*p.pf,oy=cam.y*p.pf,px=bx+ox,py=by+oy;
        drawTrail(p);
        const atm=ctx.createRadialGradient(px,py,r*.82,px,py,r*1.45);
        atm.addColorStop(0,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.18)`);atm.addColorStop(1,'transparent');
        ctx.fillStyle=atm;ctx.beginPath();ctx.arc(px,py,r*1.45,0,PI2);ctx.fill();
        if(p.ring){const rC=p.rCol;ctx.save();ctx.translate(px,py);ctx.rotate(-p.ringTilt);
            for(let i=3;i>=1;i--){ctx.beginPath();ctx.ellipse(0,0,r*(1.6+i*.26),r*(.26+i*.06),0,0,PI2);ctx.strokeStyle=`rgba(${rC[0]},${rC[1]},${rC[2]},${.07+i*.06})`;ctx.lineWidth=r*(.08+i*.04);ctx.stroke();}
            ctx.restore();}
        const mid=[Math.round((p.hi[0]+p.col[0])*.5),Math.round((p.hi[1]+p.col[1])*.5),Math.round((p.hi[2]+p.col[2])*.5)];
        const lg=ctx.createRadialGradient(px+r*.38,py-r*.38,0,px,py,r);
        lg.addColorStop(0,`rgb(${p.hi[0]},${p.hi[1]},${p.hi[2]})`);lg.addColorStop(.40,`rgb(${mid[0]},${mid[1]},${mid[2]})`);lg.addColorStop(1,`rgb(${p.col[0]},${p.col[1]},${p.col[2]})`);
        ctx.save();ctx.beginPath();ctx.arc(px,py,r,0,PI2);ctx.clip();
        ctx.fillStyle=lg;ctx.fillRect(px-r,py-r,r*2,r*2);
        if(p.bands===1){ctx.globalAlpha=.12;ctx.fillStyle='rgba(40,110,100,.6)';
            ctx.fillRect(px-r,py-r*.15,r*2,r*.22);ctx.fillRect(px-r,py+r*.25,r*2,r*.18);
            ctx.fillStyle='rgba(255,255,255,.25)';ctx.beginPath();ctx.arc(px+r*.15,py-r*.65,r*.22,0,PI2);ctx.fill();}
        if(p.bands===2){ctx.globalAlpha=.15;ctx.fillStyle='rgba(255,220,180,.35)';
            ctx.beginPath();ctx.arc(px+r*.1,py-r*.72,r*.18,0,PI2);ctx.fill();}
        if(p.bands>=3&&p.bands<=4){ctx.globalAlpha=.16;
            const bN=p.bands===3?6:5,bC=p.bands===3?[140,105,60]:[165,140,85];
            for(let i=0;i<bN;i++){const yy=py-r+r*2*(i/(bN-1)),bh=r*(.08+.04*Math.sin(i*2.1));
                ctx.fillStyle=`rgba(${bC[0]+(i%2)*25},${bC[1]+(i%2)*20},${bC[2]+(i%2)*15},.${3+i%3})`;
                ctx.fillRect(px-r,yy-bh/2,r*2,bh);}}
        if(p.bands===5){ctx.globalAlpha=.14;ctx.fillStyle='rgba(30,55,160,.4)';
            ctx.fillRect(px-r,py+r*.2,r*2,r*.15);ctx.fillRect(px-r,py-r*.4,r*2,r*.12);}
        ctx.restore();
        const sh=ctx.createRadialGradient(px-r*.30,py+r*.30,0,px,py,r);
        sh.addColorStop(.35,'transparent');sh.addColorStop(1,'rgba(0,0,0,.86)');
        ctx.beginPath();ctx.arc(px,py,r,0,PI2);ctx.fillStyle=sh;ctx.fill();
        const rim=ctx.createRadialGradient(px,py,r*.78,px,py,r*1.05);
        rim.addColorStop(0,'transparent');rim.addColorStop(1,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.28)`);
        ctx.beginPath();ctx.arc(px,py,r*1.05,0,PI2);ctx.fillStyle=rim;ctx.fill();
        if(p.ring){const rC=p.rCol;ctx.save();ctx.translate(px,py);ctx.rotate(-p.ringTilt);ctx.beginPath();ctx.ellipse(0,0,r*2.2,r*.48,0,PI,PI2);ctx.strokeStyle=`rgba(${rC[0]},${rC[1]},${rC[2]},.28)`;ctx.lineWidth=r*.18;ctx.stroke();ctx.restore();}
    }

    function tickShootingStars(){
        if(Math.random()<.004&&shooting.length<4) shooting.push({x:rnd(W*.05,W*.75),y:rnd(0,H*.50),vx:rnd(5,13),vy:rnd(.2,2.2),al:1,C:Math.random()<.15?[rnd(180,255),rnd(200,255),rnd(140,200)]:[200,235,255]});
        shooting=shooting.filter(s=>s.al>0);
        shooting.forEach(s=>{const m=Math.hypot(s.vx,s.vy),nx=s.vx/m,ny=s.vy/m,len=m*16;
            const tail=ctx.createLinearGradient(s.x-nx*len,s.y-ny*len,s.x,s.y);
            tail.addColorStop(0,'transparent');tail.addColorStop(.5,`rgba(${s.C[0]},${s.C[1]},${s.C[2]},${s.al*.5})`);tail.addColorStop(1,`rgba(255,255,255,${s.al})`);
            ctx.strokeStyle=tail;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(s.x-nx*len,s.y-ny*len);ctx.lineTo(s.x,s.y);ctx.stroke();
            s.x+=s.vx;s.y+=s.vy;s.al-=.014;});}
    function postProcess(){const vg=ctx.createRadialGradient(cx,cy,Math.min(W,H)*.30,cx,cy,Math.max(W,H)*.72);
        vg.addColorStop(0,'transparent');vg.addColorStop(.65,'rgba(0,0,0,.20)');vg.addColorStop(1,'rgba(0,0,0,.65)');
        ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
        if(grainPat){ctx.save();ctx.globalAlpha=.038;ctx.fillStyle=grainPat;ctx.fillRect(0,0,W,H);ctx.restore();}}
    function resize(){
        const st=canvas.parentElement,dpr=Math.min(window.devicePixelRatio||1,2);
        const sw=st.offsetWidth||window.innerWidth,sh=st.offsetHeight||window.innerHeight;
        W=sw*dpr;H=sh*dpr;canvas.width=W;canvas.height=H;
        canvas.style.width=sw+'px';canvas.style.height=sh+'px';
        cx=W/2;cy=H/2;initStars();initPlanets();initBelt();initGrain();
    }

    const stage=canvas.parentElement;
    stage.addEventListener('pointerdown',e=>{ptId=e.pointerId;isDrag=true;dragP={x:e.clientX,y:e.clientY};},{passive:true});
    stage.addEventListener('pointermove',e=>{if(!isDrag||e.pointerId!==ptId)return;const dpr=Math.min(window.devicePixelRatio||1,2);
        camT.x+=(e.clientX-dragP.x)*dpr;camT.y+=(e.clientY-dragP.y)*dpr;
        camT.x=Math.max(-W*.45,Math.min(W*.45,camT.x));camT.y=Math.max(-H*.45,Math.min(H*.45,camT.y));dragP={x:e.clientX,y:e.clientY};},{passive:true});
    stage.addEventListener('pointerup',()=>{isDrag=false;ptId=null;});
    stage.addEventListener('pointerleave',()=>{isDrag=false;ptId=null;});
    function frame(){if(tabVisible){t+=.007;
            if(!isDrag){camT.x+=Math.sin(t*.15)*.12;camT.y+=Math.cos(t*.11)*.08;camT.x*=.984;camT.y*=.984;}
            cam.x+=(camT.x-cam.x)*.07;cam.y+=(camT.y-cam.y)*.07;
            drawBg();drawNebulae();drawDustLanes();drawGalaxyCore();
            updateAndDrawStars();drawBelt();drawSun();planets.forEach(drawPlanet);
            tickShootingStars();postProcess();}requestAnimationFrame(frame);}
    document.addEventListener('visibilitychange',()=>{tabVisible=!document.hidden;});
    window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,150);});resize();requestAnimationFrame(frame);
}());
