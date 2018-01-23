#!/bin/bash
ssh -o "StrictHostKeyChecking no" ${HOST_USERNAME:-hostUsername}@${HOST:-host} "
  cd ~/projects/stencil-boilerplate;
  rm -rf www;
  git reset --hard HEAD;
  git pull;
  mv www www2;
  mkdir www;
  cp www2/.gitignore www/.gitignore;
  rm -rf www2 dist src/components.d.ts;
  npm install;
  npm run build;
"
