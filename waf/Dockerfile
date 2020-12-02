ARG MODSEC_VERSION="v3.0.4"
ARG NGINX_VERSION="1.19.5"
ARG CONNECTOR_VERSION="v1.0.1"
ARG CRS_VERSION="3.3.0"


# *******************************************************************
# INTERMEDIATE BUILD STAGE FOR COMPILING MODSECURITY                |
# *******************************************************************
FROM debian:10.6 as builder-modsec

ARG MODSEC_VERSION
ARG NGINX_VERSION
ARG CONNECTOR_VERSION
ARG CRS_VERSION

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  apt-utils \
  autoconf \
  automake \
  build-essential \
  git \
  libcurl4-openssl-dev \
  libgeoip-dev \
  liblmdb-dev \
  liblua5.3-dev \
  libpcre++-dev \
  libtool \
  libxml2-dev \
  libyajl-dev \
  wget

WORKDIR /tmp

RUN set -x && \
  # Download and install required dependencies
  wget -q https://github.com/ssdeep-project/ssdeep/releases/download/release-2.14.1/ssdeep-2.14.1.tar.gz && \
  tar -xvzf ssdeep-2.14.1.tar.gz && \
  cd ssdeep-2.14.1 && \
  ./configure && \
  make install && \
  cd .. && \

  # Download ModSecurity sources
#  wget -q https://github.com/SpiderLabs/ModSecurity/releases/download/${MODSEC_VERSION}/modsecurity-${MODSEC_VERSION}.tar.gz && \
#  tar xf modsecurity-${MODSEC_VERSION}.tar.gz && \
  git clone https://github.com/SpiderLabs/ModSecurity --branch v3.0.4 --depth 1 && \

  # Build ModSecurity
#  cd modsecurity-${MODSEC_VERSION} && \
  cd ModSecurity && \
  ./build.sh && \
  git submodule init && \
  git submodule update && \
  ./configure && \
  make && \
  make install


# *******************************************************************
# INTERMEDIATE BUILD STAGE FOR COMPILING NGINX DYNAMIC MODULES,     |
# CREATING SELF SIGNED CERTIFICATES AND DOWNLOADING THE OWASP CRS   |
# *******************************************************************
FROM nginx:${NGINX_VERSION} as builder-nginx

ARG MODSEC_VERSION
ARG NGINX_VERSION
ARG CONNECTOR_VERSION
ARG CRS_VERSION

RUN apt-get update && apt-get install -y \
  apt-utils \
  autoconf \
  automake \
  build-essential \
  curl \
  liblua5.3-dev \
  libpcre++-dev \
  libtool \
  libyajl-dev \
  wget \
  zlib1g-dev

COPY openssl.conf /tmp/certs/
COPY --from=builder-modsec /usr/local/modsecurity/ /usr/local/modsecurity/
COPY --from=builder-modsec /usr/local/lib/ /usr/local/lib/

WORKDIR /tmp

RUN set -x && \
  # Donwload and verify nginx sources
  curl -sSL http://nginx.org/keys/mdounin.key | gpg --import && \
  wget -q https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
  wget -q https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz.asc && \
  gpg --verify nginx-${NGINX_VERSION}.tar.gz.asc && \
  tar xf nginx-${NGINX_VERSION}.tar.gz && \

  # Download sources for the modsecurity nginx connector
  wget -q https://github.com/SpiderLabs/ModSecurity-nginx/releases/download/${CONNECTOR_VERSION}/modsecurity-nginx-${CONNECTOR_VERSION}.tar.gz && \
  tar xf modsecurity-nginx-${CONNECTOR_VERSION}.tar.gz && \

  # Download the OWASP Core Rule Set
  curl -sSL https://coreruleset.org/security.asc | gpg --import && \
  wget -q https://github.com/coreruleset/coreruleset/archive/v${CRS_VERSION}.tar.gz && \
  wget -q https://github.com/coreruleset/coreruleset/releases/download/v${CRS_VERSION}/coreruleset-${CRS_VERSION}.tar.gz.asc && \
  mv -v v${CRS_VERSION}.tar.gz coreruleset-${CRS_VERSION}.tar.gz && \
  gpg --verify coreruleset-${CRS_VERSION}.tar.gz.asc && \
  tar xf coreruleset-${CRS_VERSION}.tar.gz && \

  # Compile the dynamic nginx module for modsec connector
  cd /tmp/nginx-${NGINX_VERSION} && \
  ./configure --with-compat --add-dynamic-module=../modsecurity-nginx-${CONNECTOR_VERSION} && \
  make modules && \

  # Generate self-signed certificates
  cd ../certs && \
  openssl req -x509 -days 365 -new -config ./openssl.conf -keyout ./server.key -out ./server.crt


# *******************************************************************
# FINAL IMAGE CONTAINING NGINX, MODSECURITY, CRS AND CUSTOM CONFIGS |
# *******************************************************************
FROM nginx:${NGINX_VERSION}

ARG MODSEC_VERSION
ARG NGINX_VERSION
ARG CONNECTOR_VERSION
ARG CRS_VERSION

ENV LD_LIBRARY_PATH=/lib:/usr/lib:/usr/local/lib

RUN apt-get update && apt-get install -y \
  ca-certificates \
  libgeoip1 \
  liblmdb0 \
  liblua5.3-0 \
  libyajl2

RUN rm -rf /etc/nginx/conf.d/*

# Copy binaries for modsecurity
COPY --from=builder-modsec /usr/local/modsecurity/ /usr/local/modsecurity/
COPY --from=builder-modsec /usr/local/lib/ /usr/local/lib/
#COPY --from=builder-modsec /tmp/modsecurity-${MODSEC_VERSION}/unicode.mapping /etc/nginx/modsecurity/
COPY --from=builder-modsec /tmp/ModSecurity/unicode.mapping /etc/nginx/modsecurity/

# Copy the nginx module
COPY --from=builder-nginx /tmp/nginx-${NGINX_VERSION}/objs/ngx_http_modsecurity_module.so /etc/nginx/modules/

# Copy the OWASP CRS
COPY --from=builder-nginx /tmp/coreruleset-${CRS_VERSION}/crs-setup.conf.example /etc/nginx/modsecurity/owasp-crs/crs-setup.conf
COPY --from=builder-nginx /tmp/coreruleset-${CRS_VERSION}/rules/ /etc/nginx/modsecurity/owasp-crs/rules/

# Copy the self signed certificates
COPY --from=builder-nginx /tmp/certs/* /etc/nginx/certs/

COPY nginx/nginx.conf nginx/mime.types /etc/nginx/
COPY nginx/conf.d/* /etc/nginx/conf.d/
COPY nginx/hosts/* /etc/nginx/hosts/
COPY modsecurity/* /etc/nginx/modsecurity/
