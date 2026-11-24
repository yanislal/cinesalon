/**
 * Module : Socle — responsable : Yanis — tâche : SOC-02
 *
 * Petites fonctions de validation, réutilisées par tous les modules.
 * Le serveur ne fait jamais confiance aux données reçues (NF05).
 */

export function estTexte(valeur) {
  return typeof valeur === 'string';
}

// Vrai si la valeur est un texte dont la longueur (sans espaces au début et à la fin) est dans [min, max].
export function longueurEntre(valeur, min, max) {
  if (!estTexte(valeur)) return false;
  const longueur = valeur.trim().length;
  return longueur >= min && longueur <= max;
}

// Vrai si les données reçues sont un objet (et pas null, un nombre, un tableau...).
export function estObjet(valeur) {
  return typeof valeur === 'object' && valeur !== null && !Array.isArray(valeur);
}
