#!/usr/bin/python

import argparse
import json
import numpy as np
from sklearn.decomposition import PCA as sklearnPCA

def main(data):
    result = {}

    d = json.loads(data)
    all_samples = np.array(d)
    result['all_samples'] = all_samples.tolist()

    sklearn_pca = sklearnPCA(n_components=5)
    #result['sklearn_pca'] = sklearn_pca
    sklearn_transf = sklearn_pca.fit_transform(all_samples)
    result['sklearn_transf'] = sklearn_transf.tolist()

    print(json.dumps(result))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--data', required=True)
    args = parser.parse_args()

    # run
    main(args.data)