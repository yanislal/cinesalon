/**
 * Module : Salons — responsable : Yanis — tâche : SAL-01
 * Tests unitaires des classes Salon, Participant et GestionnaireSalons.
 * Lancer avec : npm test
 */
import { describe, it, expect } from 'vitest';
import { GestionnaireSalons } from '../src/modules/salons/GestionnaireSalons.js';
import { Participant } from '../src/modules/salons/Participant.js';

describe('GestionnaireSalons', () => {
  it('crée un salon avec un code aléatoire d’au moins 8 caractères (NF09)', async () => {
    const gestionnaire = new GestionnaireSalons();
    const salon = await gestionnaire.creerSalon('Ciné du soir', 'PUBLIC');
    expect(salon.code.length).toBeGreaterThanOrEqual(8);
    expect(gestionnaire.obtenirSalon(salon.code)).toBe(salon);
  });

  it('ne garde jamais le mot de passe en clair (NF08)', async () => {
    const gestionnaire = new GestionnaireSalons();
    const salon = await gestionnaire.creerSalon('Salon secret', 'PROTEGE', 'motdepasse');
    expect(salon.motDePasseHash).not.toBe('motdepasse');
    expect(await salon.verifierMotDePasse('motdepasse')).toBe(true);
    expect(await salon.verifierMotDePasse('mauvais')).toBe(false);
  });

  it('ne liste que les salons publics (F12)', async () => {
    const gestionnaire = new GestionnaireSalons();
    await gestionnaire.creerSalon('Public', 'PUBLIC');
    await gestionnaire.creerSalon('Privé', 'PRIVE');
    const liste = gestionnaire.listerSalonsPublics();
    expect(liste).toHaveLength(1);
    expect(liste[0].nom).toBe('Public');
  });

  it('supprime un salon devenu vide (F04)', async () => {
    const gestionnaire = new GestionnaireSalons();
    const salon = await gestionnaire.creerSalon('Éphémère', 'PRIVE');
    salon.ajouterParticipant(new Participant('s1', 'Yanis'));
    salon.retirerParticipant('s1');
    expect(gestionnaire.supprimerSiVide(salon)).toBe(true);
    expect(gestionnaire.obtenirSalon(salon.code)).toBeNull();
  });
});

describe('Salon', () => {
  it('fait du premier arrivé l’hôte (F02)', async () => {
    const salon = await new GestionnaireSalons().creerSalon('Test', 'PUBLIC');
    const premier = new Participant('s1', 'Yanis');
    const second = new Participant('s2', 'Yaya');
    salon.ajouterParticipant(premier);
    salon.ajouterParticipant(second);
    expect(premier.estHote).toBe(true);
    expect(second.estHote).toBe(false);
  });

  it('ajoute un suffixe si le pseudo est déjà pris (F01)', async () => {
    const salon = await new GestionnaireSalons().creerSalon('Test', 'PUBLIC');
    salon.ajouterParticipant(new Participant('s1', 'Yanis'));
    expect(salon.resoudrePseudoUnique('Yanis')).toBe('Yanis#2');
    salon.ajouterParticipant(new Participant('s2', 'Yanis#2'));
    expect(salon.resoudrePseudoUnique('Yanis')).toBe('Yanis#3');
    expect(salon.resoudrePseudoUnique('Aymen')).toBe('Aymen');
  });

  it('ne diffuse jamais le mot de passe dans l’état complet (NF08)', async () => {
    const salon = await new GestionnaireSalons().creerSalon('Secret', 'PROTEGE', 'motdepasse');
    expect(JSON.stringify(salon.obtenirEtatComplet())).not.toContain(salon.motDePasseHash);
  });
});
