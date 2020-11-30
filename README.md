# Hackthon 2020

# Start the server

## Create the server cert

Run the script sslcert.sh in `server/`, provide the IP address to
which the server will bind:

```shell
cd server
./sslcert $BIND_ADDR
```

The command creates cert.pem and key.pem in the current directory.

## Install the server

In `server/`, run `npm link` to install the "alamod" command in PATH:

```shell
cd server
npm link
```

## Start the server

```shell
alamod
```
