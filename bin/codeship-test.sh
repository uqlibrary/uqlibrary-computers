#!/bin/bash

echo "Testing branch: ${CI_BRANCH}"

# REDO WHEN POLYMER 1.0 GOES LIVE

# If polymer 1.0
if [ ${CI_BRANCH} == "polymer1.0" ] || [ {$CI_BRANCH} == v* ]; then

    if [ ${PIPE_NUM} == 1 ]; then
        # Run local tests
        echo "Starting local WCT tests"
        npm install web-component-tester -g
        bower install
        wct
    else
        echo "Pipe not used"
    fi
else
    cd ../uqlibrary-elements
    ./bin/elements_local_tests.sh
    cd ../uqlibrary-computers
    ../uqlibrary-elements/bin/sauce.sh
fi