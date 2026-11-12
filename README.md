# Juste une part, merci !

Site de pâtisserie maison d'Élodie : pâtisserie française traditionnelle et gâteaux sur mesure.

## Modifier le téléphone, l'e-mail, l'adresse ou les horaires

Tout se trouve dans **`infos.txt`**. Sur GitHub :

1. Ouvre `infos.txt`, clique sur le crayon (Edit).
2. Change le texte après les deux-points, par exemple `Email : justeunepartmerci@gmail.com`.
3. Clique sur **Commit changes**.

Le site se met à jour en 1 à 2 minutes. Une ligne laissée vide (ex. `Email :`) est masquée sur le site.

## Commandes et messages

Le site n'enregistre rien lui-même. Quand un client valide son panier ou le formulaire de contact,
sa messagerie s'ouvre avec la commande déjà rédigée :

- par **e-mail** si une adresse est renseignée dans `infos.txt` ;
- sinon par **SMS** au numéro de téléphone.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Le site |
| `infos.txt` | Coordonnées et horaires affichés sur le site |

## Mise en ligne

Le site est publié avec GitHub Pages (Settings → Pages → branche `main`, dossier `/ (root)`).
