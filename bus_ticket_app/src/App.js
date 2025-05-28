import React from "react";
import Manipulate from "./Manipulate";
import { LoginProvider } from "./components/LoginContext";


function App() {
  return (
    <LoginProvider>
        <Manipulate />
    </LoginProvider>
  )
}

export default App;
