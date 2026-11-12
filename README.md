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

Dans `index.html`, cherche :

- `const CATALOG` : nom, catégorie, prix de base (pour 6 à 8 parts), photo, description, ingrédients ;
- `const DETAILS` : pour chaque gâteau, la phrase d'accroche, les allergènes, les tailles proposées, la conservation et le délai de commande.

Chaque gâteau a sa propre page, par exemple `#produit-tat-1`. Les prix des tailles sont calculés automatiquement à partir du prix de base (`TAILLES` : 4 parts × 0,6 ; 10 à 12 parts × 1,5).

## Commandes et messages

Le site n'enregistre rien lui-même. Quand un client valide son panier ou le formulaire de contact,
sa messagerie s'ouvre avec la commande déjà rédigée :

- par **e-mail** si une adresse est renseignée dans `infos.txt` ;
- sinon par **SMS** au numéro de téléphone.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Le site (toutes les pages) |
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
