/**
 * Module : Salons — responsable : Yanis — tâche : SAL-03
 *
 * Page d'un salon (/room/:code).
 *  - Si on n'est pas encore dans le salon : formulaire pseudo (+ mot de passe) et bouton
 *    « Rejoindre le salon » (NF15 : ce clic autorise ensuite la lecture de la vidéo).
 *  - Sinon : le salon, avec la liste des participants, le lecteur (Aymen) et le chat (Mohammed).
 */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { socket, envoyer } from '../socket.js';
import ListeParticipants from '../modules/salons/ListeParticipants.jsx';
import Lecteur from '../modules/video/Lecteur.jsx';
import Chat from '../modules/chat/Chat.jsx';

export default function Salon() {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Si on vient de créer le salon, la page d'accueil nous a déjà donné son état.
  const [etat, setEtat] = useState(location.state?.etat || null);
  const [monId, setMonId] = useState(location.state?.monId || null);
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState(null);

  // Écoute les mises à jour envoyées par le serveur tant que la page est affichée.
  useEffect(() => {
    function recevoirEtat(nouvelEtat) {
      setEtat(nouvelEtat);
    }
    function recevoirParticipants(participants) {
      setEtat((ancien) => (ancien ? { ...ancien, participants } : ancien));
    }
    socket.on('room:state', recevoirEtat);
    socket.on('room:users', recevoirParticipants);
    return () => {
      socket.off('room:state', recevoirEtat);
      socket.off('room:users', recevoirParticipants);
    };
  }, []);

  async function rejoindre(evenement) {
    evenement.preventDefault();
    setErreur(null);
    const reponse = await envoyer('room:join', { code, pseudo, motDePasse });
    if (!reponse.ok) return setErreur(reponse.error);
    setEtat(reponse.data.etat);
    setMonId(reponse.data.monId);
  }

  async function quitter() {
    await envoyer('room:leave');
    navigate('/');
  }

  // ----- Pas encore dans le salon : écran d'entrée -----
  if (!etat) {
    if (erreur?.code === 'ROOM_NOT_FOUND') {
      return (
        <main className="page">
          <p className="erreur">{erreur.message}</p>
          <Link to="/">Retour à l'accueil</Link>
        </main>
      );
    }
    return (
      <main className="page">
        <form className="carte etroite" onSubmit={rejoindre}>
          <h2>Rejoindre le salon {code}</h2>
          <label>
            Pseudo (2 à 20 caractères)
            <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} maxLength={20} />
          </label>
          <label>
            Mot de passe (seulement si le salon est protégé)
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              maxLength={50}
            />
          </label>
          {erreur && <p className="erreur">{erreur.message}</p>}
          <button type="submit" disabled={pseudo.trim().length < 2}>
            Rejoindre le salon
          </button>
        </form>
      </main>
    );
  }

  // ----- Dans le salon -----
  const moi = etat.participants.find((p) => p.id === monId);

  return (
    <main className="page">
      <header className="entete-salon">
        <div>
          <h1>{etat.salon.nom}</h1>
          <p className="code-salon">Code : {etat.salon.code}</p>
        </div>
        <button onClick={quitter}>Quitter le salon</button>
      </header>

      <div className="disposition-salon">
        <section className="zone-video">
          <Lecteur etat={etat} moi={moi} />
        </section>
        <aside className="zone-laterale">
          <ListeParticipants participants={etat.participants} monId={monId} />
          <Chat etat={etat} moi={moi} />
        </aside>
      </div>
    </main>
  );
}
