# CinéSalon

Regarder des vidéos YouTube ensemble, synchronisées, avec un chat. Projet IL 2026/2027, semestre 1.

Équipe : Yanis Lalouani (chef de projet), Mohammed Aymen Bechki, Mohammed El Allati, Yaya Diallo.

> README provisoire. La version complète (installation détaillée, tests, choix techniques) est la tâche DOC-01.

**Nouveau dans l'équipe ou perdu ?** Commence par [docs/feuilles-de-route/](docs/feuilles-de-route/LISEZMOI.md) : ce que chacun doit faire, dans quel ordre, et comment travailler avec Git.

## Lancer le projet

Prérequis : Node.js 20 ou plus récent.

```bash
npm run installer   # installe les dépendances (racine, serveur, client)
npm run dev         # lance le serveur (port 3001) et le client (http://localhost:5173)
npm test            # lance les tests du serveur
```

## Organisation du code

Le code est découpé **par module**. Chaque module a un responsable, indiqué en tête de chaque fichier et dans `.github/CODEOWNERS`.

| Module | Responsable | Serveur | Client |
|---|---|---|---|
| Socle | Yanis | `server/src/serveur.js`, `server/src/commun/` | `client/src/main.jsx`, `client/src/socket.js` |
| Salons | Yanis | `server/src/modules/salons/` | `client/src/pages/`, `client/src/modules/salons/` |
| Vidéo | Aymen | `server/src/modules/video/` | `client/src/modules/video/` |
| Chat et interface | Mohammed | `server/src/modules/chat/` | `client/src/modules/chat/`, `client/src/styles.css` |
| Permissions et playlist | Yaya | `server/src/modules/permissions/`, `server/src/modules/playlist/` | `client/src/modules/permissions/`, `client/src/modules/playlist/` |

La première version de la base a été écrite par Yanis le 24/11/2026 (reconstruction décidée en équipe et validée par l'enseignant). Chaque responsable reprend ensuite son module.

## Règles de travail

- Une branche par tâche du Gantt v2 (ex. `feat/VID-01-etat-video`), fusionnée dans `main` après relecture par un autre membre.
- Messages de commit : `type(module): description [ID-tâche]`, ex. `feat(salons): pseudo unique dans un salon [SAL-01]`. Ajouter `[IA : nom de l'outil]` si une IA a aidé.
- Chaque session de travail est notée dans le journal de bord partagé.
