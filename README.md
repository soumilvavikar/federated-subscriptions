# GraphQL Federated Subscriptions

Inside of this repo you'll find three directories:

- `router`
- `messages`
- `accounts`

Each of these directories contains its own `README.md` file to get you up and running. All the three modules need to be up and running for us to be able to successfully test the federated subscriptions.

## Prerequisites

To run this repository, you'll need Node and a terminal. As part of the workshop prereqs, you should already have [Rover](https://www.apollographql.com/docs/rover/) downloaded, along with the Router binary. (You'll also have created a graph in Studio, and published this and the other subgraph schemas!)

### Check if the Subraphs and Router are UP and Running

**NOTE**: Ensure that the the subgraphs and router are started.

When we run the following command in the `accounts` subgraph folder. We should see the following logs in the terminal.

```shell
npm start
```

![Account Subgraph](readme-imgs/account-subgraph.png)

When we run the following command in the `messages` subgraph folder. We should see the following logs in terminal.

```shell
npm run dev
```

![Messages Subgraph](readme-imgs/messages-subgraph.png)

When we run the following command in the `router` folder, we should see the following logs in the terminal.

```shell
APOLLO_KEY=$APOLLO_KEY APOLLO_GRAPH_REF=$APOLLO_GRAPH_REF  \
./router --config ./router-config.yaml
```

![Router Instance](readme-imgs/router.png)

## Test out some basic operations

TBD

## Steps followed to enable subscriptions

Detailed steps and documentation is available [here](https://www.apollographql.com/tutorials/workshop-summit-federated-subscriptions/01-intro-and-setup). The following documentation is just direct steps to enable subscriptions.
