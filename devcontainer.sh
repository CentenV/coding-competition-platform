#!/bin/bash

# Validate that the script runs in the same directory
set -e
if [[ $(dirname $0) != "." ]]; then 
  (>&2 echo -e "\033[0;31mScript must be invoked in the same directory it is stored\033[0;0m"; exit 1)
fi

# Build & run developer container
docker build -t codcompplat-dev-container -f devcontainer.dockerfile .

