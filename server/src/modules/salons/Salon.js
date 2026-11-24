/**
 * Module : Salons — responsable : Yanis — tâche : SAL-01
 *
 * Un salon : un espace où des participants regardent la même vidéo et discutent
 * (analyse §3.3, classe Salon).
 */
import bcrypt from 'bcryptjs';

export const TYPES_SALON = ['PUBLIC', 'PRIVE', 'PROTEGE'];

export class Salon {
  constructor(code, nom, type, motDePasseHash = null) {
    this.code = code;
    this.nom = nom;
    this.type = type;
    this.motDePasseHash = motDePasseHash; // jamais le mot de passe en clair (NF08)
    this.controleTous = false; // « tout le monde peut contrôler » (F13, module Permissions)
    this.dateCreation = Date.now();
    this.participants = new Map(); // idSocket -> Participant

    // Données des autres modules, remplies par leurs responsables :
    this.videoEtat = null; // module Vidéo (Aymen)
    this.messages = []; // module Chat (Mohammed)
    this.playlist = []; // module Playlist (Yaya)
  }

  async verifierMotDePasse(motDePasse) {
    if (this.type !== 'PROTEGE') return true;
    if (typeof motDePasse !== 'string') return false;
    return bcrypt.compare(motDePasse, this.motDePasseHash);
  }

  // Si le pseudo est déjà pris dans ce salon, on ajoute un suffixe : Yanis, Yanis#2, Yanis#3... (F01)
  resoudrePseudoUnique(pseudo) {
    const pseudosPris = [...this.participants.values()].map((p) => p.pseudo);
    if (!pseudosPris.includes(pseudo)) return pseudo;
    let numero = 2;
    while (pseudosPris.includes(`${pseudo}#${numero}`)) numero++;
    return `${pseudo}#${numero}`;
  }

  // Le premier arrivé devient l'hôte et peut contrôler la vidéo (F02, F11).
  ajouterParticipant(participant) {
    if (this.participants.size === 0) {
      participant.estHote = true;
      participant.peutControler = true;
    }
    this.participants.set(participant.idSocket, participant);
  }

  // Retire un participant et le renvoie (ou null s'il n'était pas là).
  retirerParticipant(idSocket) {
    const participant = this.participants.get(idSocket) || null;
    this.participants.delete(idSocket);
    return participant;
  }

  estVide() {
    return this.participants.size === 0;
  }

  // Liste publique des participants, dans l'ordre d'arrivée (F05).
  listeParticipants() {
    return [...this.participants.values()]
      .sort((a, b) => a.dateArrivee - b.dateArrivee)
      .map((p) => p.versPublic());
  }

  // Résumé du salon, sans le mot de passe (pour la liste des salons publics, F12).
  versPublic() {
    return {
      code: this.code,
      nom: this.nom,
      type: this.type,
      nbParticipants: this.participants.size,
    };
  }

  // État complet envoyé à un participant qui arrive (événement room:state).
  obtenirEtatComplet() {
    return {
      salon: this.versPublic(),
      controleTous: this.controleTous,
      participants: this.listeParticipants(),
      video: this.videoEtat,
      messages: this.messages,
      playlist: this.playlist,
    };
  }
}
