import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "@/pages/afc/Onboarding";
import MissionChat from "@/pages/afc/MissionChat";
import SignalFeed from "@/pages/afc/SignalFeed";
import DMs from "@/pages/afc/DMs";
import DayReflection from "@/pages/afc/DayReflection";
import FinalSummary from "@/pages/afc/FinalSummary";

function App() {
  return (
    <div className="App min-h-screen bg-[#04060f] text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/mission" element={<MissionChat />} />
          <Route path="/feed" element={<SignalFeed />} />
          <Route path="/dms" element={<DMs />} />
          <Route path="/reflection" element={<DayReflection />} />
          <Route path="/final" element={<FinalSummary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
