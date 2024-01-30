import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import bodyParser from "body-parser";
import { ApolloServer, Config, ExpressContext } from "apollo-server-express";
import {
  RenameRootFields,
  RenameTypes,
  schemaFromExecutor,
} from "@graphql-tools/wrap";
import { stitchSchemas } from "@graphql-tools/stitch";
import cors from "cors";
import { remoteExecutorCart } from "./schemas/cart/executor";
import { remoteExecutorCountries } from "./schemas/countries/executor";
import { resolvers } from "./schemas/local/resolvers";
import { typeDefs } from "./schemas/local/typeDefs";
import { verifyUser } from "./utils/verifyUser";

const port = 3000;

async function createApolloServer() {
  const cartSchema = {
    schema: await schemaFromExecutor(remoteExecutorCart),
    executor: remoteExecutorCart,
    transforms: [
      new RenameRootFields((_, fieldName) => `CartQL_${fieldName}`),
      new RenameTypes((name) => `CartQL_${name}`),
    ],
  };

  const cmsSchema = {
    schema: await schemaFromExecutor(remoteExecutorCountries),
    executor: remoteExecutorCountries,
    transforms: [
      new RenameRootFields((_, fieldName) => `COUNTRY_${fieldName}`),
      new RenameTypes((name) => `COUNTRY_${name}`),
    ],
  };

  const schema = await stitchSchemas({
    subschemas: [cartSchema, cmsSchema],
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    typeDefs,
    resolvers,
    // csrfPrevention: false,
    context: ({ req, res }) => ({ req, res, user: req.user }),
    playground: true,
  } as Config<ExpressContext>);

  const app = express();

  const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };

  app.use(cors(corsOptions));

  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  passport.use(new LocalStrategy.Strategy(verifyUser));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (_id, done) {
    // NOTE: fake user
    const user = { id: "id", username: "exampleUser" };
    done(null, user);
  });

  app.post("/login", passport.authenticate("local"), function (req, res) {
    res.cookie("sessionId", req.sessionID, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  });

  app.get("/logout", (req, res) => {
    req.logout(() => {
      res.status(200).json({ message: "Logout successful" });
    });
    res.clearCookie("sessionId");
  });

  server.start().then((_res) => {
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen({ port }, () =>
      console.log(`Gateway API running at port: ${port}`)
    );
  });
}

createApolloServer();
