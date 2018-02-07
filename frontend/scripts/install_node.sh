#!/bin/bash

set -e

sudo apt-get install -y nodejs
npm cache clean -f
sudo npm install -g n
sudo n stable
node --version
