# fastify-knex

![](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)
![](https://img.shields.io/badge/Fastify-4-blue?logo=fastify)
![](https://img.shields.io/badge/Node.js-%E2%89%A516-blue?logo=node.js&logoColor=white)
![](https://img.shields.io/badge/Module%20Type-ESM%20only-brightgreen)
![](https://img.shields.io/badge/License-MIT-blue)

## Install

```bash
npm i @w72/fastify-knex knex
```

## Usage

```js
import fastify from "fastify";
import fastifyKnex from "@w72/fastify-knex";

const app = fastify({ logger: true });

app.register(fastifyKnex, {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: { filename: ":memory:" },
});

app.get("/", async () => {
  const res = await app.knex.first(app.knex.raw("sqlite_version() as ver"));
  app.log.info("sqlite version: %s", res.ver);
  return { "sqlite version": res.ver };
});

app.listen();
```

## License

Licensed under MIT.
