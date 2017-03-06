#!/bin/bash

# build Python scripts
pyinstaller --onefile --hidden-import=numpy pca.py
mkdir ../dist
mv dist/pca ../dist/pca
rm -Rf build/ dist/ pca.spec