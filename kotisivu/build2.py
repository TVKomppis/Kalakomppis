import json,re
s=open('v2.tpl.html').read()
s=s.replace('<h3> iPhone</h3>','<h3>📱 iPhone</h3>').replace('<span data-t="s5">nyt ja jatkossa perusversio</span>','<span data-t="s5">ilmainen käyttää</span>')
fish={k:(names,svg,sci) for k,names,svg,sci in json.load(open('fish.json'))}
NM={'Ahven':'Abborre|Perch','Hauki':'Gädda|Pike','Kuha':'Gös|Zander','Lohi':'Lax|Atlantic salmon','Taimen':'Öring|Brown trout','Made':'Lake|Burbot','Lahna':'Braxen|Bream','Särki':'Mört|Roach','Kirjolohi':'Regnbåge|Rainbow trout','Siika':'Sik|Whitefish','Muikku':'Siklöja|Vendace','Nieriä':'Röding|Arctic char','Harjus':'Harr|Grayling','Kiiski':'Gärs|Ruffe','Makrilli':'Makrill|Mackerel','Silakka':'Strömming|Baltic herring'}
def clean(svg,label): return re.sub(r'<svg class=""','<svg aria-hidden="true"',svg,1)
ah=fish['Ahven'][1]
g=open('guy.svg').read().replace('class="logo" ','',1)
s=s.replace('KEIJO',g,2)
s=s.replace('AHVEN',ah.replace('<svg class=""','<svg',1).replace('aria-label="ahven"','aria-label="Ahven Aatu"'))
s=s.replace('KUHA',clean(fish['Kuha'][1],''),1)
order=['Ahven','Hauki','Kuha','Taimen','Harjus','Made','Lohi','Siika','Nieriä','Lahna','Särki','Makrilli']
pond=''.join(f'<div class="fc">{clean(fish[k][1],"")}<b data-sp="{k}|{NM[k]}">{k}</b><span>{fish[k][2]}</span></div>' for k in order)
s=s.replace('POND',pond)
SL=[('analyysi','sA'),('suositus','sB'),('loki','sD'),('vieheet-tyypit','sE'),('vieheeni','sF'),('varit','sG'),('lajit-vieheet','sH'),('trophyt','sI')]
FIt={'sA':('Oma tilasto','Reissut, kalat, kalaa tunnissa ja saaliit lajeittain yhdellä silmäyksellä.'),
'sB':('Suositus juuri nyt','Viehe, väri, uintityyli ja odotettu saalis paikan, sään ja ajan mukaan.'),
'sC':('Kartta ja vesistöt','Järvi, joki tai meri tunnistetaan karttaa napauttamalla.'),
'sD':('Reissuloki','Kalenteri näyttää kalapäivät ja pohjaan jääneet vieheet.'),
'sE':('Vieheiden lisäys','18 viehetyyppiä ja yleisimmät rigit valmiina kuvina.'),
'sF':('Vieheesi','Jokaiselle vieheelle reissut ja saaliit.'),
'sG':('Oikea väri oikeaan aikaan','Mikä väri tuottaa kalaa aamulla, päivällä, illalla ja yöllä.'),
'sH':('Kalalajit ja vieheet','Mikä viehetyyppi tuo mitäkin lajia ja kuinka suurta.'),
'sI':('Trophyt','220 trophya viidellä tasolla Smaragdista Kiroukseen.')}
slides=''.join(f'<div class="sl"><div class="phone"><div class="sc"><img src="img/fi/{n}.jpg" data-img="{n}" alt="" loading="lazy"></div></div><h3 data-t="{k}h">{FIt[k][0]}</h3><p data-t="{k}p">{FIt[k][1]}</p></div>' for n,k in SL)
s=s.replace('SLIDES',slides)
T=json.load(open('t2.json'))
s=s.replace('TDICT',json.dumps(T,ensure_ascii=False))
Q=json.load(open('quips.json'))
s=s.replace('QDICT',json.dumps(Q,ensure_ascii=False))
s=s.replace('QRSVG',open('qr.svgfrag').read()).replace('APPURL','https://kalakomppis.web.app')
open('index.html','w').write(s)
# report missing keys
keys=set(re.findall(r'data-t="([^"]+)"',s))
for l in ('sv','en'):
    print(l,'missing',sorted(keys-set(T[l])))
