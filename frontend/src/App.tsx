import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/Home";
import ResultsPage from "./pages/Results";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}
