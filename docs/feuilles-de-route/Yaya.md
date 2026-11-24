# Feuille de route de Yaya : permissions, playlist et tests

**Ton rôle** : les droits dans un salon (qui contrôle la vidéo, qui est l'hôte), la playlist collaborative, et la qualité du projet : tests automatiques, recette, README.

**Charge prévue du 24/11 au 15/12** : environ 32,5 h. Lis d'abord le [guide commun](LISEZMOI.md).

**Tes dossiers** : `server/src/modules/permissions/`, `server/src/modules/playlist/` (à créer), `client/src/modules/permissions/` et `client/src/modules/playlist/` (à créer), `server/tests/`.

## Phase 1 : reprendre les permissions et préparer les tests (25/11 → 30/11)

### GES-05 · Compte GitHub · tout de suite · 0,5 h
Envoie ton pseudo GitHub à Yanis.

### GES-10 · Relire les documents · 25–27/11 · 1,5 h
Dans l'analyse : UC6 (permissions), UC7 (playlist), UC8 (départ), le diagramme DS6 et le plan de tests de l'annexe C. Dans le rapport de conception : §6.5, §6.6 et §10 (stratégie de tests). Envoie tes questions sur Discord.

### APP-04 · Prise en main de la base et de ton module · 26–27/11 · 1,5 h
- **Tu attends** que Yanis ait créé le dépôt (GES-06).
- Cloner, installer, lancer, tester à deux onglets, lancer `npm test`.
- Yanis a écrit la première version de **ton** module : `server/src/modules/permissions/permissions.js`. Lis-le en entier. Tu dois pouvoir expliquer en une phrase ce que fait chaque fonction (`peutControler`, `elireNouvelHoteSiBesoin`), et où elle est utilisée (`evenementsSalons.js`).
- Regarde aussi `server/tests/salons.test.js` : c'est le modèle des tests unitaires.

### TST-02 · Environnement de tests d'intégration · 27–28/11 · 2 h
- **Tu attends** ta prise en main (APP-04).
- But : tester le serveur avec de vrais clients, comme deux navigateurs.
- Dans `server/tests/integration/` : démarrer un serveur de test avec `creerServeur()` (fichier `server/src/serveur.js`) et `serveurHttp.listen(0)` (port libre choisi automatiquement), puis connecter des clients avec `socket.io-client` (déjà installé).
- Premier test : un client crée un salon, un second le rejoint, le premier reçoit `room:users` avec 2 participants.
- **C'est fini quand** ce test passe avec `npm test`.

### TST-03 · Tests unitaires des permissions · 28–30/11 · 2 h
Dans `server/tests/permissions.test.js`, à partir des règles de l'analyse (UC6, invariants) :
- le créateur est hôte et peut contrôler ; un nouvel arrivant ne peut pas ;
- avec `controleTous = true`, tout le monde peut contrôler ;
- un participant inconnu ne peut pas contrôler ;
- quand l'hôte part, le participant **le plus ancien** devient hôte ; il y a toujours exactement un hôte.

**Dimanche 29/11** : réunion d'équipe n°1. **Mardi 01/12** : séance, tu montres tes tests (`npm test`).

## Phase 2 : délégation, transfert d'hôte, playlist (01/12 → 07/12)

| Tâche | Quand | Durée | Ce que tu fais | C'est fini quand |
|---|---|---|---|---|
| FIC-04 | 01–02/12 | 1 h | Fiche d'une page `docs/modules/permissions.md` : règles de droits, succession d'hôte, délégation | La fiche est dans le dépôt |
| PER-02 | 02–04/12 | 3 h | Délégation (F13). Serveur : `perm:grant { targetId }`, `perm:revoke { targetId }`, `perm:setAll { enabled }`, **refusés avec `FORBIDDEN` si l'émetteur n'est pas l'hôte**, puis diffusion de `room:users`. Client : dans un panneau `client/src/modules/permissions/`, l'hôte voit un bouton « Donner / retirer le contrôle » par participant et une case « Tout le monde peut contrôler » | L'hôte donne puis retire le contrôle, et l'autre onglet le voit |
| PER-03 | 04–05/12 | 2 h | Transfert manuel d'hôte (F14) : `host:transfer { targetId }`. Il doit être **atomique** : l'ancien perd `estHote`, le nouveau le reçoit, puis un seul `room:users`. Infobulle « Seul l'hôte peut contrôler la vidéo » sur les commandes grisées (NF14) | Transfert fonctionnel, infobulle visible |
| PLA-01 | 05–07/12 | 3 h | Playlist côté serveur (F15, **si le prof l'a validée** : à demander le 01/12). File FIFO dans `server/src/modules/playlist/` : `playlist:add` (tout participant), `playlist:remove` et `playlist:next` (droit de contrôle), diffusion de `playlist:updated`. À la fin d'une vidéo, ne passer à la suivante **qu'une seule fois**, même si plusieurs navigateurs le signalent. **Mohammed fait l'interface (PLA-02) en parallèle** | Les vidéos s'enchaînent automatiquement |

**Dimanche 06/12** : réunion n°2. **Mardi 08/12** : séance, démonstration.

## Phase 3 : tests, recette, README (08/12 → 15/12)

| Tâche | Quand | Durée | Ce que tu fais |
|---|---|---|---|
| TST-04 | 08–10/12 | 3 h | Tests d'intégration à plusieurs clients : entrée dans un salon, pause propagée, refus `FORBIDDEN` d'un non-hôte, chat entre clients, transfert d'hôte |
| REC-04 | 09–11/12 | 2 h | Dérouler T17 à T19, T23 à T25 et T28 à T30 (annexe C de l'analyse) ; noter PASS/FAIL |
| COR-04 | 10–13/12 | 2 h | Corriger les anomalies des permissions et de la playlist |
| DOC-01 | 11–12/12 | 1 h | README complet : installation, lancement, tests. Vérifier qu'un autre membre arrive à installer le projet en le suivant |
| RAP-01, RAP-02 | 09–14/12 | 4 h | Ta contribution à la partie collective (bilan qualité et tests), puis ta partie individuelle |
| SOU-01 | 13–14/12 | 1,5 h | Répétition de la soutenance |

En tant que responsable qualité, avant chaque séance, lance `npm test` sur `main` et signale tout test rouge sur Discord.

## Ce que tu dois savoir expliquer au prof
- La règle de contrôle : hôte, ou droit donné par l'hôte, ou « tout le monde peut contrôler ».
- Pourquoi ces règles sont vérifiées par le serveur et pas seulement dans l'interface (NF07).
- Comment le prochain hôte est choisi quand l'hôte part.
- La différence entre un test unitaire et un test d'intégration, avec un exemple de chacun dans le projet.
