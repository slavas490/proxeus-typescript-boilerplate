# TypeScript (Node.JS) boilerplate of Proxeus extension node
An boilerplate of external node implementation for Proxeus core

## Usage

It is recommended to start it using docker.

See the configuration paragraph for more information on what environments variables can be overridden

## Configuration

The following parameters can be set via environment variables. 


| Environmentvariable | Default value
--- | --- |  
PROXEUS_INSTANCE_URL | http://127.0.0.1:1323
SERVICE_NAME | MyNodeName
SERVICE_URL | http://localhost:SERVICE_PORT
SERVICE_PORT | 8010
SERVICE_SECRET | my secret
REGISTER_RETRY_INTERVAL | 5

## Deployment

The node is available as docker image and can be used within a typical Proxeus Platform setup by including the following docker-compose service:

```
version: '3.7'

networks:
  xes-platform-network:
    name: xes-platform-network

services:
  my-service-node-name:
    image: my-service-node-name_image
    container_name: xes_node-my-service-node-name
    networks:
      - xes-platform-network
    restart: unless-stopped
    environment:
      PROXEUS_INSTANCE_URL: http://xes-platform:1323
      SERVICE_SECRET: secret
      SERVICE_PORT: 8010
      REGISTER_RETRY_INTERVAL: 3
      SERVICE_URL: http://my-service-node-name:8010
      TZ: Europe/Zurich
    ports:
      - "8010:8010"
```