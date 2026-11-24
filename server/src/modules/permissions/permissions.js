/**
 * Module : Permissions — responsable : Yaya — version initiale : Yanis (reconstruction du 24/11) — tâche : PER-01
 *
 * Qui a le droit de contrôler la vidéo, et qui devient hôte quand l'hôte part.
 * Ces règles sont toujours vérifiées par le serveur (NF07).
 * À compléter par Yaya en phase 2 : délégation (PER-02) et transfert manuel d'hôte (PER-03).
 */

// Droit de contrôle = hôte, ou droit donné par l'hôte, ou « tout le monde peut contrôler » (F11, F13).
export function peutControler(salon, idSocket) {
  const participant = salon.participants.get(idSocket);
  if (!participant) return false;
  return participant.estHote || participant.peutControler || salon.controleTous;
}

/**
 * Si le salon n'a plus d'hôte, le participant présent depuis le plus longtemps le devient (F14).
 * Renvoie le nouvel hôte, ou null si rien n'a changé.
 */
export function elireNouvelHoteSiBesoin(salon) {
  const participants = [...salon.participants.values()];
  if (participants.length === 0) return null;
  if (participants.some((p) => p.estHote)) return null;

  let plusAncien = participants[0];
  for (const p of participants) {
    if (p.dateArrivee < plusAncien.dateArrivee) plusAncien = p;
  }
  plusAncien.estHote = true;
  plusAncien.peutControler = true;
  return plusAncien;
}
