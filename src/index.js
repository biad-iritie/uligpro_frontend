import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@contexts/themeContext";
import { ShopProvider } from "@contexts/shopContext";
import { Provider } from "react-redux";
import store from "./app/store";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "https://uligpro.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //console.log(localStorage.getItem("accessToken") === null);
  let accessToken = localStorage.getItem("accessToken");
  accessToken = accessToken ? accessToken.replace(/"/g, "") : "";
  let refreshToken = localStorage.getItem("refreshToken");
  refreshToken = refreshToken ? refreshToken.replace(/"/g, "") : "";
  //console.log(refreshToken);
  // return the headers to the context so httpLink can read them
  if (accessToken !== "" && refreshToken !== "") {
    return {
      headers: {
        ...headers,
        accesstoken: accessToken,
        refreshtoken: refreshToken,
        bypass_tunnel_reminder: null,
      },
    };
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //uri: process.env.REACT_APP_SERVER,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ShopProvider>
            <App />
          </ShopProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
