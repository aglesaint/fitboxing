# Guide du système de thème

Ce projet utilise SCSS avec un système de variables centralisées pour gérer les couleurs et le thème.

## 📁 Structure

- **`src/styles/_theme.scss`** : Fichier de variables de thème (couleurs, espacements, etc.)
- **`src/styles.scss`** : Fichier principal de styles globaux
- **`src/app/app.component.scss`** : Styles du composant principal utilisant les variables

## 🎨 Variables de couleurs disponibles

### Couleurs principales

```scss
$color-primary: #000000; // Noir principal (fond de page)
$color-secondary: #1a1a1a; // Noir secondaire (cartes, éléments)
$color-tertiary: #2a2a2a; // Gris foncé (éléments secondaires)
$color-border: #333333; // Bordure grise
```

### Couleurs d'accentuation

```scss
$color-accent-primary: #ffd700; // Jaune principal (or)
$color-accent-secondary: #ffa500; // Orange/Jaune secondaire
$color-accent-dark: #ffd700; // Jaune (variante)
```

### Couleurs de texte

```scss
$color-text-primary: #ffffff; // Blanc (texte principal)
$color-text-secondary: rgba(255, 255, 255, 0.9); // Blanc avec opacité
```

### Couleurs d'ombres

```scss
$shadow-color-primary: rgba(0, 0, 0, 0.5);
$shadow-color-accent: rgba(255, 215, 0, 0.1);
$shadow-color-accent-hover: rgba(255, 215, 0, 0.2);
$shadow-color-accent-indicator: rgba(255, 215, 0, 0.3);
```

## 🔧 Utilisation dans vos composants

Pour utiliser les variables de thème dans un nouveau composant :

```scss
@import "../styles/theme";

.mon-composant {
  background: $color-secondary;
  color: $color-text-primary;
  border: 1px solid $color-border;

  &:hover {
    border-color: $color-accent-primary;
  }
}
```

## 🎨 Modifier le thème

Pour changer les couleurs du thème, modifiez simplement les variables dans **`src/styles/_theme.scss`** :

```scss
// Exemple : changer le jaune en bleu
$color-accent-primary: #0066ff;
$color-accent-secondary: #0044cc;
```

Toutes les références à ces variables seront automatiquement mises à jour dans toute l'application.

## 📝 Variables supplémentaires

### Tailles et espacements

```scss
$max-width-container: 1200px;
$border-radius-card: 12px;
$border-radius-item: 6px;
$gap-container: 20px;
$gap-sequence: 8px;
```

### Transitions

```scss
$transition-fast: 0.2s;
$transition-normal: 0.3s;
```

### Z-index

```scss
$z-index-indicator: 1000;
```

## 💡 Avantages

- ✅ **Centralisation** : Toutes les couleurs au même endroit
- ✅ **Maintenabilité** : Facile de changer le thème globalement
- ✅ **Cohérence** : Garantit l'utilisation des mêmes couleurs partout
- ✅ **Réutilisabilité** : Variables disponibles dans tous les composants

## 🔄 Migration depuis CSS

Si vous avez des fichiers CSS existants, convertissez-les en SCSS et importez le thème :

1. Renommez `.css` en `.scss`
2. Ajoutez `@import '../styles/theme';` en haut du fichier
3. Remplacez les valeurs hexadécimales par les variables correspondantes
