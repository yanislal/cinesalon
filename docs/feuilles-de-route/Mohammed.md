# Feuille de route de Mohammed : chat et interface

**Ton rôle** : le chat en temps réel (F10, F16) et l'apparence de toute l'application (charte graphique, affichage sur mobile).

**Charge prévue du 24/11 au 15/12** : environ 32,5 h. Lis d'abord le [guide commun](LISEZMOI.md).

**Tes dossiers** : `server/src/modules/chat/` (à créer), `client/src/modules/chat/` et `client/src/styles.css`.

## Phase 1 : charte graphique et chat (25/11 → 30/11)

### GES-04 · Compte GitHub · tout de suite · 0,5 h
Envoie ton pseudo GitHub à Yanis.

### GES-09 · Relire les documents · 25–27/11 · 1,5 h
Dans l'analyse : UC5 (envoyer un message), le diagramme DS4 et les maquettes de l'annexe B. Dans le rapport de conception : §5.4 (événements du chat), §6.4 et §8 (écrans). Envoie tes questions sur Discord.

### UI-01 · Charte graphique · 26–29/11 · 3 h · **tu peux commencer tout de suite**
Choisir les couleurs, la police, le style des boutons, des champs et des « cartes », en respectant des contrastes lisibles (accessibilité). Tu peux commencer sur papier ou dans une page HTML à part, puis l'intégrer dans `client/src/styles.css` (le fichier actuel est provisoire et t'appartient).

### APP-03 · Prise en main de la base · 26–27/11 · 1,5 h
- **Tu attends** que Yanis ait créé le dépôt (GES-06).
- Cloner, installer, lancer, tester à deux onglets.
- Lire `client/src/pages/Salon.jsx` (où ton composant `Chat` est affiché), `client/src/socket.js` et `server/src/modules/salons/evenementsSalons.js` (pour voir comment un module écoute des événements).

### CHA-01 · Le chat · 28–30/11 · 2,5 h
- **Tu attends** ta prise en main (APP-03).
- **Côté serveur**, dans `server/src/modules/chat/` :
  1. `Message.js` : `{ id, auteurPseudo, texte, heureEnvoi, estSysteme }`.
  2. `evenementsChat.js` avec `export function brancherEvenementsChat(io, socket, gestionnaire)`, sur le modèle de `evenementsSalons.js`, puis activer la ligne commentée dans `server/src/serveur.js`.
  3. Sur `chat:message` `{ texte }` : retrouver le salon (`gestionnaire.obtenirSalon(socket.data.codeSalon)`) et le participant (`salon.participants.get(socket.id)`). Refuser avec `INVALID_PAYLOAD` si le texte est vide ou fait plus de 500 caractères après `trim()`. Refuser avec `RATE_LIMITED` au-delà de 5 messages en 2 secondes (utilise `participant.horodatagesMessages`). Créer le message **avec le pseudo du serveur**, jamais celui envoyé par le navigateur. L'ajouter à `salon.messages` (garder les 500 derniers) et le diffuser avec `io.to(salon.code).emit('chat:message', message)`.
  4. Tests unitaires dans `server/tests/chat.test.js` (longueur, anti-spam).
- **Côté client**, remplacer l'emplacement réservé `client/src/modules/chat/Chat.jsx` : afficher `etat.messages` puis écouter `chat:message` ; champ de saisie limité à 500 caractères, envoi avec `envoyer('chat:message', { texte })`, affichage du message d'erreur si refus.
- **Sécurité (NF10)** : en React, `{message.texte}` affiche le texte comme du texte, donc le HTML n'est pas interprété. N'utilise **jamais** `dangerouslySetInnerHTML`. Échapper aussi côté serveur afficherait `&lt;` à l'écran (contradiction notée dans le CLAUDE.md) : note ton choix dans ta fiche FIC-03.
- **Yanis t'attend** pour l'assemblage du 30/11 (INT-01).
- **C'est fini quand** deux onglets se parlent, avec le pseudo et l'heure, et que le 6e message en 2 secondes est refusé.

### UI-02 · Maquette de la page salon · 28–30/11 · 2 h
Disposition de la page salon (vidéo à gauche, participants et chat à droite, une seule colonne sur mobile), fidèle à la maquette B3 de l'analyse. **Tu peux commencer pendant UI-01, mais pas finir avant la fin de UI-01.**

**Dimanche 29/11** : réunion d'équipe n°1. **Mardi 01/12** : séance, tu montres le chat et la charte.

## Phase 2 : finitions (01/12 → 08/12)

| Tâche | Quand | Durée | Ce que tu fais | C'est fini quand |
|---|---|---|---|---|
| FIC-03 | 01–02/12 | 1 h | Fiche d'une page `docs/modules/chat.md` : fonctionnement, validation, anti-spam, choix pour la sécurité XSS | La fiche est dans le dépôt |
| UI-03 | 02–04/12 | 3 h | Appliquer la charte à toutes les pages ; vérifier l'affichage sur téléphone (NF17) et que tout est en français (NF13) | Toutes les pages suivent la charte |
| CHA-02 | 03–05/12 | 2 h | Messages système (F16) : « X a rejoint le salon », « X a quitté le salon », « X a lancé une nouvelle vidéo », « X est désormais l'hôte ». Événement `chat:system` (`estSysteme: true`), affiché différemment. Les départs et arrivées sont dans `evenementsSalons.js` (Yanis), et la vidéo dans le module d'Aymen : prévois avec eux une fonction commune à appeler, par exemple `envoyerMessageSysteme(io, salon, texte)` | Les 4 types de messages s'affichent |
| CHA-03 | 05–06/12 | 1,5 h | Finitions : heure au format 14:05, défilement automatique vers le dernier message, compteur « 123/500 », message clair en cas d'anti-spam | Chat conforme à l'UC5 |
| PLA-02 | 06–08/12 | 2 h | Interface de la playlist : champ URL, liste des vidéos à venir, boutons « Retirer » et « Suivante » (grisés si pas le droit). **Tu peux commencer en même temps que la tâche PLA-01 de Yaya, mais pas finir avant la fin de PLA-01** | Playlist utilisable dans la page salon |

**Dimanche 06/12** : réunion n°2. **Mardi 08/12** : séance, démonstration de tous les modules.

## Phase 3 : recette et rapport (08/12 → 15/12)

| Tâche | Quand | Durée | Ce que tu fais |
|---|---|---|---|
| REC-03 | 09–11/12 | 2 h | Dérouler T20 à T22, T26 et T31 à T33 (annexe C de l'analyse) sur Chrome, Firefox et Edge, sur ordinateur et téléphone |
| COR-03 | 10–13/12 | 2 h | Corriger les anomalies du chat et de l'interface |
| RAP-01, RAP-02 | 09–14/12 | 4 h | Ta contribution à la partie collective, puis ta partie individuelle |
| SOU-01 | 13–14/12 | 1,5 h | Répétition de la soutenance |

## Ce que tu dois savoir expliquer au prof
- Le trajet d'un message : saisie → `chat:message` → validations du serveur → diffusion au salon → affichage.
- Pourquoi le pseudo vient du serveur et pas du navigateur.
- Comment l'anti-spam compte les messages des 2 dernières secondes.
- Pourquoi un message contenant `<script>` ne s'exécute pas.
