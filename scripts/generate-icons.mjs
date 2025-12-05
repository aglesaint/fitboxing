/**
 * Script pour générer les icônes PWA à partir du template SVG
 * Nécessite: sharp (npm install sharp)
 * Usage: node scripts/generate-icons.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const templatePath = path.join(__dirname, '../src/assets/icons/icon-template.svg');
const outputDir = path.join(__dirname, '../src/assets/icons');

try {
  // Vérifier si sharp est installé
  const sharp = await import('sharp').catch(() => null);
  
  if (!sharp) {
    console.log('❌ Sharp n\'est pas installé.');
    console.log('📦 Installation: npm install sharp');
    console.log('');
    console.log('💡 Alternative: Utilisez https://realfavicongenerator.net/');
    console.log('   1. Uploadez src/assets/icons/icon-template.svg');
    console.log('   2. Téléchargez et extrayez les PNG dans src/assets/icons/');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath);
  
  console.log('🎨 Génération des icônes PWA...\n');
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    
    await sharp.default(template)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 } // #000000 (noir)
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Généré: icon-${size}x${size}.png`);
  }
  
  console.log('\n✨ Toutes les icônes ont été générées avec succès!');
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  console.log('\n💡 Solution alternative:');
  console.log('   1. Allez sur https://realfavicongenerator.net/');
  console.log('   2. Uploadez src/assets/icons/icon-template.svg');
  console.log('   3. Téléchargez et extrayez les PNG dans src/assets/icons/');
  process.exit(1);
}

