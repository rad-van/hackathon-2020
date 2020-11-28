#!/bin/bash

HOST=${1:?"Need host ip as subject alt. name in cert"}

openssl genpkey -out key.pem -algorithm RSA -pkeyopt rsa_keygen_bits:2048

openssl req -new -x509 -key key.pem -out cert.pem -days 365 \
        -subj "/C=CA/CN=www.example.com" \
        -addext "subjectAltName = IP:${HOST}"
