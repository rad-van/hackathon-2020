#!/bin/bash

. ./image_tags.txt

TAG=${1:-${ALAMOD_TAG}}

REPO="dregis.strangeloop.net/hackathon-2020"

docker image build -t ${REPO}/server:${TAG} -f Dockerfile .
