#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download Amazon logo
curl -o public/images/amazon.png "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"

# Download WillowTree logo
curl -o public/images/willowtree.png "https://assets-global.website-files.com/6462847f60b917d6b7c35011/64628c9c7c6e6c9a466a7c2c_willowtree-logo-black.png" 