#!/bin/bash

REPO="dregis.strangeloop.net/hackathon-2020"

docker image build -t ${REPO}/server-dep:1 -f Dockerfile-dep .
