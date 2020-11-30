#!/bin/bash

set -e

TAG=${1:?Image tag missing}

REPO="dregis.strangeloop.net/hackathon-2020"

docker image build -t ${REPO}/server:${TAG} -f Dockerfile .
