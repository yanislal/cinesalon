/**
 * Module : Socle — responsable : Yanis — tâche : SOC-01
 *
 * Crée le serveur Express + Socket.IO et branche les événements de chaque module.
 * Séparé de index.js pour que les tests puissent lancer un serveur à la demande.
 */
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { GestionnaireSalons } from './modules/salons/GestionnaireSalons.js';
import { brancherEvenementsSalons } from './modules/salons/evenementsSalons.js';

export function creerServeur() {
  const app = express();
  const serveurHttp = createServer(app);
  const io = new Server(serveurHttp);
  const gestionnaire = new GestionnaireSalons();

  // Petite route pour vérifier que le serveur répond.
  app.get('/api/sante', (req, res) => res.json({ ok: true }));

  io.on('connection', (socket) => {
    brancherEvenementsSalons(io, socket, gestionnaire);
    // Les autres modules se branchent ici, chacun dans son propre fichier :
    // brancherEvenementsVideo(io, socket, gestionnaire);   -> Aymen (VID-01)
    // brancherEvenementsChat(io, socket, gestionnaire);    -> Mohammed (CHA-01)
  });

  return { app, serveurHttp, io, gestionnaire };
}
