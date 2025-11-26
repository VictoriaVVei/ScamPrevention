import React from "react"; //import React Component
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage.jsx";
import { DetectionGame } from "./pages/DetectionGame/DetectionGame.jsx";
import { PhoneGame } from "./pages/PhoneGame/PhoneGame.jsx";
import { DetectionResult } from "./pages/DetectionResult/DetectionResult.jsx";
import { ScamGuidePage } from "./pages/ScamGuidePage/ScamGuidePage.jsx";
import { DailyQuestion } from "./pages/DailyQuestion/DailyQuestion.jsx";
import { StyleGuide } from "./pages/StyleGuide/StyleGuide.jsx";
import { PostStory } from "./pages/PostStory/PostStory.jsx";

import { ScamProvider } from "./assets/ScamContext.jsx";

function App() {
  return (
    <Routes>
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/detection-game" element={<Outlet />}>
        <Route index element={<DetectionGame />} />
        <Route element={<ScamProvider><Outlet /></ScamProvider>}>
          <Route path="play" element={<PhoneGame />} />
          <Route path="result" element={<DetectionResult />} />
          <Route path="guide/:type" element={<ScamGuidePage />} />
        </Route>
      </Route>
      <Route path="/daily-question" element={<DailyQuestion />} />
      <Route path="/style-guide" element={<StyleGuide />} />
      <Route path="/post-story" element={<PostStory />} />

      <Route path="*" element={<Navigate to="/landing-page" replace />} />
    </Routes>
  );
}

export default App;
