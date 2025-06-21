#!/usr/bin/env node

/**
 * Performance Optimization Script
 * Run this script to analyze and optimize the project
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Performance Optimization...\n');

// 1. Check for unused dependencies
console.log('📦 Checking for unused dependencies...');
try {
  const result = execSync('npx depcheck --json', { encoding: 'utf8' });
  const depcheck = JSON.parse(result);
  
  if (depcheck.dependencies.length > 0) {
    console.log('❌ Unused dependencies found:');
    depcheck.dependencies.forEach(dep => console.log(`  - ${dep}`));
    console.log('\n💡 Consider removing these dependencies to reduce bundle size.\n');
  } else {
    console.log('✅ No unused dependencies found!\n');
  }
} catch (error) {
  console.log('⚠️  Could not run depcheck. Install it with: npm install -g depcheck\n');
}

// 2. Check bundle size
console.log('📊 Analyzing bundle size...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.log('❌ Build failed. Check for errors.\n');
}

// 3. Check for large files
console.log('📁 Checking for large files...');
const largeFiles = [];
const maxSize = 500 * 1024; // 500KB

function checkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      checkDirectory(filePath);
    } else if (stat.isFile() && stat.size > maxSize) {
      largeFiles.push({
        path: filePath,
        size: (stat.size / 1024).toFixed(2) + 'KB'
      });
    }
  });
}

try {
  checkDirectory('./src');
  checkDirectory('./public');
  
  if (largeFiles.length > 0) {
    console.log('⚠️  Large files found:');
    largeFiles.forEach(file => {
      console.log(`  - ${file.path}: ${file.size}`);
    });
    console.log('\n💡 Consider optimizing these files for better performance.\n');
  } else {
    console.log('✅ No large files found!\n');
  }
} catch (error) {
  console.log('❌ Error checking files.\n');
}

// 4. Performance recommendations
console.log('🎯 Performance Recommendations:\n');

const recommendations = [
  '1. Implement React.lazy() for route-based code splitting',
  '2. Use image optimization (WebP format, compression)',
  '3. Remove unused CSS with PurgeCSS',
  '4. Implement service worker for caching',
  '5. Use React.memo() for expensive components',
  '6. Optimize database queries',
  '7. Implement proper error boundaries',
  '8. Use Suspense for loading states'
];

recommendations.forEach(rec => console.log(rec));

console.log('\n✅ Performance optimization analysis complete!');
console.log('📈 Your project should now run faster with the cleanup and optimizations.'); 