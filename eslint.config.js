// Règles de code communes à toute l'équipe (NF19).
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['server/**/*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['client/src/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // Les composants React utilisés seulement dans le JSX ne doivent pas être signalés.
    rules: { 'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z]' }] },
  },
];
