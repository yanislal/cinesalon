import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En développement, le client tourne sur le port 5173 et le serveur sur le port 3001.
// Le « proxy » redirige les connexions Socket.IO vers le serveur : le navigateur
// n'a qu'une seule adresse à connaître.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': { target: 'http://localhost:3001', ws: true },
      '/api': 'http://localhost:3001',
    },
  },
});
