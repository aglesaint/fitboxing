# Génération des icônes PWA

## Méthode 1 : Utiliser un outil en ligne (Recommandé)

1. Allez sur https://realfavicongenerator.net/
2. Téléchargez le fichier `src/assets/icons/icon-template.svg`
3. Uploadez-le sur le site
4. Configurez les options :
   - **iOS** : Cocher "iOS 8.0+ (iPhone, iPad)"
   - **Android Chrome** : Cocher "Android Chrome"
   - **Windows Metro** : Optionnel
5. Téléchargez le package généré
6. Extrayez les fichiers PNG dans `src/assets/icons/`
7. Renommez-les selon le format : `icon-{size}x{size}.png`

## Méthode 2 : Utiliser ImageMagick (en ligne de commande)

```bash
# Installer ImageMagick (Windows: chocolatey, Mac: brew, Linux: apt)
# Puis exécuter:

cd src/assets/icons
magick icon-template.svg -resize 72x72 icon-72x72.png
magick icon-template.svg -resize 96x96 icon-96x96.png
magick icon-template.svg -resize 128x128 icon-128x128.png
magick icon-template.svg -resize 144x144 icon-144x144.png
magick icon-template.svg -resize 152x152 icon-152x152.png
magick icon-template.svg -resize 192x192 icon-192x192.png
magick icon-template.svg -resize 384x384 icon-384x384.png
magick icon-template.svg -resize 512x512 icon-512x512.png
```

## Méthode 3 : Utiliser un éditeur graphique

1. Ouvrez `src/assets/icons/icon-template.svg` dans :
   - **Inkscape** (gratuit)
   - **Adobe Illustrator**
   - **Figma**
   - **GIMP** (avec plugin SVG)
2. Exportez en PNG aux tailles suivantes :
   - 72x72px → `icon-72x72.png`
   - 96x96px → `icon-96x96.png`
   - 128x128px → `icon-128x128.png`
   - 144x144px → `icon-144x144.png`
   - 152x152px → `icon-152x152.png`
   - 192x192px → `icon-192x192.png`
   - 384x384px → `icon-384x384.png`
   - 512x512px → `icon-512x512.png`

## Tailles requises

Les icônes suivantes sont nécessaires pour une PWA complète :

- **72x72** : Android (ldpi)
- **96x96** : Android (mdpi)
- **128x128** : Chrome Web Store
- **144x144** : Windows tiles
- **152x152** : iOS (iPad)
- **192x192** : Android (standard, requis)
- **384x384** : Android (high-res)
- **512x512** : Android (splash screen, requis)

## Vérification

Après avoir généré les icônes, vérifiez que tous les fichiers sont présents :

```bash
ls src/assets/icons/icon-*.png
```

Vous devriez voir 8 fichiers PNG.

