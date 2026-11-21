# KalaKomppis – Kotisivu: jatko-ohje uudelle chatille

Liitä tämä zip uuteen chattiin ja kirjoita: "Jatketaan KalaKomppis-kotisivua. Lue LUE_MINUT.md."

## Tila 21.11.2026
- Esittelysivu osoitteeseen kalakomppis.com, sovellus on osoitteessa kalakomppis.web.app (myöhemmin app.kalakomppis.com).
- Esikatselu (yksityinen): https://claude.ai/artifact/XaCHhHdRDctQcxeuxhNcHY
- Ei vielä julkaistu. Julkaisu: Firebaseen toinen Hosting-sivusto + kalakomppis.com custom domain, DNS Cloudflaressa (DNS only, harmaa pilvi).

## Tiedostot
- `v2.tpl.html` pohja (paikkamerkit AATU, AHVEN, POND, SLIDES, TDICT, QDICT, QRSVG, APPURL)
- `build2.py` rakentaa `index.html`:n (python3 build2.py)
- `t2.json` ruotsi/englanti-tekstit (suomi on HTML:ssä data-t-avaimilla)
- `quips.json` sovelluksen 80 Aatu-kommenttia fi/sv/en
- `fish.json` sovelluksen kalakuvat (fishSvg) ja tieteelliset nimet
- `qr.svgfrag` QR-koodi osoitteeseen https://kalakomppis.com
- `img/fi|sv|en/` kielikohtaiset kuvakaappaukset demodatalla (ei omia kalapaikkoja). Sivu vaihtaa kuvat kielen mukaan (data-img).
- `kuvakaappaukset.js` Playwright-skripti, joka tuottaa kuvat sovelluksesta demodatalla (vaatii sovelluksen paikallisesti portissa 8767)
- `guy.svg` Keijo-logo (sovelluksen GUY), käytössä ylä- ja alapalkissa

## Rakenne
1. Hero: tumma vedenalainen tausta, otsikko "Kalasta fiksummin. Muista jokainen kala.", 2 puhelinta (suositus + etusivu, kuvakaappaukset koko näytön kokoisina), Aatu ahven puhelinten alla (ui pois napautuksesta kuten sovelluksessa), puhekupla.
2. Neljä syytä (bento): 01 Suositukset vesistön mukaan, 02 Reissut ja saaliit, 03 Virtuaalinen kalapakki (4 askelta + vieheiden kuvavalikko), 04 Kalakoulu (4 riviä, 1. rivi näkyy, rivit 2–4 sumenevat asteittain kuten trophyt).
3. Trophyt: tasot Smaragdi 26 / Kulta 48 / Hopea 56 / Pronssi 67 / tasomerkit ilman määriä. 4 esimerkkiä, 1. näkyy, 3 seuraavaa pehmeästi sumennettu, "200+ trophya odottaa saajaansa". Otsikossa "epäonnea", ei "kirous".
4. Asennus Android/iPhone + QR.
5. Liukuva esittely (8 kuvakaappausta, karttakuva poistettu koska karttaa ei saa demodatalla).
6. Alatunniste: tietosuoja, ota yhteyttä, info@kalakomppis.com, ©.

## Päätetyt linjaukset
- Ei "Ei mainoksia" -lupausta (mainokset mahdollisia myöhemmin). Käytössä: Ilmainen · Toimii ilman verkkoa · FI·SV·EN.
- Virallisempi kieli kuin sovelluksessa, huumori Aatun puhekuplassa.
- Ei kalastussääntöjä. Ei omien kalapaikkojen nimiä kuvissa.
- Kieli valitaan polusta (/fi, /sv), #hashista, tallennuksesta tai selaimesta. kalakomppis.fi → /fi, .se → /sv (Cloudflare Redirect Rules).

## Avoimet
- Julkaisu kalakomppis.comiin (ks. yllä).
- APPURL vaihto osoitteeseen https://app.kalakomppis.com kun käytössä.

## 21.11. lisäykset
- Logo: Keijo (84 px) pintaveden rengas- ja kupla-animaatiolla kuten sovelluksessa.
- Kuvakaappauksista piilotettu sovelluksen yläpalkki ja alavälilehdet.
- Trophy-esimerkit kilven muotoisina (sama clip-path kuin sovelluksen trophy-paljastuksessa), metallinen liukuväri tason mukaan.
- Trophy-esimerkit palautettu suorakaidekorteiksi; tasomerkit (Smaragdi…Kirous) ovat kilven muotoisia.
- Esittely-karuselli: liukuu itsestään 3,5 s välein, pyyhkäisy/veto molempiin suuntiin, pisteet alla, tauko 5 s käyttäjän kosketuksen jälkeen.
- Kalakoulu 4 riviä asteittaisella sumennuksella. Kalenterikuvassa 21.11.: Jigi: shad (Ahven 35 cm) + Dropshot.
- Tasomerkit sovelluksen ylärivin tyyliin (metalliset laatat + 👑🥇🥈🥉👻). Toinen esimerkkitrophy: Kalakaupan sponsori (Kirous).
- Esittely-karuselli: pienemmät puhelimet (200 px / mobiili 165 px), jatkuva tasainen liuku (requestAnimationFrame, saumaton silmukka), pyyhkäisy/veto keskeyttää 2,5 s.

## 21.11. ilta (KalaKeijo)
- Korjattu ylimääräinen `</div>`, jonka takia aaltoanimaatio piirtyi näytön alareunaan tekstien päälle. Aallot ovat nyt herossa.
- PC (≥981 px): Neljä syytä -kortit allekkain levyinä riveinä, puhelimet samankokoisia (290×440). Mobiili ennallaan.
- "200+ trophya odottaa saajaansa" PC:llä esimerkkien alla oikealla (`.tmore2`), mobiilissa kuten ennen.
- Karuselli: hiiren veto korjattu (pointer capture, kuvien raahaus estetty, kierto ei hyppää), nuolinapit PC:llä.
- Kuplat nousevat koko heron korkeuden (JS asettaa `--rise`), määrä skaalautuu heron korkeuden mukaan.
