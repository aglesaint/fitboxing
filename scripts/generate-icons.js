/**
 * Script pour générer les icônes PWA à partir du template SVG
 * Nécessite: sharp (npm install -g sharp-cli ou npm install sharp)
 * 
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Tailles d'icônes requises pour PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('📦 Génération des icônes PWA...');
console.log('');
console.log('⚠️  Ce script nécessite sharp pour convertir SVG en PNG.');
console.log('   Installez-le avec: npm install sharp');
console.log('');
console.log('📝 Instructions manuelles:');
console.log('   1. Ouvrez src/assets/icons/icon-template.svg dans un éditeur');
console.log('   2. Exportez-le en PNG aux tailles suivantes:');
sizes.forEach(size => {
  console.log(`      - icon-${size}x${size}.png (${size}x${size}px)`);
});
console.log('');
console.log('💡 Ou utilisez un outil en ligne comme:');
console.log('   - https://realfavicongenerator.net/');
console.log('   - https://www.pwabuilder.com/imageGenerator');

