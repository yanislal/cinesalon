/**
 * Module : Salons — responsable : Yanis — tâche : SAL-01
 *
 * Seul point d'accès à la liste des salons en mémoire (conception §2.3).
 * Si on ajoute une base de données au semestre 2 (F21), seule cette classe changera.
 */
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { Salon } from './Salon.js';

const LONGUEUR_CODE = 10; // au moins 8 caractères (NF09)
const TOURS_BCRYPT = 10; // coût du hachage (analyse UC1)

export class GestionnaireSalons {
  constructor() {
    this.salons = new Map(); // code -> Salon
  }

  async creerSalon(nom, type, motDePasse) {
    let motDePasseHash = null;
    if (type === 'PROTEGE') {
      motDePasseHash = await bcrypt.hash(motDePasse, TOURS_BCRYPT);
    }
    const salon = new Salon(this.genererCodeUnique(), nom, type, motDePasseHash);
    this.salons.set(salon.code, salon);
    return salon;
  }

  // Code aléatoire, impossible à deviner, et jamais déjà utilisé.
  genererCodeUnique() {
    let code = nanoid(LONGUEUR_CODE);
    while (this.salons.has(code)) code = nanoid(LONGUEUR_CODE);
    return code;
  }

  obtenirSalon(code) {
    return this.salons.get(code) || null;
  }

  supprimerSalon(code) {
    this.salons.delete(code);
  }

  // Un salon vide est supprimé avec toutes ses données (F04, RGPD). Renvoie true s'il a été supprimé.
  supprimerSiVide(salon) {
    if (!salon.estVide()) return false;
    this.supprimerSalon(salon.code);
    return true;
  }

  listerSalonsPublics() {
    return [...this.salons.values()].filter((s) => s.type === 'PUBLIC').map((s) => s.versPublic());
  }
}
