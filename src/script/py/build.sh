#!/bin/bash

# build Python scripts
pyinstaller --onefile --hidden-import=numpy pca.py
rm pca.spec
rm -Rf build/