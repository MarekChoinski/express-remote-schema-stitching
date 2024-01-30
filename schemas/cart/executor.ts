import { buildHTTPExecutor } from "@graphql-tools/executor-http";

// NOTE: this could be .env
export const remoteExecutorCart = buildHTTPExecutor({
  endpoint: "http://api.cartql.com/",
});
