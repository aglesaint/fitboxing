# Configuration PWA - Fitboxing

## ✅ Configuration complète

Votre application Angular est maintenant configurée comme une Progressive Web App (PWA) complète !

## 📋 Ce qui a été configuré

### 1. Manifest (`src/manifest.webmanifest`)
- ✅ Nom et description de l'application
- ✅ Thème et couleurs de fond
- ✅ Mode d'affichage standalone
- ✅ Orientation portrait
- ✅ Configuration des icônes (8 tailles)

### 2. Service Worker
- ✅ Configuré dans `main.ts`
- ✅ Activé en production uniquement
- ✅ Configuration dans `ngsw-config.json`
- ✅ Cache des assets et fichiers statiques

### 3. Meta Tags (`src/index.html`)
- ✅ Theme color (#667eea)
- ✅ Support iOS (apple-mobile-web-app)
- ✅ Référence au manifest

### 4. Icônes
- ✅ Template SVG créé (`src/assets/icons/icon-template.svg`)
- ⚠️ **À générer** : Les fichiers PNG (voir instructions ci-dessous)

## 🎨 Génération des icônes

**IMPORTANT** : Vous devez générer les fichiers PNG à partir du template SVG.

### Option rapide (Recommandée)

1. Allez sur https://realfavicongenerator.net/
2. Uploadez `src/assets/icons/icon-template.svg`
3. Configurez et téléchargez le package
4. Extrayez les PNG dans `src/assets/icons/`

### Option manuelle

Consultez `ICONS_README.md` pour les instructions détaillées.

## 🚀 Test de la PWA

### En développement local

```bash
npm run build
npm install -g http-server
cd dist/fitboxing/browser
http-server -p 8080
```

Puis ouvrez http://localhost:8080 dans Chrome et :
1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet "Application" > "Service Workers"
3. Vérifiez que le service worker est actif
4. Testez "Add to Home Screen"

### Sur GitHub Pages

Après déploiement, votre PWA sera disponible et installable !

## 📱 Installation

Les utilisateurs pourront installer votre application sur :
- **Android** : Via le menu Chrome > "Ajouter à l'écran d'accueil"
- **iOS** : Via Safari > Partager > "Sur l'écran d'accueil"
- **Desktop** : Via l'icône dans la barre d'adresse Chrome

## 🔍 Vérification

Utilisez ces outils pour vérifier votre PWA :
- https://www.pwabuilder.com/
- Lighthouse (Chrome DevTools)

## 📝 Notes

- Le service worker est **désactivé en développement** (`ng serve`)
- Il est **activé automatiquement en production** (`ng build`)
- Les icônes doivent être générées avant le déploiement final

