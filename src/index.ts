import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import datasource from "./services/utils";
import { buildSchema } from "type-graphql";
import { ApisResolver } from "./resolvers/Apis";

const PORT = 5000;

async function bootstrap(): Promise<void> {
  // ... Building schema here
  const schema = await buildSchema({
    resolvers: [ApisResolver],
  });

  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
    cors: true,
  });

  try {
    await datasource.initialize();
    console.log("I'm connected !");
    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.log("Too bad");
    console.error(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
