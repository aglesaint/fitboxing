# Guide de modification des icônes et favicon

Ce guide explique comment modifier le favicon et mettre à jour toutes les icônes du projet.

## 📋 Structure des fichiers

- **`src/assets/icons/icon-template.svg`** : Template source pour toutes les icônes
- **`src/favicon.svg`** : Favicon SVG utilisé par le navigateur
- **`src/assets/icons/icon-*.png`** : Icônes PWA générées (72x72 à 512x512)

## 🎨 Modifier le favicon et les icônes

### Étape 1 : Modifier le template

Éditez le fichier **`src/assets/icons/icon-template.svg`** avec votre éditeur SVG préféré :
- Inkscape (gratuit)
- Adobe Illustrator
- Figma
- VS Code avec extension SVG

### Étape 2 : Régénérer toutes les icônes

Une fois le template modifié, exécutez :

```bash
npm run generate-all-icons
```

Ce script va :
1. ✅ Copier le template vers `src/favicon.svg`
2. ✅ Générer toutes les icônes PNG PWA (8 tailles)
3. ✅ Créer les fichiers nécessaires pour la compatibilité

### Étape 3 : Vérifier les résultats

Après la génération, vérifiez que :
- `src/favicon.svg` a été mis à jour
- Les fichiers `icon-*.png` dans `src/assets/icons/` ont été régénérés
- Les icônes s'affichent correctement dans l'application

## 🔧 Commandes disponibles

```bash
# Générer uniquement les icônes PWA (sans le favicon)
npm run generate-icons

# Générer le favicon ET toutes les icônes PWA
npm run generate-all-icons
```

## 📝 Notes importantes

1. **Format du template** : Le template doit être un SVG valide avec un `viewBox="0 0 512 512"`
2. **Couleur de fond** : Les icônes PNG sont générées avec un fond `#667eea` (violet)
3. **Tailles générées** : 72, 96, 128, 144, 152, 192, 384, 512 pixels
4. **Favicon SVG** : Le favicon.svg est une copie du template (format vectoriel conservé)

## 🐛 Dépannage

### Le script ne fonctionne pas

1. Vérifiez que `sharp` est installé :
   ```bash
   npm install sharp
   ```

2. Vérifiez que le template existe :
   ```bash
   ls src/assets/icons/icon-template.svg
   ```

### Les icônes ne s'affichent pas

1. Videz le cache du navigateur (Ctrl+F5)
2. Vérifiez que les fichiers PNG ont bien été générés dans `src/assets/icons/`
3. Vérifiez le manifest (`src/manifest.webmanifest`) pour les chemins

### Besoin d'un fichier .ico

Pour créer un vrai fichier `.ico` multi-taille, utilisez :
- **ImageMagick** : `magick convert icon-96x96.png favicon.ico`
- **En ligne** : https://realfavicongenerator.net/

## 💡 Astuces

- **Design** : Gardez le design simple et reconnaissable à petite taille
- **Couleurs** : Utilisez des couleurs contrastées pour une meilleure visibilité
- **Test** : Testez toujours les icônes à différentes tailles avant de déployer

