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
  uri: process.env.REACT_APP_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  let accessToken = localStorage.getItem("accessToken");
  accessToken = accessToken.replace(/"/g, "");
  let refreshToken = localStorage.getItem("refreshToken");
  refreshToken = refreshToken.replace(/"/g, "");
  //console.log(accessToken.toString());
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      accesstoken: accessToken ? accessToken : "",
      refreshtoken: refreshToken ? refreshToken : "",
    },
  };
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
