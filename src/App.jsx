import React from "react"; //import React Component
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage.jsx";
import { DetectionGame } from "./pages/DetectionGame/DetectionGame.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/detection-game" element={<DetectionGame />} />
      </Routes>
    </>
  );
}

export default App;
