/**
 * Module : Socle — responsable : Yanis — tâche : SOC-02
 *
 * Format commun des réponses du serveur (rapport de conception §5.1 et §5.5).
 * Chaque commande envoyée par le navigateur reçoit un « accusé de réception » (ack) :
 *   - succès : { ok: true, data: ... }
 *   - échec  : { ok: false, error: { code, message } }
 */

// Codes d'erreur stables, utilisés par toute l'équipe (conception §5.5).
export const CODES_ERREUR = {
  INVALID_PAYLOAD: 'INVALID_PAYLOAD',
  ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  FORBIDDEN: 'FORBIDDEN',
  RATE_LIMITED: 'RATE_LIMITED',
  VIDEO_UNAVAILABLE: 'VIDEO_UNAVAILABLE',
};

// Message affiché par défaut pour chaque code (interface en français, NF13).
const MESSAGES = {
  INVALID_PAYLOAD: 'Données invalides',
  ROOM_NOT_FOUND: "Ce salon n'existe plus",
  WRONG_PASSWORD: 'Mot de passe incorrect',
  FORBIDDEN: 'Action non autorisée',
  RATE_LIMITED: 'Envoi trop rapide, veuillez patienter',
  VIDEO_UNAVAILABLE: 'Cette vidéo ne peut pas être lue en dehors de YouTube',
};

export function succes(data = null) {
  return { ok: true, data };
}

export function echec(code, message) {
  return { ok: false, error: { code, message: message || MESSAGES[code] } };
}

/**
 * Le navigateur n'envoie pas toujours de fonction de réponse.
 * On renvoie donc toujours une fonction, quitte à ce qu'elle ne fasse rien.
 */
export function fonctionDeReponse(callback) {
  return typeof callback === 'function' ? callback : () => {};
}
