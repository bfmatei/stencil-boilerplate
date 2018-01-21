#!/bin/bash
ssh -o "StrictHostKeyChecking no" ${HOST:-host}@${HOST_USERNAME:-hostUsername} "
  cd ~/projects/stencil-boilerplate;
  npm install;
  npm run build;
"
