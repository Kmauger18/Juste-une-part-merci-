// Configurateur « Gâteau sur mesure » : choix, prix estimé et aperçu dessiné en direct.
// Utilise les outils de js/site.js (prix, echapper, icone, ajouterAuPanier, toast, ouvrir).
'use strict';

/* =========================================================================
   Choix proposés (prix en euros)
   ========================================================================= */
const SM_OPTIONS = {
  occasion: [
    { v: 'Anniversaire' }, { v: 'Mariage / PACS' }, { v: 'Baptême / naissance' }, { v: 'Communion' },
    { v: 'Saint-Valentin' }, { v: 'Repas de famille' }, { v: "Fête d'entreprise" }, { v: 'Simple gourmandise' }
  ],
  forme: [
    { v: 'Rond' }, { v: 'Carré' }, { v: 'Cœur', prix: 6, info: '+6 €' }, { v: 'Rectangle', info: 'pour un buffet' }
  ],
  etages: [
    { v: '1 étage', n: 1 }, { v: '2 étages', n: 2, prix: 15, info: '+15 €' }, { v: '3 étages', n: 3, prix: 35, info: '+35 €' }
  ],
  biscuit: [
    { v: 'Génoise vanille', couleur: '#F0CF8E', info: 'Moelleuse et légère' },
    { v: 'Biscuit chocolat', couleur: '#5B3220', info: 'Fondant et intense' },
    { v: 'Red velvet', couleur: '#9C2B2E', info: 'Cacao doux, couleur rubis' },
    { v: 'Biscuit citron', couleur: '#F3DD7B', info: 'Frais et parfumé' },
    { v: 'Dacquoise noisette', couleur: '#C79A62', info: 'Aux noisettes, sans farine', noix: true },
    { v: 'Biscuit amande', couleur: '#E8C998', info: 'Tendre, façon financier', noix: true }
  ],
  garniture: [
    { v: 'Chocolat et praliné', couleur: '#6B3B22', noix: true },
    { v: 'Vanille et caramel beurre salé', couleur: '#D99A4E' },
    { v: 'Citron', couleur: '#F6E27A' },
    { v: 'Fruits rouges', couleur: '#C8414F' },
    { v: 'Pistache et framboise', couleur: '#A8C27A', noix: true },
    { v: 'Mangue et passion', couleur: '#F4A43C' },
    { v: 'Chocolat blanc et coco', couleur: '#F5EEDC' },
    { v: 'Café', couleur: '#8A5A3B' }
  ],
  enrobage: [
    { v: 'Crème lisse', info: 'Couleur au choix', parPart: 0.5, couleurs: true },
    { v: 'Semi-nu (naked)', info: 'On voit les couches' },
    { v: 'Ganache chocolat', info: 'Chocolat noir', parPart: 0.5 },
    { v: 'Glaçage miroir', info: 'Brillant, couleur au choix', parPart: 1, couleurs: true },
    { v: 'Chantilly pochée', info: 'Rosaces de crème', parPart: 0.3 }
  ],
  couleur: [
    { v: 'Blanc', hex: '#FBF7F0' }, { v: 'Rose poudré', hex: '#F2C4C8' }, { v: 'Bleu ciel', hex: '#BFD8EE' }, { v: 'Vert sauge', hex: '#BCCBAE' },
    { v: 'Jaune pastel', hex: '#F6E3A1' }, { v: 'Lavande', hex: '#D3C4E6' }, { v: 'Pêche', hex: '#F6C7A6' }, { v: 'Chocolat', hex: '#6B3F26' }
  ],
  decors: [
    { v: 'Fleurs', prix: 12 }, { v: 'Fruits frais', prix: 8 }, { v: 'Coulure chocolat', prix: 6 }, { v: 'Macarons', prix: 10 },
    { v: "Feuilles d'or", prix: 8 }, { v: 'Perles en sucre', prix: 4 }, { v: 'Bougies', prix: 3 }, { v: 'Topper (texte)', prix: 6 }, { v: 'Plaque chocolat', prix: 4 }
  ]
};
const SM_PARTS = { 1: [6, 30], 2: [20, 60], 3: [40, 120] };
const SM_ETAPES = ['Occasion', 'Forme', 'Saveurs', 'Enrobage', 'Décor', 'Message'];

