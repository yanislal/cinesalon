# Module Vidéo — responsable : Aymen

Ce dossier est réservé au module Vidéo (F06 à F09). Ce document explique ce qui existe déjà dans la base commune et ce qu'il reste à écrire.

## Ce qui existe déjà

| Élément | Fichier | Utilité pour toi |
|---|---|---|
| Salons et participants | `server/src/modules/salons/` | `salon.code`, `salon.participants`, `salon.videoEtat` (vaut `null` pour l'instant, c'est à toi de le remplir) |
| Droit de contrôle | `server/src/modules/permissions/permissions.js` | `peutControler(salon, socket.id)` renvoie `true` si l'émetteur peut contrôler la vidéo (F11) |
| Réponses communes | `server/src/commun/reponses.js` | `succes(data)`, `echec(CODES_ERREUR.FORBIDDEN)`, `fonctionDeReponse(callback)` |
| Validation | `server/src/commun/validation.js` | `estObjet(donnees)` |
| Branchement | `server/src/serveur.js` | ligne commentée `brancherEvenementsVideo(...)` à activer |
| Composant React | `client/src/modules/video/Lecteur.jsx` | reçoit `etat` (avec `etat.video`) et `moi` (`{ id, pseudo, estHote, peutControler }`) |
| Connexion | `client/src/socket.js` | `socket.on(...)`, `envoyer('video:pause', { position })` |

Pour savoir dans quel salon est un navigateur : `gestionnaire.obtenirSalon(socket.data.codeSalon)`.

## VID-03 : prototype de l'anti-écho (à faire en premier, sans attendre la base)

Une page HTML seule, en dehors du projet, avec deux lecteurs YouTube (ou deux onglets) qui montre qu'une pause appliquée par le programme n'est **pas** renvoyée. C'est la difficulté n°1 du projet (risque R2). Ton prototype servira de modèle pour VID-02.

## VID-01 : état vidéo côté serveur

À créer dans ce dossier :

1. **`VideoEtat.js`** : `{ videoId, etat: 'PLAY' | 'PAUSE', position, timestampMaj }`, avec la méthode de calcul de la position (conception §7.1) :
   ```
   si etat == PAUSE : position
   sinon : position + max(0, maintenant - timestampMaj) / 1000
   ```
2. **`evenementsVideo.js`** avec `export function brancherEvenementsVideo(io, socket, gestionnaire)` :

| Événement reçu | Données | Ce que fait le serveur |
|---|---|---|
| `video:load` | `{ videoId }` | vérifier `/^[a-zA-Z0-9_-]{11}$/`, puis état PLAY à 0 |
| `video:play` | `{ position? }` | état PLAY à la position de référence |
| `video:pause` | `{ position }` | état PAUSE, position figée |
| `video:seek` | `{ position }` | nouvelle position (nombre ≥ 0) |

Pour chaque événement, dans cet ordre :
- vérifier les données, sinon `echec(INVALID_PAYLOAD)` ;
- vérifier `peutControler(salon, socket.id)`, sinon `echec(FORBIDDEN)` **et** `socket.emit('video:sync', etat)` pour recaler le navigateur fautif ;
- mettre à jour `salon.videoEtat` ;
- diffuser `io.to(salon.code).emit('video:sync', ...)`.

3. **Tests unitaires** du calcul de position dans `server/tests/video.test.js`.

## VID-02 : lecteur côté client

Dans `client/src/modules/video/` :
- charger l'IFrame Player API de YouTube ;
- appliquer les `video:sync` reçus (`loadVideoById`, `playVideo`, `pauseVideo`, `seekTo`) ;
- **anti-écho** : un indicateur (`isRemoteUpdate`) empêche de renvoyer au serveur un changement provoqué par le programme ;
- **recalage** toutes les 5 secondes si l'écart dépasse 1,5 s ;
- champ « URL YouTube » (formats `watch?v=`, `youtu.be/`, `embed/`) et commandes grisées si `!moi.peutControler` (NF14).

## Décision à prendre

Contrôle de la dérive : soit le client compare lui-même toutes les 5 s (conception), soit le serveur envoie un `video:heartbeat` (diagramme DS3 de l'analyse). Note ton choix et ta justification dans le README.

## Règles de travail

- Une branche par tâche : `feat/VID-01-etat-video`, puis une PR relue par un autre membre.
- Commits : `feat(video): calcul de la position de référence [VID-01] [IA : Claude]` (mention de l'IA seulement si tu en utilises une).
- Une ligne dans le journal de bord à chaque session de travail.
- Référence complète : `CLAUDE.md` à la racine de PROJET_IL (sections « Synchronisation vidéo » et « Contrat d'événements »).
