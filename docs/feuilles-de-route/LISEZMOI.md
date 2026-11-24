# Feuilles de route : à lire en premier

Ce dossier dit à chacun **exactement quoi faire, dans quel ordre et pour quand**, sans avoir besoin de lire le diagramme de Gantt.

| Membre | Feuille de route | Module |
|---|---|---|
| Yanis | [Yanis.md](Yanis.md) | Chef de projet, socle, salons |
| Aymen | [Aymen.md](Aymen.md) | Vidéo synchronisée |
| Mohammed | [Mohammed.md](Mohammed.md) | Chat et interface |
| Yaya | [Yaya.md](Yaya.md) | Permissions, playlist, tests |

Le Gantt (fichier `Gantt_v2_CineSalon.xlsx`, version 2.1) reste la référence officielle pour le prof. Ces feuilles de route en sont la traduction en langage simple. **Chaque tâche a un identifiant** (par exemple `VID-01`) : c'est le même dans le Gantt, sur GitHub et dans le journal de bord.

## Ce qui s'est passé et ce qu'on fait maintenant

On avait codé chacun de notre côté et l'assemblage ne marchait pas. Le 24/11, on a décidé (avec l'accord du prof) de repartir d'une base commune propre. Yanis a écrit cette base les 24 et 25/11 : le socle, les salons et la règle « seul l'hôte contrôle ». **Chacun code maintenant son propre module sur cette base**, chacun dans son dossier.

## Le calendrier

| Date | Séance | Ce qui doit être prêt |
|---|---|---|
| Mardi 01/12 | oui | Vidéo synchronisée + chat qui marchent sur la base, assemblés par Yanis |
| Mardi 08/12 | oui | Toutes les fonctionnalités terminées (délégation, transfert d'hôte, playlist, salons publics…) |
| Mardi 15/12 | oui | **Rendu final** : code, README, rapport final (collectif + individuel) |

Réunions d'équipe de 30 min (en visio) : **dimanche 29/11, dimanche 06/12, dimanche 13/12**. Le jour peut changer, l'important est qu'elles aient lieu et soient notées dans le journal.

## À faire une seule fois : installer le projet

1. Installer **Git** (https://git-scm.com) et **Node.js 20 ou plus** (https://nodejs.org, version LTS).
2. Accepter l'invitation GitHub reçue par e-mail (Yanis t'ajoute au dépôt dès qu'il a ton pseudo).
3. Dans un terminal :
   ```bash
   git clone <adresse du dépôt donnée par Yanis>
   cd cinesalon
   npm run installer
   npm run dev
   ```
4. Ouvrir http://localhost:5173 dans **deux onglets**. Créer un salon dans le premier, copier le code, le rejoindre dans le second. Si les deux onglets se voient dans « Participants », ton installation marche.
5. `npm test` lance les tests automatiques : ils doivent tous être verts.

## La routine pour CHAQUE tâche (toujours la même)

1. **Sur GitHub, onglet Projects** : prends le ticket de ta tâche (ex. `[VID-01] ...`) et déplace-le dans la colonne « En cours ».
2. **Pars de la dernière version de main** :
   ```bash
   git checkout main
   git pull
   ```
3. **Crée une branche pour la tâche** (identifiant + 2 ou 3 mots) :
   ```bash
   git checkout -b feat/VID-01-etat-video
   ```
4. **Code**, en restant dans les dossiers de ton module. Lance `npm test` et vérifie dans le navigateur.
5. **Commit** (plusieurs petits commits, c'est bien) :
   ```bash
   git add .
   git commit -m "feat(video): calcul de la position de référence [VID-01]"
   ```
   Si une IA t'a aidé, ajoute `[IA : nom de l'outil]` à la fin du message. C'est obligatoire dans le sujet.
6. **Envoie sur GitHub** :
   ```bash
   git push -u origin feat/VID-01-etat-video
   ```
7. **Sur GitHub, ouvre une Pull Request** (bouton vert « Compare & pull request »). Dans la description, écris `Closes #12` (le numéro du ticket) et deux lignes sur ce que tu as fait. Demande une relecture à un autre membre.
8. **Après relecture**, fusionne la PR. Le ticket passe tout seul en « Terminé ».

**Ne jamais** coder directement sur `main`. **Ne jamais** modifier le dossier d'un autre module sans prévenir son responsable.

## Le journal de bord (Google Sheets partagé)

À **chaque** session de travail, ajoute une ligne : date, heure de début, heure de fin, tâche (ex. `VID-01`), ce que tu as fait, le résultat (lien du commit ou de la PR). La durée se calcule toute seule.

- Remplis-le **le jour même**, pas une semaine après.
- Les séances et les réunions comptent aussi (type « Séance » ou « Réunion »).
- Si tu attends le travail de quelqu'un, écris-le dans « En attente de / bloqué par ».
- Les heures sont réelles. On n'invente rien et on ne recopie pas les heures prévues.

C'est ce document, avec l'historique GitHub, qui prouve au prof qui a fait quoi. La note individuelle en dépend.

## L'IA

Elle est autorisée, mais : 1) on le mentionne dans le commit ; 2) **tu dois pouvoir expliquer et refaire ton code seul**, car le prof peut demander un recodage en direct. Ne garde jamais du code que tu ne comprends pas.

## Qui contacter

- Organisation, planning, accès GitHub : **Yanis**.
- Question technique, problème Git, revue de code : **Aymen** (référent technique).
- Bloqué plus d'une heure sur quelque chose ? Écris sur Discord. Rester bloqué en silence, c'est le vrai problème.

## Petit lexique

| Mot | Sens |
|---|---|
| Branche | Copie de travail du code pour une tâche, sans toucher à `main` |
| Commit | Une sauvegarde du code avec un message qui dit ce qui a changé |
| Pull Request (PR) | Demande pour fusionner sa branche dans `main`, relue par un autre membre |
| Ticket (issue) | La tâche sur GitHub, avec son identifiant |
| FD / DD / FF | Dépendances du Gantt : fin → début, début → début, fin → fin |
