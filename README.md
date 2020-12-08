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

## Generate firewall audit logs

In another browser tab, access the protected web app at
http://localhost:8000

This is a testing web app with links that will be blocked by the
firewall.  Click the links and watch the audit logs show up in the web
UI in real time.
