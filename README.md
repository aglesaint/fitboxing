# Fitboxing - Application d'entraînement 🥊

Application web Angular pour s'entraîner au fitboxing avec des séquences de coups rythmées.

## 🚀 Déploiement sur GitHub Pages

L'application est configurée pour être déployée automatiquement sur GitHub Pages.

### Configuration initiale

1. **Créer un dépôt GitHub** (si ce n'est pas déjà fait)

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/aglesaint/fitboxing.git
   git branch -M main
   git push -u origin main
   ```

2. **Activer GitHub Pages dans les paramètres du dépôt**

   - Allez dans **Settings** > **Pages**
   - Sous **Source**, sélectionnez **GitHub Actions**
   - Le workflow se déclenchera automatiquement à chaque push sur `main`

3. **Mettre à jour le baseHref dans `angular.json`**
   - Remplacez `/fitboxing/` par `/{VOTRE_NOM_DE_DEPOT}/` dans la configuration `github-pages`
   - Ou utilisez `/` si le dépôt est à la racine de votre profil GitHub

### Déploiement automatique

Le déploiement se fait automatiquement via GitHub Actions à chaque push sur la branche `main`.

### Déploiement manuel

```bash
npm run deploy
```

## 💻 Développement local

### Installation

```bash
npm install
```

### Démarrage

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200`

### Build pour production

```bash
npm run build
```

## 📁 Structure

- `src/app/models/` - Modèles TypeScript pour les données
- `src/app/services/` - Services Angular (RoundsService)
- `src/app/app.component.*` - Composant principal
- `src/assets/rounds.json` - Données des rounds

## ✨ Fonctionnalités

- Affichage des rounds avec leurs séquences de coups
- Visualisation du timing (1 temps = +, 2 temps = ++)
- Interface moderne et responsive
- Titre global et titres par round
- Favicon personnalisé avec gant de boxe

## 🔧 Technologies

- Angular 18
- TypeScript
- RxJS
- CSS Grid & Flexbox