const sm = {
  etape: 1, occasion: 'Anniversaire', forme: 'Rond', etages: '1 étage', parts: 10,
  biscuit: 'Génoise vanille', garniture: 'Fruits rouges', enrobage: 'Crème lisse', couleur: 'Rose poudré',
  decors: new Set(['Fleurs'])
};
const opt = (groupe, v) => SM_OPTIONS[groupe].find(o => o.v === v) || SM_OPTIONS[groupe][0];
const nbEtages = () => opt('etages', sm.etages).n;

/* =========================================================================
   Prix
   ========================================================================= */
function prixSurMesure() {
  let p = sm.parts * 4.5;
  p += (opt('forme', sm.forme).prix || 0) + (opt('etages', sm.etages).prix || 0);
  p += sm.parts * (opt('enrobage', sm.enrobage).parPart || 0);
  sm.decors.forEach(d => { p += opt('decors', d).prix || 0; });
  if ($('#sm-sans-gluten').checked) p += 4;
  return Math.round(p);
}

/* =========================================================================
   Aperçu dessiné (SVG)
   ========================================================================= */
function teinte(hex, k) { // k < 0 assombrit, k > 0 éclaircit
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(x => Math.round(k < 0 ? x * (1 + k) : x + (255 - x) * k));
  return '#' + c.map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join('');
}
// Contour vu de dessus, normalisé (x à droite, z vers le spectateur)
function contour(forme) {
  const pts = [];
  const N = 72;
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    if (forme === 'Cœur') {
      const x = 16 * Math.sin(t) ** 3, y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      pts.push([x / 17, -(y + 2) / 17]);
    } else if (forme === 'Carré' || forme === 'Rectangle') {
      const l = forme === 'Rectangle' ? 1.35 : 0.92, p = forme === 'Rectangle' ? 0.8 : 0.92;
      const c = Math.cos(t), s = Math.sin(t), m = Math.max(Math.abs(c) / l, Math.abs(s) / p);
      let x = c / m, z = s / m;
      const a = 0.38; // légère rotation pour voir deux faces
      pts.push([x * Math.cos(a) - z * Math.sin(a), x * Math.sin(a) + z * Math.cos(a)]);
    } else pts.push([Math.cos(t), Math.sin(t)]);
  }
  return pts;
}
const ECRASEMENT = 0.34;
function chemin(pts, cx, cy, r) {
  return 'M' + pts.map(([x, z]) => `${(cx + x * r).toFixed(1)} ${(cy + z * r * ECRASEMENT).toFixed(1)}`).join('L') + 'Z';
}
// Générateur pseudo-aléatoire stable (le décor ne « saute » pas à chaque clic)
function hasard(graine) { let s = graine; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }

function rose(x, y, r, c) {
  return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x}" cy="${y}" r="${r * 0.68}" fill="${teinte(c, -0.12)}"/><path d="M${x - r * 0.45} ${y}a${r * 0.45} ${r * 0.45} 0 1 1 ${r * 0.6} ${r * 0.3}" fill="none" stroke="${teinte(c, -0.3)}" stroke-width="1.2"/><circle cx="${x + r * 0.05}" cy="${y - r * 0.05}" r="${r * 0.22}" fill="${teinte(c, -0.25)}"/></g>`;
}
function feuille(x, y, a) {
  return `<ellipse cx="${x}" cy="${y}" rx="7" ry="3.2" fill="#6F8F5A" transform="rotate(${a} ${x} ${y})"/>`;
}

