# The Accounts subgraph

Hello and welcome to the `accounts` subgraph.

## Prerequisites

To run this repository, you'll need Node and a terminal. As part of the workshop prereqs, you should already have [Rover](https://www.apollographql.com/docs/rover/) downloaded, along with the Router binary. (You'll also have created a graph in Studio, and published this and the other subgraph schemas!)

## Get started

First, set up the project by installing dependencies

```shell
npm install
```

As part of the `postinstall` script, the database will be automatically seeded.

Next, launch the project

```shell
npm start
```

### Using Prisma

This repository contains a database built with Prisma. It's set up to run the migration that seeds the database right after you run `npm install`. However, if you need to make updates subsequent to the initial install, follow these instructions.

Run the following command to generate a migration that updates and seeds the database.

```shell
npx prisma migrate dev
```

This will create our SQLite database. Optionally, you can provide a name for this migration. If it completes successfully, you should see the following output:

We can also use **Prisma Studio** to inspect our database on a local port.

```shell
npx prisma studio
```

Then open up [http://localhost:5555](http://localhost:5555). This will allow you to browse the records in your database.

#### Alternate route of setting up DB

There is also a seed command in `package.json` that you can run to set up the database.

```shell
npm run db:seed
```

However you will also need to run the `db:generate` command.

```shell
npm run db:generate
```

### Trouble with Prisma?

If you're struggling to set up the Prisma database, you can switch to our JSON file setup instead. Jump to the `resolvers.js` file.

Search for references to `dataSources.db` and swap them out for `dataSources.accountsAPI`. The same methods exist on this alternate class, but you'll be able to use a JSON file containing accounts data instead of the database.

### Launching Sandbox

```shell
npm start
```

When you run `npm start` the server will begin running on port 4002. Open up [http://localhost:4002](http://localhost:4002) to access Sandbox. Sandbox is an environment where we can write and execute GraphQL operations.

If your database is setup correctly, you can set up the following "Authorization" header and run the query below.

```shell
"Authorization": "Bearer xeno"
```

```graphql
query GetMe {
  me {
    id
    isLoggedIn
    name
    lastActiveTime
    profileDescription
  }
}
```

This should return the details associated with the user you authenticated as ("xeno").

You can also toggle the user's logged-in or -out status, which we'll be doing later to test out some of our `messages` capabilities.

```graphql
mutation ToggleUserLoggedIn {
  changeLoggedInStatus {
    time
    success
    message
  }
}
```
