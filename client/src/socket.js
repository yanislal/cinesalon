/**
 * Module : Socle — responsable : Yanis — tâche : SOC-02
 *
 * Une seule connexion Socket.IO, partagée par toute l'application.
 */
import { io } from 'socket.io-client';

// Sans adresse : on se connecte au même serveur que la page (le proxy de Vite fait le reste).
export const socket = io();

/**
 * Envoie un événement au serveur et attend sa réponse { ok, data, error }.
 * Exemple : const reponse = await envoyer('room:join', { code, pseudo });
 */
export function envoyer(evenement, donnees) {
  return new Promise((resolve) => {
    socket.emit(evenement, donnees, (reponse) => resolve(reponse));
  });
}
