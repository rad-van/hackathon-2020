FROM ubuntu:20.04

WORKDIR /opt/attacker
COPY 2AW_SAdevices.sh ./
RUN apt update && apt install -y curl && chmod 777 /opt/attacker/2AW_SAdevices.sh

CMD '/opt/attacker/2AW_SAdevices.sh'
