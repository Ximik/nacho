import React, { useEffect } from "react";
import { StoreProvider, useStore } from "./Store";
import Navigation from "./Navigation";

const App = () => {
  return <Navigation />;
};

export default function () {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}