function dessinerApercu() {
  const W = 400, H = 380;
  const n = nbEtages();
  const forme = sm.forme;
  const pts = contour(forme);
  const enr = opt('enrobage', sm.enrobage);
  const coul = enr.couleurs ? opt('couleur', sm.couleur).hex : sm.enrobage === 'Ganache chocolat' ? '#4A2A17' : '#FBF7F0';
  const bisc = opt('biscuit', sm.biscuit).couleur;
  const garn = opt('garniture', sm.garniture).couleur;
  const naked = sm.enrobage === 'Semi-nu (naked)';
  const miroir = sm.enrobage === 'Glaçage miroir';
  const [pmin, pmax] = SM_PARTS[n];
  const taille = (sm.parts - pmin) / Math.max(1, pmax - pmin);
  const rBas = (forme === 'Rectangle' ? 98 : 112) + taille * 30;
  const hEtage = n === 1 ? 78 : n === 2 ? 64 : 52;
  const alea = hasard(7 + sm.parts + n * 13 + forme.length);
  const defs = [], dessin = [], devant = [];
  const zMax = Math.max(...pts.map(p => p[1]));
  const solY = Math.min(330, H - 14 - zMax * (rBas + 36) * ECRASEMENT);

  // Plateau
  dessin.push(`<ellipse cx="200" cy="${solY + 6}" rx="${rBas + 36}" ry="${(rBas + 36) * ECRASEMENT}" fill="#E6D3BC"/><ellipse cx="200" cy="${solY}" rx="${rBas + 34}" ry="${(rBas + 34) * ECRASEMENT}" fill="#F3E8DA"/>`);

  let base = solY;
  const etages = [];
  for (let i = 0; i < n; i++) {
    const r = rBas * Math.pow(0.72, i);
    etages.push({ r, bas: base, haut: base - hEtage });
    base -= hEtage;
  }
  // Dégradé de côté (ombre à gauche et à droite)
  const grad = (id, c) => {
    defs.push(`<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${teinte(c, -0.22)}"/><stop offset=".45" stop-color="${teinte(c, 0.08)}"/><stop offset=".7" stop-color="${c}"/><stop offset="1" stop-color="${teinte(c, -0.28)}"/></linearGradient>`);
    return `url(#${id})`;
  };
  const gCote = grad('g-cote', coul), gBisc = grad('g-bisc', bisc), gGarn = grad('g-garn', garn), gCreme = grad('g-creme', '#FBF4E6');

  etages.forEach((e, i) => {
    // Côté : on empile le contour du bas vers le haut ; chaque tranche visible garde sa couleur
    const nbCouches = 3;
    for (let o = e.bas; o >= e.haut; o -= 1.5) {
      let fill = gCote;
      if (naked) {
        const h = (e.bas - o) / (e.bas - e.haut);
        const bande = Math.floor(h * (nbCouches * 2));
        fill = h > 0.96 ? gCreme : bande % 2 === 0 ? gBisc : gGarn;
      }
      dessin.push(`<path d="${chemin(pts, 200, o, e.r)}" fill="${fill}"/>`);
    }
    if (naked) dessin.push(`<path d="${chemin(pts, 200, e.haut, e.r)}" fill="#FBF4E6" opacity=".55"/>`);
    // Dessus
    const dessus = naked ? '#FBF4E6' : miroir ? teinte(coul, 0.12) : teinte(coul, 0.1);
    dessin.push(`<path d="${chemin(pts, 200, e.haut, e.r)}" fill="${dessus}"/>`);
    if (miroir) dessin.push(`<path d="${chemin(pts.map(([x, z]) => [x * 0.55 - 0.25, z * 0.35 - 0.2]), 200, e.haut, e.r)}" fill="#fff" opacity=".35"/>`);
    // Perles en sucre au pied de l'étage
    if (sm.decors.has('Perles en sucre')) {
      pts.filter((p, k) => p[1] > -0.1 && k % 2 === 0).forEach(([x, z]) => dessin.push(`<circle cx="${(200 + x * e.r).toFixed(1)}" cy="${(e.bas + z * e.r * ECRASEMENT - 2).toFixed(1)}" r="3.4" fill="#FFFDF8" stroke="#E4D6C4" stroke-width=".6"/>`));
    }
    // Feuilles d'or sur le côté
    if (sm.decors.has("Feuilles d'or")) {
      for (let k = 0; k < 6; k++) {
        const x = 200 + (alea() * 1.4 - 0.7) * e.r, y = e.haut + 10 + alea() * (e.bas - e.haut - 16) + e.r * ECRASEMENT * 0.7;
        dessin.push(`<path d="M${x} ${y}l${4 + alea() * 4} -3l3 ${5 + alea() * 3}l-6 3z" fill="#D9B23C" stroke="#B88E1E" stroke-width=".5"/>`);
      }
    }
    // Chantilly pochée : rosaces sur le bord du dessus
    if (sm.enrobage === 'Chantilly pochée') {
      const bord = pts.filter((p, k) => k % 6 === 0).map(([x, z]) => [200 + x * e.r * 0.9, e.haut + z * e.r * 0.9 * ECRASEMENT]).sort((a, b) => a[1] - b[1]);
      bord.forEach(([x, y]) => dessin.push(`<circle cx="${x.toFixed(1)}" cy="${(y - 3).toFixed(1)}" r="7" fill="#FFFDF8" stroke="#EADDCB"/><path d="M${x - 3} ${y - 4}q3 -4 6 0" fill="none" stroke="#E2D2BD" stroke-width="1"/>`));
    }
  });

  const haut = etages[etages.length - 1];
  // Coulure chocolat sur l'étage du haut
  if (sm.decors.has('Coulure chocolat')) {
    const devantBord = pts.filter(p => p[1] > -0.05).map(([x, z]) => [200 + x * haut.r, haut.haut + z * haut.r * ECRASEMENT]);
    let d = '';
    devantBord.forEach(([x, y], k) => { if (k % 3 === 0) { const L = 10 + alea() * 22; d += `<rect x="${(x - 3.5).toFixed(1)}" y="${(y - 2).toFixed(1)}" width="7" height="${L.toFixed(1)}" rx="3.5" fill="#3E2213"/>`; } });
    dessin.push(`<path d="${chemin(pts, 200, haut.haut, haut.r * 1.0)}" fill="#3E2213"/>` + d);
  }
  // Fruits frais sur le dessus
  if (sm.decors.has('Fruits frais')) {
    for (let k = 0; k < 9; k++) {
      const x = 200 + (alea() * 1.1 - 0.55) * haut.r, y = haut.haut + (alea() * 0.9 - 0.45) * haut.r * ECRASEMENT;
      const c = k % 3 === 0 ? '#3B4A87' : '#C42B3A';
      devant.push(`<circle cx="${x.toFixed(1)}" cy="${(y - 5).toFixed(1)}" r="${k % 3 === 0 ? 4.5 : 6}" fill="${c}"/><circle cx="${(x - 1.5).toFixed(1)}" cy="${(y - 7).toFixed(1)}" r="1.5" fill="#fff" opacity=".5"/>`);
    }
    devant.push(feuille(200 - haut.r * 0.2, haut.haut - 6, -20) + feuille(200 + haut.r * 0.25, haut.haut - 3, 30));
  }
  // Macarons posés sur le dessus
  if (sm.decors.has('Macarons')) {
    [['#F2B8C6', -0.42], ['#B9D79B', 0], ['#F7D98C', 0.42]].forEach(([c, dx], k) => {
      const x = 200 + dx * haut.r, y = haut.haut - 6 + (k === 1 ? -4 : 2);
      devant.push(`<g><ellipse cx="${x}" cy="${y + 6}" rx="13" ry="5" fill="${teinte(c, -0.1)}"/><rect x="${x - 12}" y="${y}" width="24" height="5" fill="#FFF6EA"/><ellipse cx="${x}" cy="${y}" rx="13" ry="5" fill="${c}"/></g>`);
    });
  }
  // Fleurs : bouquet sur le dessus et cascade sur le côté
  if (sm.decors.has('Fleurs')) {
    const couleurs = ['#F4C2C9', '#FFF8F2', '#F6CBAA', '#E8A0AE'];
    const ech = Math.max(1, haut.r / 80);
    const bouquet = [[-0.35, -6, 11], [-0.15, -12, 13], [0.05, -5, 10], [-0.5, 2, 8]].map(([dx, dy, r]) => [dx, dy * ech, r * ech]);
    bouquet.forEach(([dx, dy, r], k) => devant.push(feuille(200 + dx * haut.r - r, haut.haut + dy + 4, -30 + k * 25) + rose(200 + dx * haut.r, haut.haut + dy, r, couleurs[k % 4])));
    etages.slice(0, -1).forEach((e, i) => {
      const x = 200 - e.r * 0.55, y = e.haut + (e.bas - e.haut) * 0.55 + e.r * ECRASEMENT * 0.5;
      devant.push(feuille(x - 10, y + 6, 20) + rose(x, y, 9, couleurs[(i + 1) % 4]) + rose(x + 14, y + 8, 7, couleurs[(i + 2) % 4]));
    });
  }
  // Bougies
  if (sm.decors.has('Bougies')) {
    [-0.3, 0, 0.3].forEach((dx, k) => {
      const x = 200 + dx * haut.r + (sm.decors.has('Fleurs') ? 25 : 0), y = haut.haut - 4 + (k === 1 ? -3 : 0);
      devant.push(`<rect x="${x - 2.5}" y="${y - 30}" width="5" height="30" rx="1.5" fill="${['#9CC5E8', '#F2B8C6', '#F7D98C'][k]}"/><path d="M${x} ${y - 42}q5 6 0 10q-5 -4 0 -10z" fill="#F6A623"/><circle cx="${x}" cy="${y - 34}" r="1.6" fill="#FFF2B3"/>`);
    });
  }
  // Inscription : topper au-dessus ou plaque en chocolat
  const texte = ($('#sm-inscription').value || '').trim().slice(0, 24);
  if (sm.decors.has('Topper (texte)')) {
    const t = texte || (sm.occasion === 'Anniversaire' ? 'Joyeux anniversaire' : 'Félicitations');
    const y = haut.haut - 62;
    devant.push(`<line x1="${200 - 40}" y1="${y + 6}" x2="${200 - 40}" y2="${haut.haut - 2}" stroke="#C9A24A" stroke-width="2"/><line x1="${200 + 40}" y1="${y + 6}" x2="${200 + 40}" y2="${haut.haut - 2}" stroke="#C9A24A" stroke-width="2"/><text x="200" y="${y}" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="700" font-size="${t.length > 16 ? 19 : 24}" fill="#B8892B">${echapper(t)}</text>`);
  } else if (texte || sm.decors.has('Plaque chocolat')) {
    const y = haut.haut + 2;
    devant.push(`<g transform="rotate(-4 200 ${y})"><rect x="${200 - 58}" y="${y - 16}" width="116" height="26" rx="5" fill="#4A2A17"/><text x="200" y="${y + 2}" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="700" font-size="${(texte || 'Votre texte').length > 16 ? 11 : 14}" fill="#F6E7C8">${echapper(texte || 'Votre texte')}</text></g>`);
  }

  $('#sm-apercu').innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto max-h-[170px] sm:max-h-[300px] xl:max-h-[330px]" aria-hidden="true"><defs>${defs.join('')}</defs>${dessin.join('')}${devant.join('')}</svg>`;
  $('#sm-apercu').setAttribute('aria-label', `Aperçu : gâteau ${sm.forme.toLowerCase()}, ${sm.etages}, ${sm.enrobage.toLowerCase()}${enr.couleurs ? ' ' + sm.couleur.toLowerCase() : ''}${sm.decors.size ? ', décor : ' + [...sm.decors].join(', ').toLowerCase() : ''}`);

  // Vue en coupe : les couches de biscuit et de garniture
  const couches = [];
  for (let k = 0; k < 7; k++) couches.push(`<rect x="0" y="${k * 10}" width="96" height="10" fill="${k % 2 === 0 ? bisc : garn}"/>`);
  $('#sm-coupe').innerHTML = `<svg viewBox="0 0 96 76" class="w-24 rounded-lg border border-brand-200 overflow-hidden"><rect width="96" height="76" fill="${naked ? '#FBF4E6' : coul}"/>${couches.join('')}<rect x="0" y="70" width="96" height="6" fill="${naked ? '#FBF4E6' : coul}"/></svg><span class="block mt-1 text-[11px] text-center text-brand-700">Vue en coupe</span>`;
}

