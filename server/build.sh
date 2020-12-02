#!/bin/bash

TAG=${1:-0.1}

REPO="dregis.strangeloop.net/hackathon-2020"

docker image build -t ${REPO}/server:${TAG} -f Dockerfile .
