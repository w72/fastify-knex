# fastify-knex

![](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)
![](https://img.shields.io/badge/module_type-ESM_only-brightgreen)\
![](https://img.shields.io/npm/v/@w72/fastify-knex)
![](https://img.shields.io/node/v/@w72/fastify-knex)
![](https://img.shields.io/npm/dependency-version/@w72/fastify-knex/dev/fastify)
![](https://img.shields.io/npm/dependency-version/@w72/fastify-knex/dev/knex)
![](https://img.shields.io/npm/l/@w72/fastify-knex)

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
