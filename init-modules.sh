#!/usr/bin/env sh

# Install submodules
echo 'Installing project submodules...'
git submodule init
git submodule update


# Install dependencies
echo 'Installing project dependencies...'