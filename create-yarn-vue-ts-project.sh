#!/bin/bash
# check that yarn is installed
command -v yarn >/dev/null 2>&1 || { echo >&2 "I require 'yarn' but it's not installed. Aborting. Run 'npm install yarn --global' to install it."; exit 1; }
read -e -p "Enter project name: " PROJECT_NAME
echo "Creating Vite project"
yarn create vite $PROJECT_NAME --template vue-ts
cd $PROJECT_NAME
echo "Switching to latest stable yarn version to enable Yarn PnP"
yarn set version stable
echo "Installing dependencies"
yarn install
echo "Installing VSCode support for PnP"
yarn dlx @yarnpkg/sdks vscode
echo "Installing useful yarn plugins" 
yarn plugin import interactive-tools
yarn plugin import typescript