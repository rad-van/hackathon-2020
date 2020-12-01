# Hackthon 2020

# Build the backend server

## Build the base image

Run the build-dep.sh script in `server/`:

```shell
cd server
./build-dep.sh
```

This creates a docker image with the following repo/tag:
"dregis.strangeloop.net/hackathon-2020/server-dep:1"

## Build the server image

Run the build.sh script in `server/`, provide the image tag:

```shell
cd server
./build.sh 0.1
```

It creates a docker image with the following repo/tag:
"dregis.strangeloop.net/hackathon-2020/server:0.1".

Update the image tag accordingly.

# Start the backend server

## Create the server cert

Run the script sslcert.sh in `server/`, provide the IP address to
which the server will bind:

```shell
cd server
./sslcert.sh $BIND_ADDR
```

The command creates cert.pem and key.pem in the current directory.

## Run the server in a docker-compose mesh

In the git top directory, create an `./env` file with the following
content:

```
ALAMOD_VERSION=0.1
```

Update the version number accordingly.

Change the host's kernel setting for Elastic Search:

```shell
sudo sysctl -w vm.max_map_count=262144
```

And run `docker-compose up -d`.

## Run the server natively

### Install the server

In `server/`, run `npm link` to install the "alamod" command in PATH:

```shell
cd server
npm link
```

### Start the server

```shell
alamod
```

The server outputs its log messages to console.

Run `alamod -h` for command line options.
