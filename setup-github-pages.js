#!/usr/bin/env node

/**
 * GitHub Pages Setup Script
 *
 * This script helps configure the project for GitHub Pages deployment
 * by updating the homepage URL with your GitHub username.
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const viteConfigPath = path.join(__dirname, 'vite.config.ts');

// Get GitHub username from command line arguments
const username = process.argv[2] || 'QS3H';

if (process.argv[2] === undefined) {
  console.log('ℹ️  No username provided, using default: QS3H');
  console.log('   To use a different username: node setup-github-pages.js yourusername');
  console.log('');
}

// Read and update package.json
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.homepage = `https://${username}.github.io/frontend-quiz-app`;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json homepage URL');
} catch (error) {
  console.error('❌ Error updating package.json:', error.message);
}

// Read and update vite.config.ts
try {
  let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  viteConfig = viteConfig.replace(
    '/frontend-quiz-app/',
    `/${username}/frontend-quiz-app/`
  );

  fs.writeFileSync(viteConfigPath, viteConfig);
  console.log('✅ Updated vite.config.ts base path');
} catch (error) {
  console.error('❌ Error updating vite.config.ts:', error.message);
}

console.log('');
console.log('🎉 Setup complete! Your GitHub username has been configured.');
console.log('');
console.log('Next steps:');
console.log('1. Commit and push your changes to GitHub');
console.log('2. Run: npm run deploy');
console.log('3. Enable GitHub Pages in repository settings');
console.log('');
console.log(`Your app will be live at: https://${username}.github.io/frontend-quiz-app/`);
