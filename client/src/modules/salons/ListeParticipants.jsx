/**
 * Module : Salons — responsable : Yanis — tâche : SAL-03
 * Liste des participants en temps réel, hôte signalé (F05).
 */
export default function ListeParticipants({ participants, monId }) {
  return (
    <div className="carte">
      <h2>Participants ({participants.length})</h2>
      <ul className="liste-participants">
        {participants.map((p) => (
          <li key={p.id}>
            {p.pseudo}
            {p.estHote && <span className="badge">hôte</span>}
            {p.id === monId && <span className="moi"> (vous)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
