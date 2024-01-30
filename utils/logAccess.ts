import fs from "fs";

export const logAccess = (action: string, userId: string) => {
  const message = `${new Date().toISOString()} - User ${userId} performed an authenticated operation: ${action}`;

  fs.appendFileSync("./access.log", message + "\n", "utf8");
};
