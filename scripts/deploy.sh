#!/bin/bash
ssh -o "StrictHostKeyChecking no" ${HOST_USERNAME:-hostUsername}@${HOST:-host} "
  cd ~/projects/stencil-boilerplate;
  git pull;
  npm install;
  npm run build;
"
