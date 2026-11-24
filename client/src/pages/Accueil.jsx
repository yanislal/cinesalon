/**
 * Module : Salons — responsable : Yanis — tâche : SAL-03
 * Page d'accueil : créer un salon ou en rejoindre un (UC1, UC2, maquettes B1 et B2).
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { envoyer } from '../socket.js';

// Accepte un code (« 8kdfQJ3sAb ») ou un lien complet (« http://.../room/8kdfQJ3sAb »).
function extraireCode(texte) {
  const morceaux = texte.trim().split('/room/');
  return morceaux[morceaux.length - 1].split(/[/?#]/)[0];
}

export default function Accueil() {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState('');
  const [nom, setNom] = useState('');
  const [type, setType] = useState('PUBLIC');
  const [motDePasse, setMotDePasse] = useState('');
  const [codeARejoindre, setCodeARejoindre] = useState('');
  const [erreur, setErreur] = useState('');

  // Validation côté navigateur : le bouton reste désactivé tant que le formulaire est invalide.
  // Le serveur revérifie tout de son côté (NF05).
  const formulaireValide =
    pseudo.trim().length >= 2 &&
    pseudo.trim().length <= 20 &&
    nom.trim().length >= 3 &&
    nom.trim().length <= 40 &&
    (type !== 'PROTEGE' || (motDePasse.length >= 4 && motDePasse.length <= 50));

  async function creerSalon(evenement) {
    evenement.preventDefault();
    setErreur('');
    const reponse = await envoyer('room:create', { pseudo, nom, type, motDePasse });
    if (!reponse.ok) return setErreur(reponse.error.message);
    // On passe l'état du salon à la page Salon pour qu'elle s'affiche tout de suite.
    navigate(`/room/${reponse.data.code}`, {
      state: { etat: reponse.data.etat, monId: reponse.data.monId },
    });
  }

  function rejoindreSalon(evenement) {
    evenement.preventDefault();
    const code = extraireCode(codeARejoindre);
    if (code) navigate(`/room/${code}`);
  }

  return (
    <main className="page">
      <h1>CinéSalon</h1>
      <p className="sous-titre">Regardez YouTube ensemble, même à distance.</p>

      <div className="colonnes">
        <form className="carte" onSubmit={creerSalon}>
          <h2>Créer un salon</h2>
          <label>
            Pseudo (2 à 20 caractères)
            <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} maxLength={20} />
          </label>
          <label>
            Nom du salon (3 à 40 caractères)
            <input value={nom} onChange={(e) => setNom(e.target.value)} maxLength={40} />
          </label>
          <fieldset>
            <legend>Type de salon</legend>
            {[
              ['PUBLIC', 'Public'],
              ['PRIVE', 'Privé'],
              ['PROTEGE', 'Protégé'],
            ].map(([valeur, libelle]) => (
              <label key={valeur} className="choix">
                <input
                  type="radio"
                  name="type"
                  value={valeur}
                  checked={type === valeur}
                  onChange={() => setType(valeur)}
                />
                {libelle}
              </label>
            ))}
          </fieldset>
          {type === 'PROTEGE' && (
            <label>
              Mot de passe (4 caractères minimum)
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                maxLength={50}
              />
            </label>
          )}
          {erreur && <p className="erreur">{erreur}</p>}
          <button type="submit" disabled={!formulaireValide}>
            Créer le salon
          </button>
        </form>

        <form className="carte" onSubmit={rejoindreSalon}>
          <h2>Rejoindre un salon</h2>
          <label>
            Code ou lien du salon
            <input
              value={codeARejoindre}
              onChange={(e) => setCodeARejoindre(e.target.value)}
              placeholder="Ex. /room/8kdfQJ3sAb"
            />
          </label>
          <button type="submit" disabled={!codeARejoindre.trim()}>
            Rejoindre
          </button>
        </form>
      </div>
    </main>
  );
}
