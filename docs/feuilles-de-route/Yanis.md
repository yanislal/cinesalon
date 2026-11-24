# Feuille de route de Yanis : chef de projet, socle et salons

**Ton rôle** : faire avancer l'équipe sans tout coder toi-même. Tu organises, tu débloques, tu assembles le travail de chacun et tu termines ton module Salons.

**Charge prévue du 24/11 au 15/12** : environ 41 h. Lis d'abord le [guide commun](LISEZMOI.md).

## Déjà fait (24 et 25/11)

| Tâche | Contenu |
|---|---|
| GES-01 | Situation présentée au prof, reconstruction validée |
| GES-02 | Gantt v2.1, feuilles de route, liste des tickets |
| SOC-01, SOC-02 | Socle : projet client + serveur, format des réponses, codes d'erreur |
| SAL-01, SAL-02, SAL-03 | Salons : classes, événements, pages Accueil et Salon, tests unitaires |
| PER-01 | Règle « seul l'hôte contrôle » et succession d'hôte (code ensuite repris par Yaya) |

Pense à noter ces sessions dans le journal de bord avec tes vraies heures.

## Phase 1 : publier la base et faire démarrer l'équipe (25/11 → 30/11)

### GES-06 · Créer le dépôt GitHub · 25–26/11 · 2 h
1. Créer le dépôt `cinesalon` sur ton compte GitHub (privé ou public, à toi de voir).
2. Envoyer la base : un commit par tâche déjà faite, puis `git push`.
3. Dans `.github/CODEOWNERS`, remplacer `@pseudo-...` par les vrais pseudos et enlever les `#`.
4. Settings → Branches : protéger `main` (PR obligatoire, 1 relecture).
5. Créer le tableau **Projects** (colonnes : À faire, En cours, En relecture, Terminé) et importer les tickets (`GESTION/tickets_github.csv`, avec GitHub CLI).
6. Inviter les 3 membres (Settings → Collaborators).
- **Tu attends** les pseudos GitHub des 3 autres (GES-03 à GES-05) pour finir l'étape 6.
- **Tout le monde t'attend** : personne ne peut commencer sans le dépôt. C'est ta priorité n°1.

### GES-07 · Journal de bord · 25/11 · 1 h
Importer `GESTION/Journal_de_bord_CineSalon.xlsx` dans Google Sheets, le partager aux 3 membres en mode éditeur, envoyer le lien sur Discord.

### Pendant la semaine : aider et suivre (GES-16)
- Répondre aux questions sur le code de la base (tu l'as écrit, tu dois pouvoir l'expliquer).
- Vérifier chaque soir le tableau Projects : qui est bloqué ?
- **Dimanche 29/11** : animer la réunion d'équipe n°1 (GES-11, 30 min). Compte rendu dans l'onglet « Réunions » du journal.

### INT-01 · Assemblage · 30/11 · 2 h
- **Tu attends** : VID-02 (Aymen) et CHA-01 (Mohammed) fusionnés.
- Relire et fusionner leurs PR si ce n'est pas déjà fait, lancer `npm test`, tester à deux onglets : créer un salon, charger une vidéo, pause/lecture synchronisées, messages du chat.
- **C'est fini quand** `main` contient salons + vidéo + chat qui fonctionnent ensemble.

## Séance du mardi 01/12 (GES-12)
Montrer au prof : la démo (deux navigateurs), le dépôt GitHub (branches, PR relues, commits par tâche), le tableau Projects, le journal de bord, le Gantt v2.1. Chacun présente sa partie.

## Phase 2 : terminer le module Salons (01/12 → 07/12)

| Tâche | Quand | Durée | Ce que tu fais | C'est fini quand |
|---|---|---|---|---|
| FIC-01 | 01–02/12 | 1 h | Fiche d'une page `docs/modules/salons.md` : rôle du module, fichiers, événements, règles (pseudo unique, hôte, suppression du salon vide) | La fiche est dans le dépôt |
| SAL-04 | 02–03/12 | 2 h | Liste des salons publics sur l'accueil (F12) : événement `room:list` (le client demande la liste) et `room:list:updated` (le serveur prévient l'accueil à chaque création, départ ou suppression). Afficher nom, nombre de participants, bouton « Rejoindre » | Un salon public apparaît et disparaît sans recharger la page |
| SAL-05 | 03–04/12 | 1 h | Bouton « Copier le lien » dans la page salon (`navigator.clipboard.writeText`) ; vérifier qu'on entre en 3 clics depuis le lien (NF12) | Lien copié, salon rejoint en 3 clics |
| INT-03 | 06–07/12 | 1,5 h | **Tu attends** SAL-04, VID-05, CHA-02 et PER-03. Fusionner, régler les conflits, tester l'ensemble | `main` est stable avant la séance du 08/12 |

**Dimanche 06/12** : réunion n°2 (GES-13). **Mardi 08/12** : séance (GES-14), démonstration de tous les modules.

## Phase 3 : recette et rapport (08/12 → 15/12)

| Tâche | Quand | Durée | Ce que tu fais |
|---|---|---|---|
| REC-01 | 09–11/12 | 2 h | Dérouler les tests T01 à T08 et T27 (annexe C de l'analyse) sur Chrome, Firefox et Edge ; noter PASS/FAIL |
| COR-01 | 10–13/12 | 2 h | Corriger les anomalies trouvées dans le module Salons |
| RAP-01 | 09–14/12 | 2 h | Coordonner la partie collective du rapport : prévu (Gantt v1) / replanifié (v2.1) / réalisé (journal), les difficultés, le bilan sur la cascade |
| RAP-02 | 09–14/12 | 2 h | Ta partie individuelle : rôle de chef de projet, la reprise du 24/11, ce que tu as appris |
| SOU-01 | 13–14/12 | 1,5 h | Préparer et répéter la soutenance |

**Dimanche 13/12** : réunion n°3 (GES-15). **Mardi 15/12** : rendu final.

## Ce que tu dois savoir expliquer au prof
- Pourquoi on a tout repris le 24/11, et comment on a réorganisé le travail (Gantt v2.1, GitHub, journal).
- Le code de la base : `Salon.js`, `GestionnaireSalons.js`, `evenementsSalons.js` (ce que fait chaque événement).
- Pourquoi le serveur vérifie tout (NF05, NF07) et pourquoi le mot de passe est haché (NF08).
- Le choix de `bcryptjs` : même algorithme que bcrypt, sans compilation sous Windows.
