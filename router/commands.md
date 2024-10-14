# Basic Commands

## Setup Environment Variables

```shell
source .env
```

## Publish Messages Subgraph

```shell
rover subgraph publish $APOLLO_GRAPH_REF --name messages --schema ./src/schema.graphql --routing-url http://localhost:4001
```

## Publish Accounts Subgraph

```shell
rover subgraph publish $APOLLO_GRAPH_REF --name accounts --schema ./accounts.graphql --routing-url http://localhost:4002
```

## Start the Router Local Instance

```shell
APOLLO_KEY=$APOLLO_KEY APOLLO_GRAPH_REF=$APOLLO_GRAPH_REF ./router --config ./router-config.yaml

# OR

APOLLO_KEY=service:sv15-federated-subscription:UEoRypfJJFDDvsEEEa9O_g \
APOLLO_GRAPH_REF=sv15-federated-subscription@current \
./router \
--config ./router-config.yaml
```

## Command Auto-generated when the test supergraph instance was created

```shell
APOLLO_KEY=service:sv15-federated-subscription:UEoRypfJJFDDvsEEEa9O_g \
  rover subgraph publish sv15-federated-subscription@current \
  --schema ./products-schema.graphql \
  --name your-subgraph-name \
  --routing-url http://products.prod.svc.cluster.local:4001/graphql
```
