// Relie le site à la base de données de l'espace de gestion (Firebase).
// Si Firebase n'est pas configuré (firebase-config.js vide), le site garde
// son catalogue intégré et envoie les commandes par e-mail ou SMS.
import { firebaseConfig, firebaseActif, FIREBASE_SDK } from '../firebase-config.js';

async function demarrer() {
  if (!firebaseActif) return;
  const [{ initializeApp }, fs] = await Promise.all([
    import(`${FIREBASE_SDK}/firebase-app.js`),
    import(`${FIREBASE_SDK}/firebase-firestore-lite.js`)
  ]);
  const app = initializeApp(firebaseConfig);
  const db = fs.getFirestore(app);
  const etat = { commandesOuvertes: true, messageFermeture: '' };

  async function envoyerCommande({ client, lignes, dateRetrait, heure, message }) {
    const propres = lignes.slice(0, 30).map(l => ({
      produitId: l.produitId || null,
      titre: String(l.titre || '').slice(0, 200),
      taille: String(l.taille || '').slice(0, 60),
      parts: Math.max(1, Math.min(500, Number(l.parts) || 1)),
      qty: Math.max(1, Math.min(50, Number(l.qty) || 1)),
      prix: Math.max(0, Number(l.prix) || 0)
    }));
    const details = lignes.map(l => l.details).filter(Boolean).join('\n');
    const numero = 'S-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    await fs.addDoc(fs.collection(db, 'commandes'), {
      numero,
      client: { nom: String(client.nom || '').slice(0, 120), tel: String(client.tel || '').slice(0, 30), email: String(client.email || '').slice(0, 120) },
      lignes: propres,
      total: Math.round(propres.reduce((s, l) => s + l.prix * l.qty, 0) * 100) / 100,
      dateRetrait: String(dateRetrait || '').slice(0, 10),
      heure: String(heure || '').slice(0, 40),
      message: [details, message].filter(Boolean).join('\n').slice(0, 2000),
      statut: 'nouvelle',
      source: 'site',
      notes: '', acompte: 0, paye: false, stockDeduit: false,
      creeLe: Date.now()
    });
    return numero;
  }

  window.__siteEnLigne = Object.assign(etat, { envoyerCommande });

  // Infos (téléphone, horaires, ouverture des commandes)
  fs.getDoc(fs.doc(db, 'parametres', 'infos')).then(snap => {
    if (!snap.exists()) return;
    const p = snap.data();
    etat.commandesOuvertes = p.commandesOuvertes !== false;
    etat.messageFermeture = p.messageFermeture || '';
    window.__site?.appliquerInfos(p);
  }).catch(err => console.warn('Infos en ligne indisponibles', err));

  // Catalogue (gâteaux visibles, dans l'ordre choisi)
  fs.getDocs(fs.query(fs.collection(db, 'produits'), fs.where('visible', '==', true))).then(snap => {
    const produits = [];
    snap.forEach(d => produits.push({ id: d.id, ...d.data() }));
    produits.sort((a, b) => (a.ordre || 99) - (b.ordre || 99));
    window.__site?.appliquerCatalogue(produits);
  }).catch(err => console.warn('Catalogue en ligne indisponible', err));
}

demarrer().catch(err => console.warn('Connexion à la base impossible, le site reste en mode simple.', err));
