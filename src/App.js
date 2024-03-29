import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Login from "./components/Login";
import Frame from "./components/Frame";

// Alert
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <Alert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="main" element={<Frame />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
