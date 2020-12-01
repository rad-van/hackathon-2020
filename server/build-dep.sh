#!/bin/bash

. ./image_tags.txt

TAG=${1:-${DEP_IMAGE_TAG}}

REPO="dregis.strangeloop.net/hackathon-2020"

docker image build -t ${REPO}/server-dep:${TAG} -f Dockerfile-dep .
