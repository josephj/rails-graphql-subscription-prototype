import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import ActionCable from "actioncable";
import { ActionCableLink } from "graphql-ruby-client";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const cable = ActionCable.createConsumer("ws://localhost:3000/websocket");

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  new ActionCableLink({ cable }),
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider {...{ client }}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
