/**
 * Module : Salons — responsable : Yanis — tâche : SAL-02
 *
 * Événements Socket.IO des salons (conception §5.2) :
 *   room:create, room:join, room:leave  (navigateur -> serveur)
 *   room:state, room:users              (serveur -> navigateur)
 */
import { CODES_ERREUR, succes, echec, fonctionDeReponse } from '../../commun/reponses.js';
import { estObjet, longueurEntre } from '../../commun/validation.js';
import { elireNouvelHoteSiBesoin } from '../permissions/permissions.js';
import { Participant } from './Participant.js';
import { TYPES_SALON } from './Salon.js';

export function brancherEvenementsSalons(io, socket, gestionnaire) {
  // Le code du salon où se trouve ce navigateur (un seul salon à la fois).
  socket.data.codeSalon = null;

  // Fait entrer ce navigateur dans le salon, puis prévient tout le monde.
  function entrerDansSalon(salon, pseudo, repondre) {
    const participant = new Participant(socket.id, salon.resoudrePseudoUnique(pseudo.trim()));
    salon.ajouterParticipant(participant);
    socket.join(salon.code); // groupe Socket.IO : les messages du salon n'iront qu'à ses membres
    socket.data.codeSalon = salon.code;

    const etat = salon.obtenirEtatComplet();
    repondre(succes({ code: salon.code, monId: socket.id, etat }));
    socket.emit('room:state', etat);
    io.to(salon.code).emit('room:users', salon.listeParticipants());
  }

  // Fait sortir ce navigateur de son salon (départ volontaire ou fermeture de l'onglet).
  function quitterSalon() {
    const salon = gestionnaire.obtenirSalon(socket.data.codeSalon);
    socket.data.codeSalon = null;
    if (!salon) return;

    salon.retirerParticipant(socket.id);
    socket.leave(salon.code);

    if (gestionnaire.supprimerSiVide(salon)) return; // dernier parti : salon supprimé (F04)

    elireNouvelHoteSiBesoin(salon); // si c'était l'hôte, un autre le devient (F14)
    io.to(salon.code).emit('room:users', salon.listeParticipants());
  }

  socket.on('room:create', async (donnees, callback) => {
    const repondre = fonctionDeReponse(callback);
    try {
      if (!estObjet(donnees)) return repondre(echec(CODES_ERREUR.INVALID_PAYLOAD));
      const { pseudo, nom, type, motDePasse } = donnees;

      if (!longueurEntre(pseudo, 2, 20)) {
        return repondre(echec(CODES_ERREUR.INVALID_PAYLOAD, 'Le pseudo doit faire de 2 à 20 caractères'));
      }
      if (!longueurEntre(nom, 3, 40)) {
        return repondre(echec(CODES_ERREUR.INVALID_PAYLOAD, 'Le nom du salon doit faire de 3 à 40 caractères'));
      }
      if (!TYPES_SALON.includes(type)) {
        return repondre(echec(CODES_ERREUR.INVALID_PAYLOAD, 'Type de salon inconnu'));
      }
      if (type === 'PROTEGE' && !longueurEntre(motDePasse, 4, 50)) {
        return repondre(echec(CODES_ERREUR.INVALID_PAYLOAD, 'Le mot de passe doit faire de 4 à 50 caractères'));
      }

      quitterSalon(); // un navigateur n'est que dans un seul salon à la fois
      const salon = await gestionnaire.creerSalon(nom.trim(), type, motDePasse);
      entrerDansSalon(salon, pseudo, repondre);
    } catch (erreur) {
      console.error('room:create', erreur);
      repondre(echec(CODES_ERREUR.INVALID_PAYLOAD));
    }
  });

  socket.on('room:join', async (donnees, callback) => {
    const repondre = fonctionDeReponse(callback);
    try {
      if (!estObjet(donnees)) return repondre(echec(CODES_ERREUR.INVALID_PAYLOAD));
      const { code, pseudo, motDePasse } = donnees;

      if (!longueurEntre(pseudo, 2, 20)) {
        return repondre(echec(CODES_ERREUR.INVALID_PAYLOAD, 'Le pseudo doit faire de 2 à 20 caractères'));
      }
      const salon = gestionnaire.obtenirSalon(code);
      if (!salon) return repondre(echec(CODES_ERREUR.ROOM_NOT_FOUND));
      if (!(await salon.verifierMotDePasse(motDePasse))) {
        return repondre(echec(CODES_ERREUR.WRONG_PASSWORD));
      }

      if (socket.data.codeSalon === salon.code) {
        // Déjà dans ce salon : on renvoie simplement l'état.
        return repondre(succes({ code: salon.code, monId: socket.id, etat: salon.obtenirEtatComplet() }));
      }
      quitterSalon();
      entrerDansSalon(salon, pseudo, repondre);
    } catch (erreur) {
      console.error('room:join', erreur);
      repondre(echec(CODES_ERREUR.INVALID_PAYLOAD));
    }
  });

  socket.on('room:leave', (donnees, callback) => {
    quitterSalon();
    fonctionDeReponse(callback)(succes());
  });

  // Fermeture de l'onglet ou perte de connexion.
  // Le délai de grâce pour la reconnexion (NF04) sera ajouté par Aymen (VID-04).
  socket.on('disconnect', () => quitterSalon());
}
