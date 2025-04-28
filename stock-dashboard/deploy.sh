#!/bin/bash

# Build the project
npm run build

# Move to the build directory
cd dist

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Initialize git
git init
git checkout -b main
git add -A
git commit -m 'Deploy to GitHub Pages'

# Push to the gh-pages branch
git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -

echo "Deployed to GitHub Pages!"
