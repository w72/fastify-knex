# fastify-knex

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
