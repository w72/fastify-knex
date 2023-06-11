import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import knex, { type Knex } from "knex";

declare module "fastify" {
  interface FastifyInstance {
    knex: Knex;
  }
}

const fastifyKnex: FastifyPluginCallback<Knex.Config> = (app, opts, done) => {
  if (!app.knex) {
    const knexInstance = knex.knex(opts);
    app.decorate("knex", knexInstance);
    app.addHook("onClose", (app, done) => {
      if (app.knex === knexInstance) {
        app.knex.destroy(done);
      }
    });
  }
  done();
};

export default fp(fastifyKnex, { name: "fastify-knex" });
