/**
 * Module : Socle — responsable : Yanis — tâche : SOC-01
 * Point d'entrée : lance le serveur sur le port 3001.
 */
import { creerServeur } from './serveur.js';

// Variable dédiée (et pas PORT) pour ne pas entrer en conflit avec le port du client Vite.
const PORT = process.env.PORT_SERVEUR || 3001;
const { serveurHttp } = creerServeur();

serveurHttp.listen(PORT, () => {
  console.log(`Serveur CinéSalon démarré sur http://localhost:${PORT}`);
});
