/**
 * Script pour générer le favicon et toutes les icônes PWA à partir du template SVG
 * Nécessite: sharp (npm install sharp)
 * Usage: node scripts/generate-all-icons.mjs
 * 
 * Ce script :
 * 1. Génère src/favicon.svg à partir du template (redimensionné à 100x100)
 * 2. Génère toutes les icônes PNG PWA (72x72 à 512x512)
 * 3. Génère favicon.ico pour compatibilité
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tailles pour les icônes PWA
const pwaSizes = [72, 96, 128, 144, 152, 192, 384, 512];
// Tailles pour le favicon
const faviconSizes = [16, 32, 48, 96];

const templatePath = path.join(__dirname, '../src/assets/icons/icon-template.svg');
const faviconOutputPath = path.join(__dirname, '../src/favicon.svg');
const iconsOutputDir = path.join(__dirname, '../src/assets/icons');
const faviconIcoPath = path.join(__dirname, '../src/assets/icons/favicon.ico');

try {
  // Vérifier si sharp est installé
  const sharp = await import('sharp').catch(() => null);
  
  if (!sharp) {
    console.log('❌ Sharp n\'est pas installé.');
    console.log('📦 Installation: npm install sharp');
    process.exit(1);
  }

  // Vérifier que le template existe
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template introuvable: ${templatePath}`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath);
  
  console.log('🎨 Génération de toutes les icônes à partir du template...\n');
  
  // 1. Générer le favicon.svg à partir du template
  // Pour le favicon SVG, on garde le format vectoriel mais on peut ajuster les dimensions
  console.log('📄 Génération du favicon.svg...');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  
  // Créer une version optimisée pour le favicon (même contenu mais peut être simplifié)
  // On peut soit copier le template tel quel, soit créer une version simplifiée
  // Pour l'instant, on copie le template car il fonctionne bien à toutes les tailles
  const faviconSvgContent = templateContent;
  fs.writeFileSync(faviconOutputPath, faviconSvgContent);
  console.log('✅ Généré: src/favicon.svg (copié depuis le template)');
  
  // 2. Générer toutes les icônes PNG PWA
  console.log('\n📱 Génération des icônes PWA...');
  for (const size of pwaSizes) {
    const outputPath = path.join(iconsOutputDir, `icon-${size}x${size}.png`);
    
    await sharp.default(template)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 102, g: 126, b: 234, alpha: 1 } // #667eea
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Généré: icon-${size}x${size}.png`);
  }
  
  // 3. Générer favicon.ico (multi-taille ICO)
  console.log('\n🔖 Génération du favicon.ico...');
  // Note: sharp ne supporte pas directement les fichiers ICO multi-taille
  // On va créer le plus grand (96x96) comme PNG pour conversion manuelle en .ico
  await sharp.default(template)
    .resize(96, 96, {
      fit: 'contain',
      background: { r: 102, g: 126, b: 234, alpha: 1 }
    })
    .png()
    .toFile(faviconIcoPath.replace('.ico', '-96x96.png'));
  
  console.log('✅ Généré: favicon-96x96.png (pour favicon.ico)');
  console.log('💡 Note: Pour un vrai fichier .ico multi-taille, utilisez un outil comme ImageMagick');
  
  console.log('\n✨ Toutes les icônes ont été générées avec succès!');
  console.log('\n📝 Fichiers générés:');
  console.log('   - src/favicon.svg');
  console.log(`   - ${pwaSizes.length} icônes PWA dans src/assets/icons/`);
  console.log('   - favicon-96x96.png (à convertir en .ico si nécessaire)');
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  console.error(error.stack);
  process.exit(1);
}

