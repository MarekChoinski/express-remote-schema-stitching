import { buildHTTPExecutor } from "@graphql-tools/executor-http";

// NOTE: this could be .env
export const remoteExecutorCountries = buildHTTPExecutor({
  endpoint: "https://countries.trevorblades.com/graphql",
});
