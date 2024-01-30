import path from "path";
import fs from "fs";

export const logAccess = (action: string, userId: string) => {
  const message = `${new Date().toISOString()} - User ${userId} performed an authenticated operation: ${action}`;

  const logFilePath = path.join(__dirname, "access.log");

  fs.appendFileSync(logFilePath, message + "\n", "utf8");
};
