#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Read package.json
const packageJsonPath = path.join(rootDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update version if needed
const currentVersion = packageJson.version;
const newVersion = process.argv[2] || currentVersion;

if (newVersion !== currentVersion) {
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`📦 Updated version to ${newVersion}`);
}

// Create dist directory if it doesn't exist
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy source files to dist
const srcDir = path.join(rootDir, 'src');
const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

// Copy src to dist
if (fs.existsSync(srcDir)) {
  copyDir(srcDir, path.join(distDir, 'src'));
  console.log('📁 Copied src/ to dist/src/');
}

// Copy bin to dist
const binDir = path.join(rootDir, 'bin');
if (fs.existsSync(binDir)) {
  copyDir(binDir, path.join(distDir, 'bin'));
  console.log('📁 Copied bin/ to dist/bin/');
}

// Copy examples to dist
const examplesDir = path.join(rootDir, 'examples');
if (fs.existsSync(examplesDir)) {
  copyDir(examplesDir, path.join(distDir, 'examples'));
  console.log('📁 Copied examples/ to dist/examples/');
}

// Copy templates to dist
const templatesDir = path.join(rootDir, 'src/templates');
if (fs.existsSync(templatesDir)) {
  copyDir(templatesDir, path.join(distDir, 'templates'));
  console.log('📁 Copied templates/ to dist/templates/');
}

// Copy essential documentation
const docsToCopy = ['README.md', 'CHANGELOG.md', 'LICENSE.md'];
docsToCopy.forEach(doc => {
  const srcPath = path.join(rootDir, doc);
  const destPath = path.join(distDir, doc);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`📄 Copied ${doc} to dist/`);
  }
});

// Create package.json for dist
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  main: 'src/index.js',
  module: 'src/index.js',
  types: 'src/index.d.ts',
  bin: {
    'security-test': './bin/security-test.js'
  },
  files: [
    'src/',
    'bin/',
    'examples/',
    'templates/',
    'README.md',
    'CHANGELOG.md',
    'LICENSE.md'
  ],
  keywords: packageJson.keywords,
  author: packageJson.author,
  license: packageJson.license,
  repository: packageJson.repository,
  bugs: packageJson.bugs,
  homepage: packageJson.homepage,
  dependencies: packageJson.dependencies,
  peerDependencies: packageJson.peerDependencies,
  engines: packageJson.engines
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(distPackageJson, null, 2) + '\n'
);

console.log('📦 Built version', newVersion);
console.log('✅ Build complete!');
console.log('📁 Distribution files ready in dist/');
