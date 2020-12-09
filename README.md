# Hackthon 2020

## Install docker-compose

Install the latest version of docker-compose.  The firewall, the
protected web server, the Elastic Search server, and the WAF Lite
backend server are all in a docker-compose mesh for ease of use.

## Prepare the Host

On Linux, to start Elastic Search, run:

```shell
sudo sysctl -w vm.max_map_count=262144
```

## Start the servers

On Linux, run this in the git checkout:

```shell
./start.sh
```

Otherwise, start the docker-compose mesh with the method that is
appropriate to your OS.

## Start the web UI

In the browser, open a tab to the URL: http://localhost:8088
