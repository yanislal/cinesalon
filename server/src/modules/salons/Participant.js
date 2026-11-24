/**
 * Module : Salons — responsable : Yanis — tâche : SAL-01
 *
 * Une personne présente dans un salon (analyse §3.3, classe Participant).
 * Elle est identifiée par l'identifiant de sa connexion Socket.IO, jamais par son pseudo.
 */
export class Participant {
  constructor(idSocket, pseudo) {
    this.idSocket = idSocket;
    this.pseudo = pseudo;
    this.estHote = false;
    this.peutControler = false; // droit de contrôler la vidéo, donné par l'hôte (F13)
    this.dateArrivee = Date.now(); // sert à choisir le prochain hôte (F14)
    this.horodatagesMessages = []; // utilisé par le module Chat pour l'anti-spam
  }

  // Ce que les autres navigateurs ont le droit de voir sur ce participant.
  versPublic() {
    return {
      id: this.idSocket,
      pseudo: this.pseudo,
      estHote: this.estHote,
      peutControler: this.peutControler,
    };
  }
}
