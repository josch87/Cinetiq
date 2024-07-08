import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const colors = {
  brand: {
    50: "#feefec",
    100: "#f8afa0",
    200: "#f58f7a",
    300: "#f47f67",
    400: "#f15f41",
    500: "#ef4623",
    600: "#e43411",
    700: "#ab270d",
    800: "#851e0a",
    900: "#130401",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
