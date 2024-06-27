"use client";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getProjects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GQL_API_URI,
  cache,
});

export default function GqlProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
