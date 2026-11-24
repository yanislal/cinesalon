# Feuille de route d'Aymen : vidéo synchronisée

**Ton rôle** : le cœur technique du projet. Tu codes toute la synchronisation de la vidéo YouTube (F06 à F09) et tu es le référent technique : tu relis et fusionnes les PR des autres.

**Charge prévue du 24/11 au 15/12** : environ 36 h. Lis d'abord le [guide commun](LISEZMOI.md), puis le [guide technique du module Vidéo](../../server/src/modules/video/LISEZMOI.md).

**Tes dossiers** : `server/src/modules/video/` et `client/src/modules/video/`.

## Phase 1 : la vidéo synchronisée (25/11 → 30/11)

### GES-03 · Compte GitHub · tout de suite · 0,5 h
Envoie ton pseudo GitHub à Yanis.

### GES-08 · Relire les documents · 25–27/11 · 1,5 h
Dans le rapport de conception : §5.3 (événements vidéo) et §7 (algorithmes de synchronisation). Dans l'analyse : UC3, UC4 et les diagrammes DS2 et DS3. Le `CLAUDE.md` résume tout (sections « Synchronisation vidéo » et « Contrat d'événements »). Envoie tes questions sur Discord.

### VID-03 · Prototype de l'anti-écho · 26–28/11 · 2 h · **tu peux commencer tout de suite**
Une page HTML seule, **en dehors du projet**, avec le lecteur YouTube (IFrame Player API). Montre qu'une pause appliquée par le programme n'est pas renvoyée comme une nouvelle pause : c'est la boucle d'écho, le risque n°1 du projet.
- Idée : une variable `isRemoteUpdate` mise à `true` avant `player.pauseVideo()`, et l'événement `onStateChange` qui ne réémet rien tant qu'elle est vraie.
- Attention : les notifications de YouTube arrivent **après** la commande. Ne remets pas `isRemoteUpdate` à `false` trop tôt.
- **Ton VID-02 dépend de ce prototype.**

### APP-02 · Prise en main de la base · 26/11 · 1,5 h
- **Tu attends** que Yanis ait créé le dépôt (GES-06).
- Cloner, installer, lancer (voir le guide commun), tester à deux onglets.
- Lire `server/src/serveur.js`, `server/src/commun/`, `server/src/modules/salons/evenementsSalons.js` et `server/src/modules/permissions/permissions.js`.
- Relire la PR de la base et l'approuver sur GitHub (tu es le référent technique).

### VID-01 · État vidéo côté serveur · 27–28/11 · 3 h
- **Tu attends** APP-02 (ta prise en main).
- Créer `VideoEtat.js` (position de référence) et `evenementsVideo.js` (`video:load`, `video:play`, `video:pause`, `video:seek`), activer la ligne `brancherEvenementsVideo` dans `serveur.js`.
- Contrôle des droits avec `peutControler(salon, socket.id)` : sinon `FORBIDDEN` + `video:sync` envoyé au navigateur fautif.
- Tests unitaires du calcul de position dans `server/tests/video.test.js`.
- Détail complet : [guide technique du module Vidéo](../../server/src/modules/video/LISEZMOI.md).
- **C'est fini quand** les tests passent et qu'un non-hôte reçoit `FORBIDDEN`.

### VID-02 · Lecteur côté client · 29–30/11 · 3,5 h
- **Tu attends** VID-01 et ton prototype VID-03.
- Remplacer l'emplacement réservé `client/src/modules/video/Lecteur.jsx` : lecteur YouTube, champ « URL YouTube » (formats `watch?v=`, `youtu.be/`, `embed/`), application des `video:sync` reçus, anti-écho, recalage toutes les 5 s si l'écart dépasse 1,5 s.
- Commandes grisées si `moi.peutControler` est faux (le composant reçoit déjà `moi` et `etat`).
- Le lecteur ne démarre qu'après le clic sur « Rejoindre le salon » (NF15, déjà en place dans la page Salon).
- **Yanis t'attend** pour l'assemblage du 30/11 (INT-01).
- **C'est fini quand** une pause dans un onglet met l'autre en pause en moins d'une seconde, sans boucle.

**Dimanche 29/11** : réunion d'équipe n°1. **Mardi 01/12** : séance, tu montres la vidéo synchronisée.

## Phase 2 : fiabiliser la vidéo (01/12 → 07/12)

| Tâche | Quand | Durée | Ce que tu fais | C'est fini quand |
|---|---|---|---|---|
| FIC-02 | 01–02/12 | 1 h | Fiche d'une page `docs/modules/video.md` : comment marche la synchronisation, l'anti-écho, le recalage | La fiche est dans le dépôt |
| TST-01 | 02–04/12 | 1,5 h | Rédiger les fiches de test TV01 à TV08 (rapport de conception §10.3) : procédure et résultat attendu | 8 fiches dans `docs/tests/` |
| VID-04 | 02–04/12 | 3 h | Reconnexion après une brève coupure (NF04) : ne pas retirer tout de suite un participant déconnecté (délai de grâce, à toi d'en choisir la durée), puis lui renvoyer l'état complet. Le départ est géré dans `evenementsSalons.js` (événement `disconnect`) : préviens Yanis avant de le modifier | Après une coupure, on retrouve le salon synchronisé |
| VID-05 | 04–05/12 | 1,5 h | Vidéos impossibles à lire (erreurs YouTube 100, 101, 150) : code `VIDEO_UNAVAILABLE` et bandeau « Cette vidéo ne peut pas être lue en dehors de YouTube » | Message clair, le chat reste utilisable |
| VID-06 | 05–07/12 | 2 h | Mesurer le délai de propagation et l'écart entre deux navigateurs, ajuster le recalage | Mesures notées : < 1 s (NF01) et ≤ 1,5 s (NF02) |
| INT-02 | 02–07/12 | 1,5 h | Relire et fusionner les PR des autres au fil de la semaine | Aucune PR en attente plus de 24 h |

**Décision à prendre et à noter** : vérification de la dérive faite par le client (conception) ou par un `video:heartbeat` envoyé par le serveur (analyse, DS3). Écris ton choix et pourquoi dans ta fiche FIC-02.

## Phase 3 : recette et rapport (08/12 → 15/12)

| Tâche | Quand | Durée | Ce que tu fais |
|---|---|---|---|
| REC-02 | 09–11/12 | 2 h | Dérouler T09 à T16 et TV01 à TV08 sur Chrome, Firefox, Edge ; noter PASS/FAIL |
| COR-02 | 10–13/12 | 2 h | Corriger les anomalies du module Vidéo |
| DOC-02 | 12–13/12 | 1,5 h | Préparer la démo du 15/12 : version locale testée sur 2 machines, vidéos de démonstration choisies d'avance |
| RAP-01, RAP-02 | 09–14/12 | 4 h | Ta contribution à la partie collective, puis ta partie individuelle |
| SOU-01 | 13–14/12 | 1,5 h | Répétition de la soutenance |

## Ce que tu dois savoir expliquer au prof
- La formule de la position de référence et pourquoi c'est l'horloge du serveur qui fait foi.
- La boucle d'écho et comment ton code l'évite.
- Pourquoi le recalage ne se fait qu'au-delà de 1,5 s.
- Ce qui se passe si un non-hôte touche au lecteur.
