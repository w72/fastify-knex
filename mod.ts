import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import knex, { type Knex } from "knex";

declare module "fastify" {
  interface FastifyInstance {
    knex: Knex;
  }
}

const plugin: FastifyPluginCallback<Knex.Config> = (app, opts, done) => {
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

const fastifyKnex = fp(plugin, { name: "fastify-knex" });

export default fastifyKnex;
