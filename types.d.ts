declare namespace Express {
  export interface Request {
    sessionID: string;
  }
  export interface User {
    id?: string;
    username?: string;
  }
}
