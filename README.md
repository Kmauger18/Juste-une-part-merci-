# Juste une part, merci !

Site de pâtisserie maison d'Élodie : pâtisserie française traditionnelle et gâteaux sur mesure.

En ligne (une fois GitHub Pages activé) : https://kmauger18.github.io/Juste-une-part-merci-/

## Espace de gestion

Le catalogue, les infos et les commandes peuvent être gérés depuis l'espace de gestion d'Élodie (dépôt [Juste-une-part-gestion](https://github.com/Kmauger18/Juste-une-part-gestion)). Une fois Firebase configuré (voir le guide dans ce dépôt et `firebase-config.js` ici) :

- les gâteaux affichés et leurs prix viennent de l'espace de gestion ;
- le téléphone, l'e-mail, les horaires et les créneaux aussi (`infos.txt` ne sert plus que de secours) ;
- les commandes du site arrivent directement dans l'espace de gestion.

Tant que `firebase-config.js` est vide, le site fonctionne comme décrit ci-dessous.

## Modifier le téléphone, l'e-mail, l'adresse ou les horaires

Tout se trouve dans **`infos.txt`**. Sur GitHub :

1. Ouvre `infos.txt`, clique sur le crayon (Edit).
2. Change le texte après les deux-points, par exemple `Email : justeunepartmerci@gmail.com`.
3. Clique sur **Commit changes**.

Le site se met à jour en 1 à 2 minutes. Une ligne laissée vide (ex. `Email :`) est masquée sur le site.

## Modifier les gâteaux

Avec l'espace de gestion, tout se fait dans l'onglet Produits. Sans lui, dans `js/site.js`, cherche :

- `const CATALOGUE` : nom, catégorie, prix de base (pour 6 à 8 parts), photo, description, ingrédients ;
- `const DETAILS` : pour chaque gâteau, la phrase d'accroche, les allergènes, les tailles proposées, la conservation et le délai de commande.

Chaque gâteau a sa propre page, par exemple `#produit-tat-1`. Les prix des tailles sont calculés automatiquement à partir du prix de base (`TAILLES` : 4 parts × 0,6 ; 10 à 12 parts × 1,5).

## Commandes et messages

Avec l'espace de gestion, les demandes de commande y arrivent directement. Sans lui, et pour le
formulaire de contact, la messagerie du client s'ouvre avec le message déjà rédigé :

- par **e-mail** si une adresse est renseignée dans `infos.txt` ;
- sinon par **SMS** au numéro de téléphone.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Le site (toutes les pages, y compris mentions légales, CGV et confidentialité) |
| `js/site.js` | Carte, pages produits, sur mesure, panier et demande de commande |
| `img/icones.svg` | Icônes du site (aucun service extérieur) |
| `img/photos/` | Photos du catalogue en WebP (480 et 960 px) |
| `robots.txt`, `sitemap.xml`, `404.html` | Référencement et page d'erreur |
| `infos.txt` | Coordonnées et horaires affichés sur le site (secours si l'espace de gestion n'est pas branché) |
| `firebase-config.js`, `js/site-en-ligne.js` | Connexion à la base de l'espace de gestion |
| `css/style.css` | Styles compilés (ne pas modifier à la main) |
| `css/source.css`, `tailwind.config.js` | Source des styles et couleurs |
| `fonts/` | Polices hébergées sur le site |
| `img/` | Logo, icônes d'onglet, image de partage sur les réseaux sociaux |
| `site.webmanifest` | Icône quand le site est ajouté à l'écran d'accueil d'un téléphone |

## Si tu ajoutes de nouvelles classes Tailwind dans `index.html`

Les styles sont compilés pour que le site charge vite. Après avoir ajouté des classes qui n'existaient pas encore, régénère `css/style.css` :

```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -i css/source.css -o css/style.css --minify
```

Changer un texte, un prix ou `infos.txt` ne nécessite pas cette étape.

## Mise en ligne

Le site est publié avec GitHub Pages (Settings → Pages → branche `main`, dossier `/ (root)`).


## Sécurité et conformité

- **Politique de sécurité du contenu** (balise `Content-Security-Policy` dans `index.html`) : seuls les fichiers du site, Firebase et les photos Unsplash peuvent être chargés. Aucun code JavaScript dans le HTML : tout est dans `js/site.js`.
- **Contenu venant de la base échappé** avant affichage, et seules les images `https://`, `data:image/…` ou du site sont acceptées.
- **Demande de commande** : vérification des champs, délai minimal selon les gâteaux du panier, acceptation des CGV, champ piège à robots, une demande par minute au plus. La base vérifie aussi chaque demande (règles Firestore dans le dépôt de gestion).
- **Aucun cookie**, aucune mesure d'audience, aucune publicité : pas de bandeau cookies nécessaire. Le panier reste dans le navigateur.
- **Pages légales** : mentions légales, conditions générales de vente, politique de confidentialité. Les informations légales (nom, statut, adresse, SIRET, médiateur, mention TVA) se remplissent dans l'espace de gestion (Paramètres → Informations légales) ou, à défaut, dans `infos.txt`.

À faire dans Google Cloud / Firebase (non modifiable depuis le code) : restreindre la clé d'API Firebase au domaine `kmauger18.github.io`, activer App Check, et la double authentification sur le compte Google propriétaire du projet.
