import { logAccess } from "../../utils/logAccess";
import path from "path";
import fs from "fs";

export const resolvers = {
  Query: {
    // fixme
    secureQuery1: async (_: any, _args: any, context: any) => {
      if (!context.req.isAuthenticated()) {
        throw new Error("Error during authentication");
      }

      // FIXME: check context.user
      logAccess("secureQuery1", context.user);

      return "secureQuery1";
    },
    secureQuery2: async (_: any, _args: any, context: any) => {
      if (!context.req.isAuthenticated()) {
        throw new Error("Error during authentication");
      }

      // FIXME: check context.user
      logAccess("secureQuery2", context.user);

      return "secureQuery2";
    },
    accessLog: async (_: any, _args: any, context: any) => {
      if (!context.req.isAuthenticated()) {
        throw new Error("Error during authentication");
      }

      logAccess("accessLog", context.user);

      // Read access log from file and return as an array
      const logFilePath = path.join(__dirname, "access.log");
      const accessLog = fs.readFileSync(logFilePath, "utf8").split("\n");
      return accessLog.filter((log) => log.trim() !== "");
    },
  },
};
