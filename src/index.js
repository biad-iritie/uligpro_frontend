import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@contexts/themeContext";
import { ShopProvider } from "@contexts/shopContext";
import { Provider } from "react-redux";
import store from "./app/store";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER,
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
