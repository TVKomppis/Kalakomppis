const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const lang of ['fi','sv','en']){
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await ctx.route(/cdnjs\.cloudflare\.com.*leaflet/,r=>r.fulfill({status:200,contentType:'application/javascript',path:'/tmp/t3/Lstub.js'}));
await ctx.route(/openstreetmap|smhi|anthropic|gstatic|gbif|photon|overpass/,r=>r.abort());
await p.goto('http://localhost:8767/');await p.waitForTimeout(900);
await p.evaluate((lang)=>{
 try{localStorage.setItem(uk('kalakomppis.skiprev'),'1')}catch(e){}
 const L=[['jshad','Jigi: shad','Hopea-punainen','Pomputus'],['litka','Litka','Keltavihreä','Pomputus'],['jshad','Lapiopyrstö','Green pumpkin','Kelaus'],['jtwist','Jigi: twister','Violetti','Pomputus'],['tailspin','Tail spinner','Valkoinen','Kelaus'],['jcreat','Ötökkä','Ruskea-musta','Raahaus'],['vaappu','Vaappu','Keltainen-Hopea','Nykäisy'],['lusikka','Lusikka / lippa','Ahvenkuvio-Keltavihreä','Kelaus']];
 const tmap={};LT.forEach(t=>tmap[t[0]]=t);
 S.lib=L.map((l,i)=>{const t=LT.find(x=>x[0]===l[0])||LT[i];return {id:'L'+i,lure:l[1],color:l[2],type:t[0],brand:''}});
 S.geo={'Pyhäjärvi':{lat:61.2,lon:22.3},'Kotijärvi':{lat:61.1,lon:22.5},'Saaristo':{lat:60.3,lon:22.0}};
 const W=['Puolipilvinen','Pilvinen','Selkeä','Tihkusade'],LI=['valoisa','hämärä','valoisa','valoisa'];
 const sp=['Makrilli','Ahven','Hauki','Makrilli','Ahven','Hauki','Makrilli','Ahven'],sz=['42','35','60','38','31','55','40','28'];
 const days=['2026-09-05','2026-09-12','2026-09-20','2026-09-27','2026-10-03','2026-10-04','2026-10-11','2026-10-17','2026-10-18','2026-10-25','2026-10-31','2026-11-01','2026-11-06','2026-11-08','2026-11-13','2026-11-15','2026-11-21'];
 const empty={'2026-11-01':1,'2026-11-08':1,'2026-11-13':1,'2026-09-12':1,'2026-10-04':1,'2026-10-18':1,'2026-10-31':1};
 S.trips=days.map((d,i)=>{const li=i%L.length,l=L[li],pl=i%3===0?'Saaristo':i%3===1?'Pyhäjärvi':'Kotijärvi';const n=empty[d]?0:(i%4===0?2:1);
  return norm({id:'t'+i,date:d,start:i%2?'11:30':'07:00',end:i%2?'13:30':'10:00',place:d==='2026-11-21'?'Pyhäjärvi':pl,pos:S.geo[pl],type:pl==='Saaristo'?'meri':'järvi',light:LI[i%4],weather:W[i%4],temp:String(4+i%9),wc:'Kirkas',flow:'pieni aallokko',level:'normaali',depth:String(2+i%6),spots:[],
  lines:[{lure:l[1],brand:'',color:l[2],ltype:S.lib[li].type,style:l[3],lost:i%5===0?1:0,c:Array.from({length:n},(_,k)=>({sp:sp[(i+k)%8],size:sz[(i+k)%8],photo:'',keep:k===0,spot:0}))},{lure:L[(li+1)%8][1],brand:'',color:L[(li+1)%8][2],ltype:S.lib[(li+1)%8].type,style:L[(li+1)%8][3],lost:0,c:[]}]})});
 S.lib.push({id:'L8',lure:'Dropshot',color:'Green pumpkin',type:'jshad',rig:'dropshot',brand:''});
 const t21=S.trips.find(t=>t.date==='2026-11-21');t21.lines=[{lure:'Jigi: shad',brand:'',color:'Hopea-punainen',ltype:'jshad',style:'Pomputus',lost:0,c:[{sp:'Ahven',size:'35',photo:'',keep:false,spot:0}]},{lure:'Dropshot',brand:'',color:'Green pumpkin',ltype:'jshad',rig:'dropshot',style:'Raahaus',lost:0,c:[]}];S.trips=S.trips.map(norm);
 LANG=lang;document.documentElement.lang=lang;
 const st=document.createElement('style');st.textContent='header.top,nav{display:none!important}body{padding-top:0!important;padding-bottom:0!important}';document.head.appendChild(st);
},lang);
const shot=async(n)=>{await p.waitForTimeout(350);await p.screenshot({path:`/home/claude/kk/site/raw/${n}_${lang}.png`})};
const go=async(t)=>{await p.evaluate(t=>{go(t);scrollTo(0,0)},t);await p.waitForTimeout(300)};
const scrollTo=async(sel,off=0)=>{await p.evaluate(([s,o])=>{const e=[...document.querySelectorAll('h2,h3,b,.zt')].find(x=>x.textContent.trim()===s)||document.querySelector(s);if(e)window.scrollTo(0,e.getBoundingClientRect().top+scrollY-o)},[sel,off]);await p.waitForTimeout(250)};
const T=(fi)=>p.evaluate(f=>tr(f),fi);
await go('ana');await shot('analyysi');
await p.evaluate(()=>{S.zo.z4=true;render()});await scrollTo(await T('Oikea väri oikeaan aikaan'),60);await shot('varit');
await p.evaluate(()=>{S.zo.z4=false;Object.keys(S.zo).forEach(k=>{});render()});
const lz=await p.evaluate(()=>{const b=[...document.querySelectorAll('.zb2')].find(x=>x.textContent.includes(tr('Kalalajit ja vieheet')));if(b){b.click();return b.textContent}return null});await p.waitForTimeout(300);
await p.evaluate(()=>{const b=[...document.querySelectorAll('.zb2[aria-expanded="true"]')].pop();if(b)window.scrollTo(0,b.getBoundingClientRect().top+scrollY-60)});await shot('lajit-vieheet');
await go('now');await p.evaluate(()=>{S.now=S.now||{};S.now.place='Pyhäjärvi';render()});await p.waitForTimeout(300);
await scrollTo(await T('Suositus juuri nyt'),16);await shot('suositus');
await go('log');await p.evaluate(()=>window.scrollTo(0,0));await shot('loki');
await go('lib');await shot('vieheet-tyypit');
await scrollTo(await T('Vieheeni'),20).catch(()=>{});await p.evaluate(()=>{const e=[...document.querySelectorAll('h2')].find(x=>/\(\d+\)/.test(x.textContent));if(e)window.scrollTo(0,e.getBoundingClientRect().top+scrollY-20)});await shot('vieheeni');
await go('data');await p.evaluate(()=>window.scrollTo(0,0));await shot('trophyt');
console.log(lang,lz,errs.slice(0,3));await ctx.close()}
await b.close()})();
