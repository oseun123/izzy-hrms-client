import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/reducers/rootReducer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);
