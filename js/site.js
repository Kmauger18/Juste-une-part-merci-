// Site « Féelodie's » : carte, pages produits, sur mesure, panier et demande de commande.
// Aucun code dans le HTML (onclick…) : tout passe par ce fichier, ce qui permet une politique de sécurité stricte.
'use strict';

/* =========================================================================
   Catalogue intégré (utilisé tant que l'espace de gestion n'a rien envoyé)
   ========================================================================= */
const CATALOGUE = [
  { id: 'cit-4', title: 'Tarte au citron meringuée', category: 'tartes', price: 26, image: 'https://images.unsplash.com/photo-1667933240032-ffa1414d021e?auto=format&fit=crop&q=75&w=800', description: 'Pâte sablée maison, crémeux au citron et meringue italienne dorée au chalumeau.', ingredients: 'Citrons, beurre, sucre, œufs, farine.', badge: 'Fraîcheur', isGlutenFree: false, vedette: true },
  { id: 'tat-1', title: 'Tarte Tatin aux pommes', category: 'tartes', price: 28, image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&q=75&w=800', description: 'Pommes caramélisées au beurre salé, fondantes, sur une pâte croustillante.', ingredients: 'Pommes, beurre demi-sel, sucre, farine.', badge: 'Classique', isGlutenFree: false, vedette: false },
  { id: 'ent-5', title: 'Entremets chocolat framboise', category: 'entremets', price: 34, image: 'https://images.unsplash.com/photo-1619860861574-00fb0519cd05?auto=format&fit=crop&q=75&w=800', description: 'Mousse au chocolat noir, cœur framboise et biscuit moelleux, sous un glaçage brillant.', ingredients: 'Chocolat noir, crème, framboises, œufs, sucre, farine.', badge: 'Gourmand', isGlutenFree: false, vedette: false },
  { id: 'dom-14', title: 'Dômes vanille cœur fraise', category: 'entremets', price: 18, image: 'https://images.unsplash.com/photo-1750437709423-4b7e3e49c21b?auto=format&fit=crop&q=75&w=800', description: 'Mousse légère à la vanille, cœur coulant à la fraise et sablé croustillant.', ingredients: 'Crème, vanille, fraises, sucre, beurre, farine.', badge: 'Nouveauté', isGlutenFree: false, vedette: true },
  { id: 'fra-9', title: 'Fraisier', category: 'gateaux', price: 32, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=75&w=800', description: 'Génoise moelleuse, crème mousseline vanille et fraises fraîches.', ingredients: 'Fraises, œufs, sucre, farine, beurre, lait, vanille.', badge: 'De saison', isGlutenFree: false, vedette: true },
  { id: 'lay-11', title: "Layer cake d'anniversaire", category: 'gateaux', price: 38, image: 'https://images.unsplash.com/photo-1737189409843-c86c2d4770fd?auto=format&fit=crop&q=75&w=800', description: 'Génoises vanille, crème légère et fruits rouges, décoré selon vos envies (prénom, âge, couleurs).', ingredients: 'Farine, œufs, sucre, beurre, crème, fruits rouges, vanille.', badge: 'Anniversaire', isGlutenFree: false, vedette: false },
  { id: 'fon-10', title: 'Forêt-noire', category: 'gateaux', price: 30, image: 'https://images.unsplash.com/photo-1768260731727-275f15ed2556?auto=format&fit=crop&q=75&w=800', description: 'Génoise au cacao, chantilly vanillée et griottes, copeaux de chocolat.', ingredients: 'Chocolat, crème, griottes, œufs, sucre, farine.', badge: 'Tradition', isGlutenFree: false, vedette: false },
  { id: 'nak-12', title: 'Naked cake fleuri', category: 'gateaux', price: 45, image: 'https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?auto=format&fit=crop&q=75&w=800', description: 'Gâteau à étages à la crème légère, décoré de fleurs. Idéal pour un mariage, un baptême ou un anniversaire.', ingredients: 'Farine, œufs, sucre, beurre, crème, fruits de saison.', badge: 'Fêtes et mariages', isGlutenFree: false, vedette: false },
  { id: 'gch-13', title: "Gâteau chocolat d'anniversaire", category: 'gateaux', price: 36, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=75&w=800', description: 'Biscuit au chocolat moelleux, ganache montée et coulure de chocolat noir.', ingredients: 'Chocolat, crème, œufs, sucre, farine, beurre.', badge: 'Anniversaire', isGlutenFree: false, vedette: false },
  { id: 'pbr-2', title: 'Choux craquelin au praliné', category: 'classiques', price: 15, image: 'https://images.unsplash.com/photo-1530449375418-3c3babfb8ea7?auto=format&fit=crop&q=75&w=800', description: "Six choux au craquelin garnis d'une crème mousseline au praliné noisette maison.", ingredients: 'Farine, beurre, œufs, lait, noisettes, sucre.', badge: 'Incontournable', isGlutenFree: false, vedette: false },
  { id: 'ecl-3', title: 'Éclairs au caramel', category: 'classiques', price: 9.5, image: 'https://images.unsplash.com/photo-1670833285737-cd390d9aa101?auto=format&fit=crop&q=75&w=800', description: "Deux grands éclairs garnis d'une crème au caramel au beurre salé, glaçage caramel.", ingredients: 'Farine, beurre, œufs, lait, sucre, crème.', badge: 'Format duo', isGlutenFree: false, vedette: true },
  { id: 'mac-7', title: 'Coffret de macarons (12 pièces)', category: 'classiques', price: 24, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=75&w=800', description: 'Douze macarons faits main : pistache, framboise, chocolat, caramel, citron et vanille.', ingredients: "Poudre d'amande, blancs d'œufs, sucre, ganaches.", badge: 'Sans gluten', isGlutenFree: true, vedette: false }
];

// Tailles proposées (mult = coefficient appliqué au prix de base, parts = nombre de parts)
const TAILLES = [
  { label: '4 parts', mult: 0.6, parts: 4 },
  { label: '6 à 8 parts', mult: 1, parts: 8 },
  { label: '10 à 12 parts', mult: 1.5, parts: 12 }
];
const DETAILS = {
  'cit-4': { tagline: 'Acidulée, fondante, meringue dorée', allergenes: ['Gluten', 'Œufs', 'Lait'], formats: TAILLES, unite: '', conservation: "Au réfrigérateur, jusqu'à 2 jours. La meringue est meilleure le premier jour.", delai: "À commander 48 h à l'avance." },
  'tat-1': { tagline: 'La tarte renversée, comme à la maison', allergenes: ['Gluten', 'Lait'], formats: TAILLES, unite: '', conservation: "Au frais, jusqu'à 2 jours. À tiédir quelques minutes au four avant de servir.", delai: "À commander 48 h à l'avance." },
  'ent-5': { tagline: 'Pour les amoureux de chocolat', allergenes: ['Gluten', 'Œufs', 'Lait', 'Soja'], formats: TAILLES, unite: '', conservation: "Au réfrigérateur, jusqu'à 3 jours. À sortir 20 minutes avant de servir.", delai: "À commander 72 h à l'avance." },
  'dom-14': { tagline: 'Quatre petits entremets à partager', allergenes: ['Gluten', 'Lait', 'Œufs'], formats: null, unite: 'les 4 dômes', conservation: 'Au réfrigérateur, à déguster dans les 48 h.', delai: "À commander 72 h à l'avance." },
  'fra-9': { tagline: 'Le gâteau des beaux jours', allergenes: ['Gluten', 'Œufs', 'Lait'], formats: TAILLES, unite: '', conservation: 'Au réfrigérateur, à consommer dans les 48 h.', delai: "À commander 72 h à l'avance." },
  'lay-11': { tagline: 'Plusieurs étages, décor personnalisé', allergenes: ['Gluten', 'Œufs', 'Lait'], formats: TAILLES, unite: '', conservation: "Au réfrigérateur, jusqu'à 3 jours. À sortir 30 minutes avant de servir.", delai: "À commander une semaine à l'avance." },
  'fon-10': { tagline: 'Chocolat, chantilly et griottes', allergenes: ['Gluten', 'Œufs', 'Lait'], formats: TAILLES, unite: '', conservation: "Au réfrigérateur, jusqu'à 2 jours.", delai: "À commander 72 h à l'avance." },
  'nak-12': { tagline: 'Le gâteau des grandes occasions', allergenes: ['Gluten', 'Œufs', 'Lait'], formats: TAILLES, unite: '', conservation: 'Au réfrigérateur, à consommer dans les 48 h. Les fleurs ne se mangent pas.', delai: "À commander deux semaines à l'avance." },
  'gch-13': { tagline: 'Coulure de chocolat et rosaces de ganache', allergenes: ['Gluten', 'Œufs', 'Lait', 'Soja'], formats: TAILLES, unite: '', conservation: "Au réfrigérateur, jusqu'à 3 jours. À sortir 30 minutes avant de servir.", delai: "À commander une semaine à l'avance." },
  'pbr-2': { tagline: 'Croquants dessus, fondants dedans', allergenes: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'], formats: null, unite: 'les 6 choux', conservation: 'Au réfrigérateur, à consommer dans les 24 h.', delai: "À commander 48 h à l'avance." },
  'ecl-3': { tagline: 'Caramel au beurre salé', allergenes: ['Gluten', 'Œufs', 'Lait'], formats: null, unite: 'le duo', conservation: 'Au réfrigérateur, à déguster le jour même.', delai: "À commander 24 h à l'avance." },
  'mac-7': { tagline: 'Six parfums, douze bouchées', allergenes: ['Œufs', 'Lait', 'Fruits à coque'], formats: null, unite: 'le coffret de 12', conservation: "Au réfrigérateur dans leur boîte, jusqu'à 4 jours.", delai: "À commander 72 h à l'avance." }
};

const FAMILLES = [
  { id: 'moment', label: 'En ce moment', accroche: 'Les gâteaux du moment et les nouveautés' },
  { id: 'tartes', label: 'Tartes', accroche: 'Pâte sablée maison, fruits et crèmes' },
  { id: 'entremets', label: 'Entremets', accroche: 'Mousses, inserts et glaçages' },
  { id: 'gateaux', label: 'Gâteaux', accroche: 'Anniversaires, fêtes et grandes occasions' },
  { id: 'classiques', label: 'Grands classiques', accroche: 'Choux, éclairs, macarons…' }
];
const FAMILLE_DE = { tartes: 'tartes', entremets: 'entremets', gateaux: 'gateaux', classiques: 'classiques', choux: 'classiques', mignardises: 'classiques', glutenfree: 'gateaux', 'sur-mesure': 'gateaux' };
const NOMS_FAMILLES = { tartes: 'Tartes', entremets: 'Entremets', gateaux: 'Gâteaux', classiques: 'Grands classiques', choux: 'Grands classiques', mignardises: 'Grands classiques', glutenfree: 'Sans gluten', 'sur-mesure': 'Gâteaux' };
const TITRES_PAGES = { accueil: 'Pâtisserie maison sur commande', patisseries: 'La carte', 'sur-mesure': 'Gâteau sur mesure', commander: 'Comment commander', histoire: 'À propos', contact: 'Contact', 'mentions-legales': 'Mentions légales', cgv: 'Conditions générales de vente', confidentialite: 'Politique de confidentialité' };
const NOM_SITE = "Féelodie's";

// Photos hébergées sur le site (plus rapides, sans service extérieur) pour les photos connues
const PHOTOS_LOCALES = {
  'photo-1667933240032-ffa1414d021e': 'cit-4', 'photo-1568571780765-9276ac8b75a2': 'tat-1', 'photo-1619860861574-00fb0519cd05': 'ent-5',
  'photo-1750437709423-4b7e3e49c21b': 'dom-14', 'photo-1565958011703-44f9829ba187': 'fra-9', 'photo-1737189409843-c86c2d4770fd': 'lay-11',
  'photo-1768260731727-275f15ed2556': 'fon-10', 'photo-1519654793190-2e8a4806f1f2': 'nak-12', 'photo-1578985545062-69928b1d9587': 'gch-13',
  'photo-1530449375418-3c3babfb8ea7': 'pbr-2', 'photo-1670833285737-cd390d9aa101': 'ecl-3', 'photo-1569864358642-9d1684040f43': 'mac-7'
};

/* =========================================================================
   Outils
   ========================================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const echapper = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const prix = n => (Number(n) || 0).toFixed(2).replace('.', ',') + ' €';
const icone = (nom, classe = '') => `<svg class="ic ${classe}" aria-hidden="true"><use href="img/icones.svg#${nom}"/></svg>`;
const idSur = id => String(id || '').replace(/[^a-zA-Z0-9_-]/g, '');

// N'accepte que des images sûres : https, image intégrée (data:image/…) ou fichier du site
function imageSure(url) {
  const u = String(url || '').trim();
  if (/^https:\/\//i.test(u) || /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(u) || /^img\/[\w./-]+$/.test(u)) return u;
  return '';
}
// Renvoie { src, srcset } pour une image du catalogue, en version locale quand elle existe
function sourcesImage(url, largeur) {
  const u = imageSure(url);
  const m = u.match(/images\.unsplash\.com\/(photo-[\w-]+)/);
  const locale = m && PHOTOS_LOCALES[m[1]];
  if (locale) return { src: `img/photos/${locale}-${largeur > 500 ? 960 : 480}.webp`, srcset: `img/photos/${locale}-480.webp 480w, img/photos/${locale}-960.webp 960w` };
  if (m) {
    const a = w => u.replace(/([?&])w=\d+/, '$1w=' + w);
    return { src: a(largeur), srcset: `${a(480)} 480w, ${a(960)} 960w` };
  }
  return { src: u, srcset: '' };
}
function heuresDelai(texte) {
  const t = String(texte || '').toLowerCase();
  if (/deux semaines|2 semaines/.test(t)) return 336;
  if (/semaine/.test(t)) return 168;
  const h = t.match(/(\d+)\s*h/);
  if (h) return Number(h[1]);
  const j = t.match(/(\d+)\s*jour/);
  if (j) return Number(j[1]) * 24;
  return 48;
}
const dateISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/* =========================================================================
   État
   ========================================================================= */
let panier = [];
try { panier = JSON.parse(localStorage.getItem('elodie_cart')) || []; if (!Array.isArray(panier)) panier = []; } catch (e) { panier = []; }
let familleActive = 'all';
let pp = { produit: null, format: 0, qte: 1 };
let commandesOuvertes = true;
let messageFermeture = '';

const familleDe = p => FAMILLE_DE[p.category] || 'classiques';
function produitsDe(f) {
  if (f === 'all') return CATALOGUE;
  if (f === 'moment') return CATALOGUE.filter(p => p.vedette);
  if (f === 'glutenfree') return CATALOGUE.filter(p => p.isGlutenFree);
  return CATALOGUE.filter(p => familleDe(p) === f);
}

/* =========================================================================
   Cartes produits
   ========================================================================= */
function carteProduit(p) {
  const d = DETAILS[p.id] || {};
  const img = sourcesImage(p.image, 480);
  const id = idSur(p.id);
  const delai = heuresDelai(d.delai);
  const delaiTexte = delai >= 168 ? (delai >= 336 ? '2 semaines' : '1 semaine') : `${delai} h`;
  return `<article class="carte overflow-hidden flex flex-col group hover:border-brand-400 transition-colors">
    <a href="#produit-${id}" class="relative block aspect-[4/3] bg-brand-100 overflow-hidden" tabindex="-1" aria-hidden="true">
      ${img.src ? `<img src="${echapper(img.src)}" ${img.srcset ? `srcset="${echapper(img.srcset)}" sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw"` : ''} alt="" width="480" height="360" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500">` : ''}
      ${p.badge ? `<span class="absolute top-3 left-3 pastille bg-white/95 text-brand-950">${echapper(p.badge)}</span>` : ''}
    </a>
    <div class="p-5 flex-grow flex flex-col">
      <h3 class="font-display text-lg font-bold text-brand-950 leading-snug"><a href="#produit-${id}" class="hover:underline decoration-brand-300 underline-offset-4">${echapper(p.title)}</a></h3>
      <p class="mt-1.5 text-sm text-brand-700 line-clamp-2">${echapper(p.description)}</p>
      <div class="mt-auto pt-4 flex items-end justify-between gap-3">
        <span class="font-display text-xl font-bold text-brand-950">${d.formats ? '<span class="font-sans text-xs font-semibold text-brand-700">dès </span>' : ''}${prix(p.price)}</span>
        <span class="pastille bg-brand-100 text-brand-800">${icone('horloge')} ${delaiTexte}</span>
      </div>
    </div>
  </article>`;
}

function dessinerAccueil() {
  // Familles : une photo différente par tuile
  const utilisees = new Set(), photos = {};
  [...FAMILLES.slice(1), FAMILLES[0]].forEach(f => {
    const l = produitsDe(f.id).filter(p => imageSure(p.image));
    const c = l.find(p => !utilisees.has(p.image)) || l[0];
    if (c) { photos[f.id] = c.image; utilisees.add(c.image); }
  });
  $('#grille-familles').innerHTML = FAMILLES.map((f, i) => {
    const n = produitsDe(f.id).length;
    const img = photos[f.id] ? sourcesImage(photos[f.id], 480) : null;
    return `<a href="#genre-${f.id}" class="group relative block overflow-hidden rounded-2xl bg-brand-900 ${i === 0 ? 'col-span-2 lg:col-span-1 aspect-[2/1] lg:aspect-[3/4]' : 'aspect-square lg:aspect-[3/4]'}">
      ${img ? `<img src="${echapper(img.src)}" alt="" width="480" height="640" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` : ''}
      <span class="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent"></span>
      <span class="absolute inset-x-0 bottom-0 p-4 text-white">
        <span class="block font-display text-xl sm:text-2xl font-bold leading-tight">${f.label}</span>
        <span class="mt-1 flex items-center gap-1.5 text-xs text-brand-100">${n} pâtisserie${n > 1 ? 's' : ''} ${icone('fleche-droite', 'group-hover:translate-x-1 transition-transform')}</span>
      </span>
    </a>`;
  }).join('');
  const moment = produitsDe('moment');
  $('#grille-moment').innerHTML = (moment.length ? moment : CATALOGUE).slice(0, 4).map(carteProduit).join('');
}

function dessinerCarte() {
  const q = ($('#recherche').value || '').toLowerCase().trim();
  const f = FAMILLES.find(x => x.id === familleActive);
  const titre = f ? f.label : (familleActive === 'glutenfree' ? 'Sans gluten' : 'Toute la carte');
  $('#carte-titre').textContent = titre;
  $('#carte-ariane').textContent = titre;
  $('#carte-intro').textContent = f ? `${f.accroche}. Touchez un gâteau pour voir les tailles, les allergènes et commander.` : 'Tous les gâteaux sont faits à la commande. Touchez un gâteau pour voir les tailles, les allergènes et commander.';
  const boutons = [{ id: 'all', label: 'Tout' }, ...FAMILLES, { id: 'glutenfree', label: 'Sans gluten' }];
  $('#filtres').innerHTML = boutons.map(b => {
    const actif = b.id === familleActive;
    return `<a href="#genre-${b.id}" ${actif ? 'aria-current="true"' : ''} class="flex-none rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${actif ? 'bg-brand-900 border-brand-900 text-white' : 'bg-white border-brand-200 text-brand-800 hover:border-brand-400'}">${b.label} <span class="${actif ? 'text-brand-200' : 'text-brand-600'}">${produitsDe(b.id).length}</span></a>`;
  }).join('');
  const liste = produitsDe(familleActive).filter(p => !q || (p.title + ' ' + p.description + ' ' + p.ingredients).toLowerCase().includes(q));
  $('#carte-compte').textContent = `${liste.length} pâtisserie${liste.length > 1 ? 's' : ''}`;
  $('#grille-carte').innerHTML = liste.length ? liste.map(carteProduit).join('')
    : `<div class="col-span-full carte p-10 text-center"><p class="font-semibold text-brand-950">Aucun gâteau ne correspond à « ${echapper(q)} ».</p><p class="mt-1 text-sm text-brand-700">Essayez un autre mot, ou <a href="#sur-mesure" class="lien">composez un gâteau sur mesure</a>.</p></div>`;
}

/* =========================================================================
   Page produit
   ========================================================================= */
function prixProduit() {
  const d = DETAILS[pp.produit.id] || {};
  const mult = d.formats ? d.formats[pp.format].mult : 1;
  return Math.round(pp.produit.price * mult * 2) / 2;
}
function majProduit() {
  const d = DETAILS[pp.produit.id] || {};
  const p = prixProduit();
  $('#pp-prix').textContent = prix(p);
  $('#pp-prix-note').textContent = d.formats ? d.formats[pp.format].label : (d.unite || '');
  $('#pp-quantite').textContent = pp.qte;
  $('#pp-barre-prix').textContent = prix(p * pp.qte);
  $('#pp-ajouter span').textContent = `Ajouter au panier · ${prix(p * pp.qte)}`;
  $$('#pp-tailles button').forEach((b, i) => b.setAttribute('aria-checked', String(i === pp.format)));
}
function dessinerProduit(id) {
  const produit = CATALOGUE.find(p => p.id === id);
  if (!produit) return false;
  const d = DETAILS[id] || {};
  pp = { produit, format: d.formats ? 1 : 0, qte: 1 };
  const img = sourcesImage(produit.image, 960);
  const el = $('#pp-image');
  el.src = img.src || 'img/logo-icone.svg';
  if (img.srcset) { el.srcset = img.srcset; el.sizes = '(min-width:1024px) 50vw, 100vw'; } else el.removeAttribute('srcset');
  el.alt = produit.title;
  $('#pp-badge').textContent = produit.badge || '';
  $('#pp-badge').hidden = !produit.badge;
  $('#pp-ariane').textContent = produit.title;
  const fam = FAMILLES.find(x => x.id === familleDe(produit));
  const lien = $('#pp-ariane-famille');
  lien.textContent = fam ? fam.label : 'La carte';
  lien.href = fam ? '#genre-' + fam.id : '#patisseries';
  $('#pp-famille').textContent = NOMS_FAMILLES[produit.category] || '';
  $('#pp-titre').textContent = produit.title;
  $('#pp-accroche').textContent = d.tagline || '';
  $('#pp-description').textContent = produit.description;
  $('#pp-ingredients').textContent = produit.ingredients || 'Liste des ingrédients sur demande.';
  $('#pp-conservation').textContent = d.conservation || 'Au réfrigérateur, à consommer rapidement.';
  $('#pp-delai').textContent = `${d.delai || "À commander 48 h à l'avance."} Retrait sur rendez-vous.`;
  $('#pp-barre-titre').textContent = produit.title;
  $('#pp-allergenes').innerHTML = (d.allergenes || []).length
    ? d.allergenes.map(a => `<span class="pastille bg-amber-50 border border-amber-300 text-amber-900">${echapper(a)}</span>`).join('')
    : '<span class="text-sm text-brand-800">Aucun des 14 allergènes majeurs dans la recette.</span>';
  $('#pp-tailles-bloc').hidden = !d.formats;
  $('#pp-tailles').innerHTML = (d.formats || []).map((f, i) => `<button type="button" role="radio" class="choix items-center text-center py-3" data-i="${i}"><strong class="text-sm">${echapper(f.label)}</strong><span class="text-xs text-brand-700">${prix(Math.round(produit.price * f.mult * 2) / 2)}</span></button>`).join('');
  const autres = CATALOGUE.filter(p => p.id !== id).sort((x, y) => (familleDe(y) === familleDe(produit)) - (familleDe(x) === familleDe(produit)));
  $('#pp-suggestions').innerHTML = autres.slice(0, 3).map(carteProduit).join('');
  document.title = `${produit.title} · ${NOM_SITE}`;
  majProduit();
  return true;
}
function ajouterProduitCourant() {
  const d = DETAILS[pp.produit.id] || {};
  const taille = d.formats ? d.formats[pp.format] : null;
  const ligne = {
    id: pp.produit.id + (taille ? '-' + pp.format : ''),
    title: pp.produit.title + (taille ? ` (${taille.label})` : ''),
    price: prixProduit(),
    image: sourcesImage(pp.produit.image, 480).src,
    produitId: pp.produit.id, taille: taille ? taille.label : (d.unite || ''), parts: taille ? taille.parts : 1,
    delai: heuresDelai(d.delai)
  };
  for (let i = 0; i < pp.qte; i++) ajouterAuPanier(ligne);
  toast(`${pp.qte} × ${ligne.title} ajouté au panier`);
}

/* =========================================================================
   Navigation (#adresse : le bouton retour et les liens partagés fonctionnent)
   ========================================================================= */
function afficherRoute(defiler) {
  const route = decodeURIComponent(location.hash.slice(1)) || 'accueil';
  if (route === 'contenu') return;
  let page = route;
  if (route.startsWith('genre-')) {
    const g = route.slice(6);
    familleActive = ['all', 'glutenfree', ...FAMILLES.map(x => x.id)].includes(g) ? g : 'all';
    $('#recherche').value = '';
    dessinerCarte();
    page = 'patisseries';
  } else if (route === 'patisseries') {
    familleActive = 'all'; $('#recherche').value = ''; dessinerCarte();
  } else if (route.startsWith('produit-')) {
    page = dessinerProduit(route.slice(8)) ? 'produit' : 'patisseries';
    if (page === 'patisseries') dessinerCarte();
  } else if (!document.getElementById('page-' + route)) {
    page = 'accueil';
  }
  $$('.page-view').forEach(v => v.classList.toggle('active', v.id === 'page-' + page));
  document.body.classList.toggle('page-produit-ouverte', page === 'produit');
  if (page !== 'produit') {
    const fam = route.startsWith('genre-') ? (FAMILLES.find(x => x.id === familleActive) || {}).label : null;
    document.title = page === 'accueil' ? `${NOM_SITE} · Pâtisserie maison sur commande` : `${fam || TITRES_PAGES[page] || ''} · ${NOM_SITE}`;
  }
  $$('[data-nav]').forEach(a => {
    const actif = a.dataset.nav === page || (page === 'produit' && a.dataset.nav === 'patisseries');
    a.classList.toggle('bg-brand-100', actif);
    a.classList.toggle('text-terracotta-dark', actif);
    if (actif) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  fermerMenu();
  if (defiler !== false) {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    $('#contenu').focus({ preventScroll: true });
  }
}
function fermerMenu() { $('#menu-mobile').hidden = true; $('#bouton-menu').setAttribute('aria-expanded', 'false'); }

/* =========================================================================
   Fenêtres (panier, commande, confirmation) : focus et touche Échap
   ========================================================================= */
let dernierFocus = null;
function ouvrir(id) {
  dernierFocus = document.activeElement;
  $$('[role="dialog"]').forEach(d => { if (d.id !== id) d.hidden = true; });
  const d = document.getElementById(id);
  d.hidden = false;
  document.body.classList.add('overflow-hidden');
  const cible = d.querySelector('input:not([type=hidden]):not([tabindex="-1"]), button:not([data-fermer]), [data-fermer]');
  setTimeout(() => cible && cible.focus(), 30);
}
function fermer(id) {
  const d = document.getElementById(id);
  if (!d || d.hidden) return;
  d.hidden = true;
  if (!$$('[role="dialog"]').some(x => !x.hidden)) document.body.classList.remove('overflow-hidden');
  if (dernierFocus && document.contains(dernierFocus)) dernierFocus.focus();
}
function dialogueOuvert() { return $$('[role="dialog"]').find(d => !d.hidden); }
document.addEventListener('keydown', e => {
  const d = dialogueOuvert();
  if (!d) return;
  if (e.key === 'Escape') { fermer(d.id); return; }
  if (e.key === 'Tab') { // garde le focus dans la fenêtre
    const f = $$('a[href], button:not([disabled]), input:not([tabindex="-1"]):not([disabled]), select, textarea', d).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});

/* =========================================================================
   Panier
   ========================================================================= */
function enregistrerPanier() { try { localStorage.setItem('elodie_cart', JSON.stringify(panier)); } catch (e) {} }
function ajouterAuPanier(ligne) {
  const l = panier.find(x => x.id === ligne.id);
  if (l) l.qty += 1; else panier.push({ ...ligne, qty: 1 });
  enregistrerPanier(); dessinerPanier();
}
function changerQuantite(id, delta) {
  const l = panier.find(x => x.id === id);
  if (!l) return;
  l.qty += delta;
  if (l.qty <= 0) panier = panier.filter(x => x.id !== id);
  enregistrerPanier(); dessinerPanier();
}
const totalPanier = () => panier.reduce((s, l) => s + (Number(l.price) || 0) * l.qty, 0);
function dessinerPanier() {
  const n = panier.reduce((s, l) => s + l.qty, 0);
  $('#panier-compteur').textContent = n;
  $('#ouvrir-panier').setAttribute('aria-label', `Panier ${n} article${n > 1 ? 's' : ''}`);
  $('#panier-lignes').innerHTML = panier.length ? panier.map(l => `
    <div class="carte p-3 flex items-center gap-3">
      ${imageSure(l.image) ? `<img src="${echapper(imageSure(l.image))}" alt="" width="56" height="56" class="w-14 h-14 rounded-xl object-cover flex-none">` : `<span class="w-14 h-14 rounded-xl bg-brand-100 grid place-items-center text-terracotta-dark flex-none">${icone('gateau')}</span>`}
      <div class="min-w-0 flex-1"><p class="font-semibold text-sm text-brand-950 line-clamp-2">${echapper(l.title)}</p><p class="text-sm text-brand-700">${prix(l.price)}</p></div>
      <div class="flex items-center rounded-xl border border-brand-200">
        <button type="button" data-qte="-1" data-id="${echapper(l.id)}" class="w-10 h-10 grid place-items-center" aria-label="Retirer un ${echapper(l.title)}">${icone('moins')}</button>
        <span class="w-6 text-center text-sm font-bold">${l.qty}</span>
        <button type="button" data-qte="1" data-id="${echapper(l.id)}" class="w-10 h-10 grid place-items-center" aria-label="Ajouter un ${echapper(l.title)}">${icone('plus')}</button>
      </div>
    </div>`).join('')
    : `<div class="text-center py-14"><span class="mx-auto w-14 h-14 rounded-full bg-brand-100 grid place-items-center text-terracotta-dark">${icone('panier', 'w-6 h-6')}</span><p class="mt-4 font-semibold text-brand-950">Votre panier est vide</p><p class="mt-1 text-sm text-brand-700">Choisissez un gâteau sur la carte.</p><a href="#patisseries" data-fermer-lien class="mt-5 btn-secondaire">Voir la carte</a></div>`;
  $('#panier-total').textContent = prix(totalPanier());
  $('#ck-total').textContent = prix(totalPanier());
  $('#panier-commander').disabled = !panier.length || !commandesOuvertes;
}

/* =========================================================================
   Demande de commande
   ========================================================================= */
let ouvertureCommande = 0;
function delaiMiniHeures() { return Math.max(24, ...panier.map(l => Number(l.delai) || (String(l.id).startsWith('custom-') ? 168 : 48))); }
function preparerCommande() {
  if (!panier.length) return;
  if (!commandesOuvertes) { toast(messageFermeture || 'Les commandes sont fermées pour le moment.'); return; }
  const h = delaiMiniHeures();
  const min = new Date(); min.setDate(min.getDate() + Math.ceil(h / 24));
  const champ = $('#ck-date');
  champ.min = dateISO(min);
  if (!champ.value || champ.value < champ.min) champ.value = champ.min;
  $('#ck-delai').textContent = `Premier jour possible pour cette commande : ${min.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}.`;
  $('#ck-erreur').hidden = true;
  ouvertureCommande = Date.now();
  ouvrir('commande');
}
function erreurCommande(msg, champ) {
  const e = $('#ck-erreur'); e.textContent = msg; e.hidden = false;
  if (champ) { champ.setAttribute('aria-invalid', 'true'); champ.focus(); }
}
async function envoyerCommande(e) {
  e.preventDefault();
  const f = e.currentTarget;
  $$('[aria-invalid]', f).forEach(x => x.removeAttribute('aria-invalid'));
  const v = id => document.getElementById(id).value.trim();
  for (const id of ['ck-prenom', 'ck-nom', 'ck-tel', 'ck-email', 'ck-date']) {
    if (!v(id)) return erreurCommande('Merci de remplir tous les champs.', document.getElementById(id));
  }
  if (v('ck-tel').replace(/\D/g, '').length < 10) return erreurCommande('Le numéro de téléphone semble incomplet.', $('#ck-tel'));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('ck-email'))) return erreurCommande("L'adresse e-mail semble incorrecte.", $('#ck-email'));
  if (v('ck-date') < $('#ck-date').min) return erreurCommande('Ce jour est trop proche : choisissez une date à partir du ' + new Date($('#ck-date').min + 'T12:00').toLocaleDateString('fr-FR') + '.', $('#ck-date'));
  if (!$('#ck-cgv').checked) return erreurCommande('Merci d\'accepter les conditions générales de vente.', $('#ck-cgv'));
  // Anti-robots : champ piège rempli, envoi trop rapide ou répété
  const dernier = Number(localStorage.getItem('elodie_dernier_envoi') || 0);
  if ($('#ck-site').value || Date.now() - ouvertureCommande < 3000) return erreurCommande('Merci de vérifier votre demande puis de réessayer.');
  if (Date.now() - dernier < 60000) return erreurCommande('Une demande vient déjà d\'être envoyée. Patientez une minute avant d\'en envoyer une autre.');

  const lignes = panier.map(l => ({ produitId: l.produitId || null, titre: l.title, taille: l.taille || '', parts: Number(l.parts) || 1, qty: l.qty, prix: Number(l.price) || 0, details: l.details || '' }));
  const client = { nom: `${v('ck-prenom')} ${v('ck-nom')}`, tel: v('ck-tel'), email: v('ck-email') };
  const bouton = $('#ck-envoyer');
  if (window.__siteEnLigne && window.__siteEnLigne.envoyerCommande) {
    bouton.disabled = true; bouton.textContent = 'Envoi…';
    try {
      const numero = await window.__siteEnLigne.envoyerCommande({ client, lignes, dateRetrait: v('ck-date'), heure: v('ck-heure'), message: v('ck-message') });
      try { localStorage.setItem('elodie_dernier_envoi', String(Date.now())); } catch (err) {}
      panier = []; enregistrerPanier(); dessinerPanier();
      f.reset(); fermer('commande');
      $('#confirmation-numero').textContent = numero;
      ouvrir('confirmation');
    } catch (err) {
      console.error(err);
      erreurCommande("L'envoi n'a pas fonctionné. Vérifiez votre connexion et réessayez, ou appelez Élodie.");
    } finally { bouton.disabled = false; bouton.textContent = 'Envoyer ma demande'; }
    return;
  }
  // Sans base en ligne : message prêt à envoyer par e-mail ou SMS
  const texte = `Bonjour Élodie, je souhaite commander :\n${lignes.map(l => `- ${l.qty} × ${l.titre} (${prix(l.prix * l.qty)})${l.details ? `\n  ${l.details}` : ''}`).join('\n')}\n\nTotal estimé : ${prix(totalPanier())}\nRetrait souhaité : ${new Date(v('ck-date') + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}, ${v('ck-heure')}\n${v('ck-message') ? `\n${v('ck-message')}\n` : ''}\n${client.nom}\n${client.tel}\n${client.email}`;
  fermer('commande');
  envoyerMessage('Demande de commande', texte);
}

/* =========================================================================
   Infos du site (infos.txt, ou espace de gestion)
   ========================================================================= */
const INFOS = {};
let infosDistantes = false;
const cle = c => c.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
function appliquerInfos() {
  $$('[data-info]').forEach(el => { const k = cle(el.dataset.info); if (INFOS[k]) el.textContent = INFOS[k]; });
  $$('[data-info-bloc]').forEach(el => { el.hidden = !INFOS[cle(el.dataset.infoBloc)]; });
  const tel = (INFOS.telephone || '').replace(/[^0-9+]/g, '').replace(/^0/, '+33');
  $$('[data-info-tel]').forEach(a => { if (tel) a.href = 'tel:' + tel; });
  const mail = INFOS.email || '';
  $$('[data-info-mail]').forEach(a => { if (/^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i.test(mail)) a.href = 'mailto:' + mail; });
}
$$('[data-info]').forEach(el => { const k = cle(el.dataset.info); if (!(k in INFOS)) INFOS[k] = el.textContent.trim(); });
fetch('infos.txt', { cache: 'no-store' }).then(r => r.ok ? r.text() : Promise.reject()).then(txt => {
  if (infosDistantes) return;
  txt.split(/\r?\n/).forEach(l => {
    if (!l.trim() || l.trim().startsWith('#')) return;
    const i = l.indexOf(':');
    if (i > 0) INFOS[cle(l.slice(0, i))] = l.slice(i + 1).trim();
  });
  appliquerInfos();
}).catch(() => {});

function appliquerOuverture(ouvert, message) {
  commandesOuvertes = ouvert;
  messageFermeture = message || 'Les commandes sont fermées pour le moment.';
  $('#panier-ferme').textContent = messageFermeture;
  $('#panier-ferme').hidden = ouvert;
  $('#bandeau-texte').textContent = ouvert ? "Sur commande uniquement · 48 h à l'avance · Retrait sur rendez-vous" : messageFermeture;
  $('#bandeau-info').classList.toggle('bg-terracotta-dark', !ouvert);
  $('#bandeau-info').classList.toggle('bg-brand-950', ouvert);
  dessinerPanier();
}

// Message à Élodie : par e-mail si une adresse est renseignée, sinon par SMS
function envoyerMessage(sujet, texte) {
  const mail = INFOS.email;
  const tel = (INFOS.telephone || '').replace(/[^0-9+]/g, '');
  if (mail && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(mail)) {
    location.href = `mailto:${mail}?subject=${encodeURIComponent(sujet + ' – ' + NOM_SITE)}&body=${encodeURIComponent(texte)}`;
    toast("Votre messagerie s'ouvre : il ne reste qu'à envoyer.");
  } else if (tel) {
    location.href = `sms:${tel}?&body=${encodeURIComponent(texte)}`;
    toast("Vos SMS s'ouvrent : il ne reste qu'à envoyer.");
  }
}

/* =========================================================================
   Notification
   ========================================================================= */
let minuteurToast;
function toast(msg) {
  const t = $('#toast');
  $('#toast-texte').textContent = msg;
  t.classList.remove('opacity-0', 'translate-y-4');
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => t.classList.add('opacity-0', 'translate-y-4'), 2800);
}

/* =========================================================================
   Données en ligne (appelé par js/site-en-ligne.js)
   ========================================================================= */
window.__site = {
  appliquerCatalogue(produits) {
    if (!Array.isArray(produits) || !produits.length) return;
    CATALOGUE.length = 0;
    Object.keys(DETAILS).forEach(k => delete DETAILS[k]);
    produits.forEach(p => {
      const id = idSur(p.id);
      if (!id) return;
      CATALOGUE.push({ id, title: String(p.titre || ''), category: String(p.categorie || ''), price: Number(p.prix) || 0, image: imageSure(p.image), description: String(p.description || ''), ingredients: String(p.ingredients || ''), badge: String(p.badge || ''), isGlutenFree: !!p.sansGluten, vedette: !!p.vedette });
      DETAILS[id] = { tagline: String(p.accroche || ''), allergenes: Array.isArray(p.allergenes) ? p.allergenes.map(String) : [], formats: p.tailles ? TAILLES : null, unite: String(p.unite || ''), conservation: String(p.conservation || ''), delai: String(p.delai || '') };
    });
    dessinerAccueil();
    dessinerCarte();
    if (location.hash.startsWith('#produit-')) afficherRoute(false);
  },
  appliquerInfos(p) {
    infosDistantes = true;
    const champs = { telephone: p.telephone, email: p.email, adresse: p.adresse, 'horaires semaine': p.horairesSemaine, 'horaires dimanche': p.horairesDimanche, 'nom legal': p.nomLegal, statut: p.statut, siret: p.siret, 'adresse legale': p.adresseLegale, mediateur: p.mediateur, 'mention tva': p.mentionTva };
    Object.entries(champs).forEach(([k, v]) => { if (typeof v === 'string') INFOS[k] = v.trim() || (k === 'nom legal' ? INFOS[k] : ''); });
    appliquerInfos();
    const creneaux = String(p.creneaux || '').split('\n').map(x => x.trim()).filter(Boolean);
    if (creneaux.length) $('#ck-heure').innerHTML = creneaux.map(c => `<option>${echapper(c)}</option>`).join('');
    appliquerOuverture(p.commandesOuvertes !== false, p.messageFermeture);
  }
};

/* =========================================================================
   Démarrage
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  $('#annee').textContent = new Date().getFullYear();
  appliquerInfos();
  dessinerAccueil();
  dessinerCarte();
  dessinerPanier();
  afficherRoute(false);

  window.addEventListener('hashchange', () => afficherRoute(true));
  $('#recherche').addEventListener('input', dessinerCarte);
  $('#bouton-menu').addEventListener('click', e => {
    const m = $('#menu-mobile'); m.hidden = !m.hidden;
    e.currentTarget.setAttribute('aria-expanded', String(!m.hidden));
  });

  // Page produit
  $('#pp-tailles').addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) { pp.format = Number(b.dataset.i); majProduit(); } });
  $('#pp-moins').addEventListener('click', () => { pp.qte = Math.max(1, pp.qte - 1); majProduit(); });
  $('#pp-plus').addEventListener('click', () => { pp.qte = Math.min(20, pp.qte + 1); majProduit(); });
  $('#pp-ajouter').addEventListener('click', ajouterProduitCourant);
  $('#pp-barre-ajouter').addEventListener('click', ajouterProduitCourant);

  // Panier et fenêtres
  $('#ouvrir-panier').addEventListener('click', () => ouvrir('panier'));
  $('#panier-lignes').addEventListener('click', e => { const b = e.target.closest('button[data-qte]'); if (b) changerQuantite(b.dataset.id, Number(b.dataset.qte)); });
  $('#panier-commander').addEventListener('click', preparerCommande);
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-fermer]');
    if (f) { const d = f.closest('[role="dialog"]'); if (d) fermer(d.id); }
    const l = e.target.closest('[data-fermer-lien]');
    if (l) { const d = l.closest('[role="dialog"]'); if (d) { d.hidden = true; document.body.classList.remove('overflow-hidden'); } }
  });
  $('#form-commande').addEventListener('submit', envoyerCommande);

  // Contact
  $('#form-contact').addEventListener('submit', e => {
    e.preventDefault();
    const nom = $('#ct-nom').value.trim(), coord = $('#ct-tel').value.trim(), msg = $('#ct-message').value.trim();
    if (!nom || !coord || !msg) { toast('Merci de remplir les trois champs.'); return; }
    envoyerMessage('Question', `${msg}\n\n${nom}\n${coord}`);
  });
});
