/**
 * Module : Socle — responsable : Yanis — tâche : SOC-01
 *
 * Crée le serveur Express + Socket.IO et branche les événements de chaque module.
 * Séparé de index.js pour que les tests puissent lancer un serveur à la demande.
 */
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

export function creerServeur() {
  const app = express();
  const serveurHttp = createServer(app);
  const io = new Server(serveurHttp);

  // Petite route pour vérifier que le serveur répond.
  app.get('/api/sante', (req, res) => res.json({ ok: true }));

  io.on('connection', () => {
    // Les modules (salons, vidéo, chat...) se brancheront ici.
  });

  return { app, serveurHttp, io };
}
