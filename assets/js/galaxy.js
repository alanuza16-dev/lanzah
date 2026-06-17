/* =========================================
   LANZAH HERO — Sistema Solar Showcase
   Texturas procedurales · iluminación solar
   rotación axial · Tierra viva · Saturno pro
   ========================================= */
(function initHeroGalaxy(){
    const canvas=document.getElementById('lanzahHeroCinemaGalaxy');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    let W,H,cx,cy,RX,RY,stars=[],shooting=[],planets=[],belt=[];
    let t=0,tabVisible=true,resizeTimer,grainPat;
    let cam={x:0,y:0},camT={x:0,y:0},isDrag=false,dragP={x:0,y:0},ptId=null;
    const PI2=Math.PI*2,PI=Math.PI,TW=220,TH=110;
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
        const N=W>1400?180:W>800?120:65; belt=[];
        for(let i=0;i<N;i++) belt.push({a:rnd(0,PI2),fx:rnd(.46,.53),dA:rnd(.005,.025),r:rnd(.3,1.1)});
    }

    /* ---------- Texturas procedurales ---------- */
    function blob(c,x,y,rad,col,a){for(const dx of[0,-TW,TW]){if(x+dx<-rad||x+dx>TW+rad)continue;
        const g=c.createRadialGradient(x+dx,y,0,x+dx,y,rad);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);
        c.fillStyle=g;c.beginPath();c.arc(x+dx,y,rad,0,PI2);c.fill();}}
    function blobE(c,x,y,rx,ry,col,a){for(const dx of[0,-TW,TW]){if(x+dx<-rx||x+dx>TW+rx)continue;
        c.save();c.translate(x+dx,y);c.scale(1,ry/rx);const g=c.createRadialGradient(0,0,0,0,0,rx);
        g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g;c.beginPath();c.arc(0,0,rx,0,PI2);c.fill();c.restore();}}
    function sprinkle(c,cols,n,r0,r1,a0,a1){for(let i=0;i<n;i++)blob(c,Math.random()*TW,Math.random()*TH,rnd(r0,r1),cols[Math.floor(Math.random()*cols.length)],rnd(a0,a1));}
    function newC(){const c=document.createElement('canvas');c.width=TW;c.height=TH;return c;}

    function bakeTex(p){
        const tc=newC(),c=tc.getContext('2d'),b=p.bands,col=p.col,hi=p.hi;
        const mid=`${(col[0]+hi[0])>>1},${(col[1]+hi[1])>>1},${(col[2]+hi[2])>>1}`;
        c.fillStyle=`rgb(${col.join(',')})`;c.fillRect(0,0,TW,TH);
        if(b===3||b===4){ // Júpiter / Saturno: franjas suaves + mucha turbulencia
            const N=b===3?12:10,cl=v=>Math.max(0,Math.min(255,v|0));
            c.save();c.filter='blur(2.6px)';
            for(let i=0;i<N;i++){const y=TH*i/N,h=TH/N+3,t1=i%2,base=t1?hi:col;
                const sh=base.map(v=>cl(v+(t1?7:-11)+rnd(-5,5)));
                c.fillStyle=`rgb(${sh.join(',')})`;c.fillRect(-3,y-1,TW+6,h);}
            c.restore();
            for(let i=0;i<92;i++){const tn=Math.random()<.5?hi:col,sh=tn.map(v=>cl(v+rnd(-16,16)));
                blobE(c,Math.random()*TW,Math.random()*TH,rnd(14,40),rnd(2,5),sh.join(','),rnd(.05,.14));}
            if(b===3){blobE(c,TW*.62,TH*.62,21,12,'200,108,76',.7);blobE(c,TW*.62,TH*.62,12,7,'232,150,110',.45);}
        }else if(b===1){ // Tierra
            c.fillStyle='rgb(26,76,118)';c.fillRect(0,0,TW,TH);
            const land=['46,112,64','74,124,58','122,112,70','58,100,58'];
            for(let i=0;i<7;i++){const X=rnd(0,TW),Y=rnd(TH*.22,TH*.78);
                for(let j=0;j<7;j++)blob(c,X+rnd(-24,24),Y+rnd(-15,15),rnd(9,21),land[Math.floor(Math.random()*4)],rnd(.55,.92));}
            c.fillStyle='rgba(240,248,252,.92)';c.fillRect(0,0,TW,TH*.07);c.fillRect(0,TH*.93,TW,TH*.07);
            const cc=newC(),cg=cc.getContext('2d');
            for(let i=0;i<28;i++)blob(cg,Math.random()*TW,Math.random()*TH,rnd(7,19),'255,255,255',rnd(.22,.55));
            p.cloud=cc;
            p.cities=[];for(let i=0;i<26;i++)p.cities.push({an:rnd(0,PI2),rr:rnd(0,.92)});
        }else if(b===2){ // Marte
            sprinkle(c,['150,60,28','118,44,20','176,92,56','138,58,30'],96,5,16,.18,.5);
            c.fillStyle='rgba(248,240,232,.9)';c.fillRect(0,0,TW,TH*.06);c.fillRect(0,TH*.94,TW,TH*.06);
        }else if(b===5){ // Neptuno
            for(let i=0;i<6;i++){const y=TH*i/6;c.fillStyle=`rgba(${i%2?hi.join(','):col.join(',')},.5)`;c.fillRect(0,y,TW,TH/6+1);}
            blobE(c,TW*.4,TH*.45,20,13,'16,34,108',.75); // Gran Mancha Oscura
            for(let i=0;i<14;i++)blobE(c,Math.random()*TW,Math.random()*TH,rnd(6,15),rnd(2,4),'235,245,255',rnd(.18,.38));
        }else{ // rocosos: Mercurio / Venus / Urano
            sprinkle(c,[mid,hi.join(','),col.map(v=>Math.max(0,v-32)).join(',')],104,5,16,.14,.44);
        }
        p.tex=tc;
    }

    function initPlanets(){
        const S=Math.min(W,H),P=[
            [.12,.065,0,.0085,[140,128,118],[205,196,186],[160,150,140],0,.52,.006,0,.022],
            [.20,.110,.80,.018,[178,142,62],[238,208,132],[210,178,100],0,.37,.008,0,-.013],
            [.29,.158,2.1,.020,[40,92,140],[88,170,162],[64,161,157],0,.25,.010,1,.050],
            [.40,.218,1.3,.013,[162,68,32],[222,120,74],[195,95,55],0,.175,.012,2,.046],
            [.54,.295,4.5,.042,[152,118,68],[212,178,128],[185,152,100],0,.090,.016,3,.082],
            [.67,.368,2.8,.036,[175,150,95],[224,200,150],[195,170,118],1,.060,.020,4,.074],
            [.80,.440,.50,.026,[82,168,162],[135,208,200],[100,161,157],2,.038,.024,0,.040],
            [.93,.512,3.6,.024,[32,62,175],[68,122,212],[50,100,195],0,.024,.028,5,.043]];
        const ringD=[0,0,0,0,0,{t:.32,c:[195,172,122]},{t:.06,c:[100,161,157]},0];
        planets=P.map(([ax,ay,ph,r,col,hi,atm,ri,spd,pf,bands,rot],i)=>{
            const o={bx:cx,by:cy,ax:RX*ax,ay:RY*ay,ph,r:S*r,col,hi,atm,ring:!!ringD[i],spd,pf,tr:[],bands,rot,
                night:bands===1,spec:bands===1};
            if(ringD[i]){o.ringTilt=ringD[i].t;o.rCol=ringD[i].c;}
            bakeTex(o); return o;
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
        belt.forEach(a=>{a.a+=a.dA*.007;ctx.beginPath();ctx.arc(cx+Math.cos(a.a)*RX*a.fx+ox,cy+Math.sin(a.a)*RY*a.fx+oy,a.r,0,PI2);ctx.fill();});}
    function drawTrail(p){const tr=p.tr;if(tr.length<2)return;const ox=cam.x*p.pf,oy=cam.y*p.pf;
        for(let i=1;i<tr.length;i++){const f=i/tr.length;ctx.beginPath();ctx.moveTo(tr[i-1].x+ox,tr[i-1].y+oy);ctx.lineTo(tr[i].x+ox,tr[i].y+oy);
            ctx.strokeStyle=`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},${f*.30})`;ctx.lineWidth=Math.max(.3,p.r*f*.14);ctx.stroke();}}

    function texSlice(tex,px,py,r,ph){const off=ph*TW,frac=(TW-off)/TW,dw=2*r;
        if(off<TW-.5)ctx.drawImage(tex,off,0,TW-off,TH,px-r,py-r,dw*frac,dw);
        if(off>.5)ctx.drawImage(tex,0,0,off,TH,px-r+dw*frac,py-r,dw*(1-frac),dw);}
    function drawRing(p,px,py,r,front){
        const rC=p.rCol.join(','),yS=.42,a0=front?0:PI,a1=front?PI:PI2;
        ctx.save();ctx.translate(px,py);ctx.rotate(-p.ringTilt);
        [[1.42,1.66,.28],[1.68,1.92,.55],[1.99,2.20,.42],[2.22,2.34,.20]].forEach(([r0,r1,al])=>{
            const rm=(r0+r1)/2*r;ctx.beginPath();ctx.ellipse(0,0,rm,rm*yS,0,a0,a1);
            ctx.strokeStyle=`rgba(${rC},${al})`;ctx.lineWidth=(r1-r0)*r;ctx.stroke();});
        ctx.restore();
    }
    function drawPlanet(p){
        const{bx,by}=pPos(p);
        p.tr.push({x:bx,y:by});if(p.tr.length>50)p.tr.shift();
        const r=p.r,ox=cam.x*p.pf,oy=cam.y*p.pf,px=bx+ox,py=by+oy;
        const lx=cx-px,ly=cy-py,lm=Math.hypot(lx,ly)||1,ux=lx/lm,uy=ly/lm; // hacia el Sol
        const ph=((t*p.rot)%1+1)%1;
        drawTrail(p);
        const atm=ctx.createRadialGradient(px,py,r*.82,px,py,r*1.5);
        atm.addColorStop(0,`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.20)`);atm.addColorStop(1,'transparent');
        ctx.fillStyle=atm;ctx.beginPath();ctx.arc(px,py,r*1.5,0,PI2);ctx.fill();
        if(p.ring)drawRing(p,px,py,r,false); // anillo trasero
        ctx.save();ctx.beginPath();ctx.arc(px,py,r,0,PI2);ctx.clip();
        texSlice(p.tex,px,py,r,ph);
        if(p.cloud){ctx.globalAlpha=.82;texSlice(p.cloud,px,py,r,((t*p.rot*1.35)%1+1)%1);ctx.globalAlpha=1;}
        const ld=ctx.createRadialGradient(px,py,r*.52,px,py,r); // limb darkening
        ld.addColorStop(0,'transparent');ld.addColorStop(1,'rgba(0,0,0,.42)');
        ctx.fillStyle=ld;ctx.fillRect(px-r,py-r,r*2,r*2);
        const ns=ctx.createLinearGradient(px-ux*r,py-uy*r,px+ux*r,py+uy*r); // noche/día
        ns.addColorStop(0,'rgba(0,1,8,.96)');ns.addColorStop(.42,'rgba(0,1,8,.72)');
        ns.addColorStop(.6,'rgba(0,1,8,.14)');ns.addColorStop(.78,'transparent');
        ctx.fillStyle=ns;ctx.fillRect(px-r,py-r,r*2,r*2);
        if(p.night){ctx.save();ctx.globalCompositeOperation='lighter'; // luces de ciudad
            p.cities.forEach(ci=>{const dx=Math.cos(ci.an)*ci.rr*r,dy=Math.sin(ci.an)*ci.rr*r;
                if(dx*ux+dy*uy>-r*.12)return;
                ctx.fillStyle=`rgba(255,206,128,${.30+.25*Math.sin(t*3+ci.an*9)})`;ctx.fillRect(px+dx,py+dy,1.3,1.3);});
            ctx.restore();}
        if(p.ring){ctx.save();ctx.translate(px,py);ctx.rotate(-p.ringTilt); // sombra del anillo
            ctx.strokeStyle='rgba(0,0,0,.34)';ctx.lineWidth=r*.16;
            ctx.beginPath();ctx.ellipse(0,0,r*1.88,r*1.88*.42,0,0,PI2);ctx.stroke();ctx.restore();}
        ctx.restore();
        ctx.save();ctx.globalCompositeOperation='lighter'; // creciente atmosférico en el limbo iluminado
        const la=Math.atan2(uy,ux);
        ctx.strokeStyle=`rgba(${p.atm[0]},${p.atm[1]},${p.atm[2]},.5)`;ctx.lineWidth=r*.10;
        ctx.beginPath();ctx.arc(px,py,r*.96,la-1.25,la+1.25);ctx.stroke();ctx.restore();
        if(p.spec){ctx.save();ctx.globalCompositeOperation='lighter'; // especular oceánico
            const sx=px+ux*r*.42,sy=py+uy*r*.42,sp=ctx.createRadialGradient(sx,sy,0,sx,sy,r*.45);
            sp.addColorStop(0,'rgba(255,255,248,.55)');sp.addColorStop(1,'transparent');
            ctx.fillStyle=sp;ctx.beginPath();ctx.arc(sx,sy,r*.45,0,PI2);ctx.fill();ctx.restore();}
        if(p.ring)drawRing(p,px,py,r,true); // anillo frontal
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
        cx=W/2;cy=H/2;RX=W*.48;RY=H*.44;initStars();initPlanets();initBelt();initGrain();
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
