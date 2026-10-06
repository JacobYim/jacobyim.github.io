(() => {
  const canvas = document.getElementById('twin-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const toggle = document.getElementById('twin-play');
  const obstacle = document.getElementById('twin-obstacle');
  const status = document.getElementById('twin-status');
  const steps = [...document.querySelectorAll('.twin-step')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches, clock = 0, last = 0, phase = -1, blocked = true, visible = true;
  let width = 900, height = 360, angle = -.38, drag = null;
  const labels = ['Sense & synchronize', 'Plan in the twin', 'Execute in the world', 'Observe the outcome'];
  const descriptions = [
    'Physical observations update the digital scene: robot, object, and obstacle.',
    'The simulated agent compares candidate paths and selects a collision-free route.',
    'The selected plan returns to the physical scene. The robot moves the object.',
    'The observed outcome updates the twin, closing the perception–action loop.'
  ];
  function syncControls() { toggle.textContent = playing ? 'Pause' : 'Play'; toggle.setAttribute('aria-pressed', String(playing)); }
  function reset() { clock = 0; phase = -1; draw(); }
  toggle.onclick = () => { playing = !playing; syncControls(); };
  obstacle.onclick = () => { blocked = !blocked; obstacle.setAttribute('aria-pressed', String(blocked)); obstacle.textContent = blocked ? 'Obstacle: on' : 'Obstacle: off'; reset(); };
  steps.forEach((b,i) => b.onclick = () => { clock = i * 5 + .1; playing = false; phase = -1; syncControls(); draw(); });
  document.getElementById('twin-replay').onclick = () => { playing = true; syncControls(); reset(); };
  reduced.addEventListener('change', () => { if (reduced.matches) { playing = false; syncControls(); } });
  canvas.addEventListener('pointerdown', e => { drag = {x:e.clientX, angle}; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (drag) { angle = Math.max(-.8, Math.min(.25, drag.angle+(e.clientX-drag.x)*.003)); draw(); } });
  canvas.addEventListener('pointerup', () => drag=null);
  canvas.addEventListener('pointercancel', () => drag=null);
  new IntersectionObserver(([e]) => visible=e.isIntersecting).observe(canvas);
  function resize() { width=canvas.clientWidth; height=width<600?450:350; canvas.style.height=height+'px'; const dpr=Math.min(devicePixelRatio||1,2); canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw(); }
  new ResizeObserver(resize).observe(canvas);
  function project(p, origin) { const [x,y,z]=p; const rx=x*Math.cos(angle)-z*Math.sin(angle), rz=x*Math.sin(angle)+z*Math.cos(angle); const scale=width<600?Math.min(width/7.5,55):width/13; return [origin[0]+rx*scale,origin[1]+rz*scale*.47-y*scale]; }
  function line(points,origin,color,size=1,dash=[]) {ctx.beginPath();points.forEach((p,i)=>{const q=project(p,origin);i?ctx.lineTo(...q):ctx.moveTo(...q)});ctx.strokeStyle=color;ctx.lineWidth=size;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
  function face(points,origin,color,stroke) {ctx.beginPath();points.forEach((p,i)=>{const q=project(p,origin);i?ctx.lineTo(...q):ctx.moveTo(...q)});ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.8;ctx.stroke();}}
  function box(x,y,z,sx,sy,sz,o,digital,color='#dc9a4b') {
    const a=[x-sx/2,y,z-sz/2],b=[x+sx/2,y,z-sz/2],c=[x+sx/2,y,z+sz/2],d=[x-sx/2,y,z+sz/2]; const up=p=>[p[0],p[1]+sy,p[2]];
    if(digital){for(const p of [a,b,c,d])line([p,up(p)],o,color,1);line([a,b,c,d,a],o,color);line([up(a),up(b),up(c),up(d),up(a)],o,color);}
    else{face([d,c,up(c),up(d)],o,color,'#ffffff66');face([b,c,up(c),up(b)],o,color,'#ffffff66');face([up(a),up(b),up(c),up(d)],o,color,'#ffffffaa');}
  }
  const start=[-.8,.5,.85], end=[1.05,.5,-.65];
  function route(t) {return [start[0]+(end[0]-start[0])*t,.5+Math.sin(Math.PI*t)*(blocked?1.05:.45),start[2]+(end[2]-start[2])*t+(blocked?Math.sin(Math.PI*t)*.65:0)];}
  function robot(o,t,digital,opacity=1){
    ctx.globalAlpha=opacity;const target=route(t),base=[-1.3,.3,-.65],shoulder=[-1.3,1.05,-.65],elbow=[-.8,1.85+target[1]*.14,-.1],wrist=[target[0],target[1]+.32,target[2]];
    box(-1.3,0,-.65,.6,.3,.6,o,digital,digital?'#4e89c7':'#96a6af');
    const points=[base,shoulder,elbow,wrist,target];line(points,o,digital?'#548dc7':'#b7c3cd',digital?2:12);if(!digital)line(points,o,'#e0e6ea',5);
    for(const p of points.slice(1,4)){const q=project(p,o);ctx.beginPath();ctx.arc(...q,digital?3:6,0,Math.PI*2);ctx.fillStyle=digital?'#fff':'#58738b';ctx.fill();ctx.strokeStyle='#4380b8';ctx.lineWidth=1.5;ctx.stroke();}
    line([[target[0]-.15,target[1]+.12,target[2]],target,[target[0]+.15,target[1]+.12,target[2]]],o,digital?'#387cbd':'#405869',2);
    box(target[0],target[1]-.3,target[2],.32,.3,.32,o,digital,digital?'#bd8b45':'#d59b50');ctx.globalAlpha=1;
  }
  function scene(o,digital,t,p,u){
    face([[-2,0,-1.5],[2,0,-1.5],[2,0,1.5],[-2,0,1.5]],o,digital?'#edf5fc':'#eef0f1','#d9e2e8');
    for(let x=-2;x<=2;x+=.4)line([[x,0,-1.5],[x,0,1.5]],o,digital?'#ccdff0':'#dbe1e4',.7);
    for(let z=-1.5;z<=1.5;z+=.4)line([[-2,0,z],[2,0,z]],o,digital?'#ccdff0':'#dbe1e4',.7);
    line([[.75,.015,-.95],[1.35,.015,-.95],[1.35,.015,-.35],[.75,.015,-.35],[.75,.015,-.95]],o,'#4c9b7d',2);
    if(blocked)box(.1,0,.08,.6,.73,.6,o,digital,digital?'#8fa9bb':'#bbc5cd');
    if(digital&&p===1){
      const naive=Array.from({length:31},(_,i)=>{let a=i/30;return[start[0]+(end[0]-start[0])*a,.5,start[2]+(end[2]-start[2])*a]});
      if(blocked)line(naive,o,'#c9867c',1,[4,4]);
      line(Array.from({length:51},(_,i)=>route(i/50)),o,'#4389be',1.5,[3,3]);
      robot(o,Math.min(1,u*1.4),true,.65);
    } else robot(o,t,digital);
    if(p===0){const x=-2+u*4;face([[x,0,-1.5],[x,2.6,-1.5],[x,2.6,1.5],[x,0,1.5]],o,'#67b3de18');line([[x,0,-1.5],[x,2.6,-1.5],[x,2.6,1.5],[x,0,1.5]],o,'#7bb5d0',1);}
  }
  function draw(){
    if(!width)return;const p=Math.floor(clock/5)%4,u=(clock%5)/5;
    if(p!==phase){phase=p;status.textContent=descriptions[p];steps.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===p));});document.getElementById('twin-stage').textContent=labels[p];}
    ctx.clearRect(0,0,width,height);const narrow=width<600;
    const left=narrow?[width*.5,170]:[width*.245,240],right=narrow?[width*.5,380]:[width*.755,240];
    let t=p===2?Math.min(1,u*1.35):p===3?1:0;
    scene(left,false,t,p,u);scene(right,true,p===3?1:p===2?t:0,p,u);
    ctx.font='12px Arial';ctx.textAlign='center';ctx.fillStyle='#425366';ctx.fillText('PHYSICAL SYSTEM',left[0],narrow?25:35);ctx.fillStyle='#2469a5';ctx.fillText('DIGITAL TWIN',right[0],narrow?235:35);
    const a=narrow?[width*.8,175]:[width*.43,140],b=narrow?[width*.8,290]:[width*.57,140];
    ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle='#b8ccdc';ctx.lineWidth=1;ctx.stroke();
    const backwards=p===2;const v=(u*2)%1, mix=backwards?1-v:v;
    ctx.beginPath();ctx.arc(a[0]+(b[0]-a[0])*mix,a[1]+(b[1]-a[1])*mix,4,0,Math.PI*2);ctx.fillStyle=p===2?'#bf873d':'#3485b4';ctx.fill();
    ctx.font='10px Arial';ctx.fillStyle='#6b7d8c';ctx.fillText(p===2?'← ACTION':p===1?'PLAN':p===3?'FEEDBACK →':'STATE →',narrow?width*.8:width*.5,narrow?218:126);
    ctx.fillStyle='#e3eaf0';ctx.fillRect(0,height-3,width,3);ctx.fillStyle='#478bb7';ctx.fillRect(0,height-3,width*(clock/20),3);
  }
  function frame(now){const dt=last?Math.min((now-last)/1000,.06):0;last=now;if(playing&&visible&&!document.hidden){clock=(clock+dt)%20;draw();}requestAnimationFrame(frame);}
  syncControls();resize();requestAnimationFrame(frame);
})();
