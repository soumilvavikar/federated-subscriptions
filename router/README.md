# Hello! Welcome to the `router` directory

By default, this directory should look pretty empty: we've got just one file currently, called `router-config.yaml`. Take a moment to check it out. It's filled with some router-specific configurations: it's how we can customize the router's behavior.

As part of your prereqs for this workshop, please be sure to download the Router binary into _this_ directory. You can do so by running the following command in the root of the `router` directory.

```
curl -sSL https://router.apollo.dev/download/nix/latest | sh
```

This will place a new file called `router` inside this folder!

## Creating a graph (Enterprise organization required)

Follow the instructions in the prerequisites to create a new graph in [GraphOS Studio](http://studio.apollographql.com), and publish your subgraph schemas using the Rover CLI.

This process will give you two key pieces of data: your `APOLLO_KEY` and your graph's unique `APOLLO_GRAPH_REF`. We'll use these throughout the workshop, so be sure to store them someplace secure: we recommend creating a new `.env` file in this directory and storing them like this:

```
APOLLO_KEY=somethingsomethingsomething
APOLLO_GRAPH_REF=mygraphname@current
```

## Running the router

Once you've secured your APOLLO_KEY and APOLLO_GRAPH_REF, you can run the router! We do so with the following command.

```
APOLLO_KEY=somethingsomethingsomething  \
APOLLO_GRAPH_REF=mygraphname@current  \
./router  \
--config ./router-config.yaml
```

Note that we've added the backslash (`\`) on each line for legibility. You can, however, run this command all on one line. This command boots up the router binary file, passing in the `router-config.yaml` file to use as its configuration settings. By specifying our `APOLLO_KEY` and our `APOLLO_GRAPH_REF`, we give the router the means to connect to our graph in Studio and pull the latest supergraph schema.

Back in Studio, update your graph's _Connection Settings_ with the router's default URL: `http://127.0.0.1:4000`. The router's ready to be queried!