/* =========================================================================
   Formulaire
   ========================================================================= */
function boutonChoix(groupe, o) {
  if (groupe === 'couleur') {
    return `<button type="button" class="choix-couleur" data-valeur="${echapper(o.v)}" title="${echapper(o.v)}"><span class="block w-10 h-10 rounded-full border border-brand-300" data-pastille="${echapper(o.hex)}"></span><span class="mt-1 block text-xs text-brand-800">${echapper(o.v)}</span></button>`;
  }
  const pastille = o.couleur ? `<span class="w-4 h-4 rounded-full border border-black/10 flex-none" data-pastille="${o.couleur}"></span>` : '';
  const infos = [o.info, o.prix && groupe === 'decors' ? `+${o.prix} €` : ''].filter(Boolean).join(' · ');
  return `<button type="button" class="choix" data-valeur="${echapper(o.v)}"><span class="flex items-center gap-2"><strong class="text-[15px]">${echapper(o.v)}</strong>${pastille}</span>${infos ? `<span class="text-sm text-brand-700">${echapper(infos)}</span>` : ''}</button>`;
}
function majCurseurParts() {
  const [min, max] = SM_PARTS[nbEtages()];
  const c = $('#sm-parts');
  c.min = min; c.max = max;
  sm.parts = Math.min(max, Math.max(min, sm.parts));
  c.value = sm.parts;
  $('#sm-parts-min').textContent = min; $('#sm-parts-max').textContent = max;
}
function dessinerSurMesure() {
  $('#sm-etapes').innerHTML = SM_ETAPES.map((nom, i) => {
    const k = i + 1, actif = k === sm.etape, fait = k < sm.etape;
    return `<li class="flex-none"><button type="button" data-aller="${k}" ${actif ? 'aria-current="step"' : ''} class="flex items-center gap-2 rounded-full border px-3.5 py-2 ${actif ? 'bg-brand-900 border-brand-900 text-white' : fait ? 'bg-white border-brand-300 text-brand-900' : 'bg-white border-brand-200 text-brand-700'}"><span class="w-6 h-6 rounded-full grid place-items-center text-xs ${actif ? 'bg-white text-brand-950' : fait ? 'bg-brand-200 text-brand-950' : 'bg-brand-100'}">${fait ? icone('coche', 'w-3.5 h-3.5') : k}</span>${nom}</button></li>`;
  }).join('');
  $$('.sm-etape').forEach(el => { el.hidden = Number(el.dataset.etape) !== sm.etape; });
  $$('[data-groupe]').forEach(g => {
    const grp = g.dataset.groupe;
    $$('[data-valeur]', g).forEach(b => b.setAttribute('aria-pressed', String(grp === 'decors' ? sm.decors.has(b.dataset.valeur) : b.dataset.valeur === sm[grp])));
  });
  $('#sm-couleurs-bloc').hidden = !opt('enrobage', sm.enrobage).couleurs;
  $('#sm-precedent').hidden = sm.etape === 1;
  $('#sm-suivant').hidden = sm.etape === 6;
  $('#sm-parts-valeur').textContent = `${sm.parts} parts`;

  const options = [$('#sm-sans-gluten').checked && 'sans gluten', $('#sm-sans-noix').checked && 'sans fruits à coque', $('#sm-moins-sucre').checked && 'moins sucré'].filter(Boolean).join(', ');
  const enr = opt('enrobage', sm.enrobage);
  const lignes = [['Occasion', sm.occasion], ['Forme', `${sm.forme}, ${sm.etages}, ${sm.parts} parts`], ['Biscuit', sm.biscuit], ['Garniture', sm.garniture],
    ['Enrobage', sm.enrobage + (enr.couleurs ? ` (${sm.couleur.toLowerCase()})` : '')], ['Décor', sm.decors.size ? [...sm.decors].join(', ') : '—'], ['Options', options || '—']];
  $('#sm-resume').innerHTML = lignes.map(([k, v]) => `<div class="flex justify-between gap-4 border-b border-brand-800 pb-2"><dt class="text-brand-300 flex-none">${k}</dt><dd class="font-semibold text-white text-right">${echapper(v)}</dd></div>`).join('');
  const noix = !$('#sm-sans-noix').checked && (opt('biscuit', sm.biscuit).noix || opt('garniture', sm.garniture).noix || sm.decors.has('Macarons'));
  const allergenes = [!$('#sm-sans-gluten').checked && !['Dacquoise noisette'].includes(sm.biscuit) && 'gluten', 'œufs', 'lait', noix && 'fruits à coque'].filter(Boolean);
  $('#sm-allergenes').textContent = `Allergènes probables : ${allergenes.join(', ')}. Élodie vous confirme la composition exacte.`;
  const p = prixSurMesure();
  $('#sm-prix').textContent = prix(p);
  $('#sm-prix-part').textContent = `soit environ ${prix(p / sm.parts)} la part`;
  dessinerApercu();
}
function ajouterSurMesure() {
  const options = [$('#sm-sans-gluten').checked && 'sans gluten', $('#sm-sans-noix').checked && 'sans fruits à coque', $('#sm-moins-sucre').checked && 'moins sucré'].filter(Boolean).join(', ');
  const inscription = $('#sm-inscription').value.trim();
  const consignes = $('#sm-consignes').value.trim();
  const enr = opt('enrobage', sm.enrobage);
  const details = `Occasion : ${sm.occasion}. Forme : ${sm.forme}, ${sm.etages}. Biscuit : ${sm.biscuit}. Garniture : ${sm.garniture}. Enrobage : ${sm.enrobage}${enr.couleurs ? ` (${sm.couleur})` : ''}. Décor : ${sm.decors.size ? [...sm.decors].join(', ') : 'aucun'}.${inscription ? ` Inscription : « ${inscription} ».` : ''}${options ? ` Options : ${options}.` : ''}${consignes ? ` Consignes : ${consignes}` : ''}`;
  ajouterAuPanier({ id: 'custom-' + Date.now(), title: `Gâteau sur mesure ${sm.forme.toLowerCase()} (${sm.parts} parts, ${sm.occasion.toLowerCase()})`, price: prixSurMesure(), image: '', produitId: null, taille: `${sm.parts} parts`, parts: sm.parts, details, delai: sm.occasion === 'Mariage / PACS' || nbEtages() > 1 ? 336 : 168 });
  toast('Gâteau sur mesure ajouté à votre demande');
  ouvrir('panier');
}

