# Hackthon 2020

# Build the backend server

## Build the base image

Update the image tags in `server/image_tags.txt` as necessary.

Run the build-dep.sh script in `server/`:

```shell
cd server
./build-dep.sh
```

This creates a docker image with the following repo:
"dregis.strangeloop.net/hackathon-2020/server-dep"

## Build the server image

Run the build.sh script in `server/`:

```shell
cd server
./build.sh
```

It creates a docker image with the following repo:
"dregis.strangeloop.net/hackathon-2020/server".

# Start the mesh

Change the host's kernel setting for Elastic Search:

```shell
sudo sysctl -w vm.max_map_count=262144
```

And run `docker-compose up -d` in the git top directory.

The firewall listens on port 8443 and 8000.  Open a browser tab and
type "http://$HOST_NAME:8000" in the address bar to load the
"HacmeBank" test web app.

NOTE: Using numeric host IP as host name in requests trigger a warning
in audit logs.  Use a DNS name to reduce the noise.

Change logging level of the backend server with the `ALAMOD_LOG` env
variable.  Accepted values are "info", "debug" and "error", "debug"
being default.
