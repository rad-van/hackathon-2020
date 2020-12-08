#!/bin/bash

TAG=${1:-latest}

REPO="dregis.strangeloop.net/hackathon-2020"

docker image build -t ${REPO}/server:${TAG} -f Dockerfile .