document.addEventListener('DOMContentLoaded', () => {
  $$('[data-groupe]').forEach(g => { g.innerHTML = SM_OPTIONS[g.dataset.groupe].map(o => boutonChoix(g.dataset.groupe, o)).join(''); });
  // Couleurs des pastilles (sans style écrit dans le HTML, pour la politique de sécurité)
  $$('[data-pastille]').forEach(el => { el.style.backgroundColor = el.dataset.pastille; });
  $$('[data-groupe]').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('[data-valeur]'); if (!b) return;
    const grp = g.dataset.groupe, v = b.dataset.valeur;
    if (grp === 'decors') { if (sm.decors.has(v)) sm.decors.delete(v); else sm.decors.add(v); }
    else sm[grp] = v;
    if (grp === 'etages') majCurseurParts();
    if (grp === 'occasion' && v === 'Mariage / PACS' && nbEtages() === 1) { sm.etages = '2 étages'; majCurseurParts(); }
    dessinerSurMesure();
  }));
  $('#sm-etapes').addEventListener('click', e => { const b = e.target.closest('[data-aller]'); if (b) { sm.etape = Number(b.dataset.aller); dessinerSurMesure(); } });
  $('#sm-suivant').addEventListener('click', () => { sm.etape = Math.min(6, sm.etape + 1); dessinerSurMesure(); });
  $('#sm-precedent').addEventListener('click', () => { sm.etape = Math.max(1, sm.etape - 1); dessinerSurMesure(); });
  $('#sm-parts').addEventListener('input', e => { sm.parts = Number(e.target.value) || sm.parts; dessinerSurMesure(); });
  ['#sm-sans-gluten', '#sm-sans-noix', '#sm-moins-sucre'].forEach(s => $(s).addEventListener('change', dessinerSurMesure));
  $('#sm-inscription').addEventListener('input', dessinerApercu);
  $$('[data-sm-ajouter]').forEach(b => b.addEventListener('click', ajouterSurMesure));
  majCurseurParts();
  dessinerSurMesure();
});
