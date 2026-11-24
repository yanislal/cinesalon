/**
 * Module : Vidéo — responsable : Aymen — tâches : VID-01, VID-02
 *
 * EMPLACEMENT RÉSERVÉ : ce composant est à écrire par Aymen.
 * Il reçoit déjà :
 *   - etat : l'état complet du salon (etat.video contiendra l'état de la vidéo)
 *   - moi  : le participant courant ({ id, pseudo, estHote, peutControler })
 * Voir server/src/modules/video/LISEZMOI.md pour ce qu'il reste à faire.
 */
export default function Lecteur({ moi }) {
  return (
    <div className="carte emplacement">
      <h2>Lecteur YouTube</h2>
      <p>Module Vidéo, à venir (Aymen).</p>
      {moi && !moi.peutControler && <p>Seul l'hôte peut contrôler la vidéo.</p>}
    </div>
  );
}
