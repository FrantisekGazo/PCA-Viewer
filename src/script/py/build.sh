#!/bin/bash

# build Python scripts
pyinstaller --onefile --hidden-import=scipy --hidden-import=sklearn.neighbors.typedefs pca.py
mkdir ../dist
mv dist/pca ../dist/pca
rm -Rf build/ dist/ pca.spec